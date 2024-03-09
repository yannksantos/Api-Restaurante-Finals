import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItensPedido } from '../interfaces/itenspedido';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ItenspedidoService {

  private httpCliente = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarItensPedido() : Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/ItensPedido`)
  }

  ObterItensPedido(id: string) : Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/Pedido?${id}`)
  }

  AdicionarItensPedido( itensPedido: ItensPedido){
    return this.httpCliente.post<ItensPedido>(`${this.baseUrl}/ItensPedido ` , itensPedido)
  }

  AtualizarItensPedido( id: string , itensPedido: ItensPedido) : Observable<any> {
    return this.httpCliente.put<ItensPedido>(`${this.baseUrl}/Pedido/${id}` , itensPedido)
  }

  DeletarItensPedido( id: string ) : Observable<any> {
    return this.httpCliente.delete<void>(`${this.baseUrl}/ItensPedido/${id}`)
  }
}
