export interface Endereco {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  estado: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  regiao: string;
  siafi: string;
  uf: string;
  unidade: string;
  erro?: boolean;
}

export interface EnderecoItem {
  id: string;
  cep: string;
  endereco: string;
  data: string;
  enderecoCompleto: Endereco;
}
