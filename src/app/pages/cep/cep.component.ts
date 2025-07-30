import { Component, OnInit } from "@angular/core";
import { Endereco, EnderecoItem } from "src/app/core/models/endereco.model";
import { CepService } from "src/app/core/services/cep.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-cep",
  templateUrl: "./cep.component.html",
  styleUrls: ["./cep.component.scss"],
})
export class CepComponent implements OnInit {
  enderecos$: Observable<EnderecoItem[]>;

  constructor(private cepService: CepService) {}

  ngOnInit() {
    this.enderecos$ = this.cepService.enderecos$;
  }

  onSearchEndereco(endereco: Endereco) {
    if (endereco && !endereco.erro) {
      this.cepService.adicionarEndereco(endereco);
    }
  }

  onDeleteEndereco(id: string) {
    this.cepService.removerEndereco(id);
  }
}
