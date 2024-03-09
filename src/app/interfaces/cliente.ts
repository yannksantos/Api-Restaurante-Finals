import { Endereco } from "./endereco";

export interface Cliente {
    Id?: string;
    IdCliente?: string;
    Nome: string;
    Sobrenome: string;
    Telefone: string;
    CPF: string;  
    EnderecoId?: string;
    Endereco: Endereco;
  }
