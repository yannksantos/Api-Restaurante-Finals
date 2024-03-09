import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entregador } from '../interfaces/entregador';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntregadorService {

  private httpCliente = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarEntregador() : Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/Entregador`)
  }

  ObterEntregador(id: string) : Observable<any>   {
    return this.httpCliente.get(`${this.baseUrl}/Entregador?${id}`)
  }

  AdicionarEntregador( entregador: Entregador) : Observable<any> {
    return this.httpCliente.post<Entregador>(`${this.baseUrl}/Entregador ` , entregador)
  }

  AtualizarEntregador( id: string , entregador: Entregador): Observable<any> {
    return this.httpCliente.put<Entregador>(`${this.baseUrl}/Entregador?${id}` , entregador)
  }

  DeletarEntregador( id: string ): Observable<any> {
    return this.httpCliente.delete<void>(`${this.baseUrl}/Entregador?${id}`)
  }
}
