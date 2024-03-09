import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedidos } from '../interfaces/pedidos';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private httpCliente = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarPedidos() : Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/Pedidos`)
  }

  ObterPedidos(id: string): Observable<any>   {
    return this.httpCliente.get(`${this.baseUrl}/Pedido?${id}`)
  }

  AdicionarPedidos( pedidos: Pedidos){
    return this.httpCliente.post<Pedidos>(`${this.baseUrl}/Pedidos` , pedidos)
  }

  AtualizarPedidos( id: string , pedidos: Pedidos) : Observable<any> {
    return this.httpCliente.put<Pedidos>(`${this.baseUrl}/Pedido?${id}` , pedidos)
  }

  DeletarPedidos( id: string ) : Observable<any> {
    return this.httpCliente.delete<void>(`${this.baseUrl}/Pedido?${id}`)
  }
}
