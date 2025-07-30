import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CepService } from "../../../../core/services/cep.service";
import { Endereco, EnderecoItem } from "../../../../core/models/endereco.model";
import { SnackbarService } from "src/app/core/services/snackbar.service";


@Component({
  selector: "app-busca-cep",
  templateUrl: "./busca-cep.component.html",
  styleUrls: ["./busca-cep.component.scss"],
})
export class BuscaCepComponent implements OnInit {
  @Output() searchEndereco = new EventEmitter<Endereco>();
  @Input() enderecos: EnderecoItem[] = [];
  cepForm: FormGroup;

  constructor(
    private cepService: CepService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.cepForm = new FormGroup({
      cep: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{5}-?\d{3}$/),
      ]),
    });
  }

  get cepFormControl(): FormControl {
    return this.cepForm.get("cep") as FormControl;
  }

  buscarEndereco(cep: string): void {
    const cepNumerico = this.limparCep(cep);

    if (!cepNumerico || !this.cepFormControl.valid) {
      return;
    }

    if (this.isEnderecoDuplicado(cepNumerico)) {
      this.snackbarService
        .confirm(
          "Endereço já cadastrado na tabela, tem certeza que quer adicioná-lo novamente?"
        )
        .subscribe((confirmado) => {
          if (confirmado) {
            this.adicionarEndereco(cepNumerico);
          }
        });
    } else {
      this.adicionarEndereco(cepNumerico);
    }

    this.cepFormControl.reset();
  }

  private limparCep(cep: string): string {
    return cep.replace(/\D/g, "");
  }

  private isEnderecoDuplicado(cep: string): boolean {
    return this.enderecos.some((e) => this.limparCep(e.cep) === cep);
  }

  private adicionarEndereco(cep: string): void {
    this.cepService.buscarCep(cep).subscribe({
      next: (endereco: Endereco | null) => {
        if (!endereco || endereco.erro) {
          this.cepFormControl.setErrors({ erro: true });
          this.snackbarService.error("CEP não encontrado");
          return;
        }

        this.searchEndereco.emit(endereco);
        this.snackbarService.success("CEP encontrado com sucesso");
      },
      error: () => {
        this.snackbarService.error("Erro ao buscar CEP");
      },
    });
  }
  formatarCep(event: any) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted =
      value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5)}` : value;
    this.cepFormControl.setValue(formatted, { emitEvent: false });
  }
}
