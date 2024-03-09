import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpCliente = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarCliente(): Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/Cliente`)
  }

  ObterCliente(id: string): Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/Cliente?${id}`)
  }

  ObterClienteCPF(cpf: string): Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/ObterCliente?cpf=${cpf}`);
  }

  AdicionarCliente( cliente: Cliente){
    return this.httpCliente.post<Cliente>(`${this.baseUrl}/Cliente ` , cliente)
  }

  AtualizarCliente( id: string , cliente: Cliente) : Observable<any>  {
    return this.httpCliente.put<Cliente>(`${this.baseUrl}/Cliente?${id}` , cliente)
  }

  DeletarClientar( id: string ) : Observable<any> {
    return this.httpCliente.delete<void>(`${this.baseUrl}/Cliente?${id}`)
  }
}
