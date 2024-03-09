import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItensMenu } from '../interfaces/itensmenu';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ItensmenuService {

  private httpCliente = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarItensMenu() : Observable<any> {
    return this.httpCliente.get(`${this.baseUrl}/ItensMenu`)
  }

  ObterItensMenu(id: string) : Observable<any>  {
    return this.httpCliente.get(`${this.baseUrl}/ItensMenu?${id}`)
  }

  AdicionarItensMenu( itensMenu: ItensMenu) {
    return this.httpCliente.post<ItensMenu>(`${this.baseUrl}/ItensMenu` , itensMenu)
  }

  AtualizarItensMenu( id: string , itensMenu: ItensMenu) : Observable<any> {
    return this.httpCliente.put<ItensMenu>(`${this.baseUrl}/ItensMenu?${id}` , itensMenu)
  }

  DeletarItensMenu( id: string ) : Observable<any> {
    return this.httpCliente.delete<void>(`${this.baseUrl}/ItensMenu/${id}`)
  }
}
