import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  constructor() { }

  private readonly baseUrl = environment["endPoint"];

  ListarCliente(): Observable<any>  {
    return this.httpClient.get(`${this.baseUrl}/ListaUsuarios`)
  }

  ObterCliente(id: string): Observable<any>  {
    return this.httpClient.get(`${this.baseUrl}/Cliente?${id}`)
  }

  AdicionarUsuario( users: Users){
    return this.httpClient.post<Users>(`${this.baseUrl}/AdicionaUsuario ` , users)
  }

  AtualizarCliente( id: string ,users: Users) : Observable<any>  {
    return this.httpClient.put<Users>(`${this.baseUrl}/AtualizarUsuario?${id}` , users)
  }

  DeletarClientar( id: string ) : Observable<any> {
    return this.httpClient.delete<void>(`${this.baseUrl}/DeletaUsuario?${id}`)
  }

}
