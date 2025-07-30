import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {catchError, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Endereco, EnderecoItem } from '../models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly STORAGE_KEY = 'enderecos_pesquisados';
  private readonly enderecosSubject = new BehaviorSubject<EnderecoItem[]>([]);
  public readonly enderecos$ = this.enderecosSubject.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
    this.carregarEnderecos();
  }

  buscarCep(cep: string): Observable<Endereco> {
    const cepLimpo = cep.replace(/\D/g, '');
    
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cepLimpo}/json/`).pipe(
      catchError(error => {
        console.error('Erro ao buscar CEP:', error);
        return of(null);
      })
    );
  }

  adicionarEndereco(endereco: Endereco) : void {
    if (!endereco) return;

    const enderecoItem: EnderecoItem = {
      id: this.gerarId(),
      cep: endereco.cep,
      endereco: this.formatarEndereco(endereco),
      data: this.formatarData(new Date()),
      enderecoCompleto: endereco
    };

    const enderecosAtuais = this.enderecosSubject.value;
    const novosEnderecos = [enderecoItem, ...enderecosAtuais];
    
    this.enderecosSubject.next(novosEnderecos);
    this.salvarEnderecos(novosEnderecos);
  }

  removerEndereco(id: string) : void {
    const enderecosAtuais = this.enderecosSubject.value;
    const novosEnderecos = enderecosAtuais.filter(endereco => endereco.id !== id);
    
    this.enderecosSubject.next(novosEnderecos);
    this.salvarEnderecos(novosEnderecos);
  }

  limparEnderecos() {
    this.enderecosSubject.next([]);
    this.salvarEnderecos([]);
  }

  private carregarEnderecos() : void {
    try {
      const enderecosSalvos = localStorage.getItem(this.STORAGE_KEY);
      if (enderecosSalvos) {
        const enderecos = JSON.parse(enderecosSalvos);
        this.enderecosSubject.next(enderecos);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços do localStorage:', error);
      this.enderecosSubject.next([]);
    }
  }

  private salvarEnderecos(enderecos: EnderecoItem[]) : void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enderecos));
    } catch (error) {
      console.error('Erro ao salvar endereços no localStorage:', error);
    }
  }

  private gerarId(): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `${timestamp}-${randomStr}`;
  }

  private formatarEndereco(endereco: Endereco): string {
    return [
      endereco.logradouro,
      endereco.bairro,
      endereco.localidade,
      endereco.uf
    ]
      .filter(Boolean)
      .join(', ');
  }

  private formatarData(data: Date): string {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return formatter.format(data);
  }
} 