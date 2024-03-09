import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticadoPortal: boolean = false;
  private token: any;
  private user: any;


  private httpCliente = inject(HttpClient)
  constructor( ) {
  }

  checkToken() {
    return Promise.resolve(true);
  }

  UsuarioAutenticado( status: boolean) {
    localStorage.setItem('usuarioAutenticadoPortal' , JSON.stringify(status));
    this.usuarioAutenticadoPortal = status
  }
  
  UsuarioEstaAutenticado( ) : Promise<boolean> {
    this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') == 'true';
    return Promise.resolve(this.usuarioAutenticadoPortal)
  }

  setToken(){
    this.token = localStorage.getItem('token')
    return this.token;
  } 

  limparToken(){
    this.token = null;
    this.user = null;
  }

  limparDadosUsuarios() {
    this.UsuarioAutenticado(false),
    this.limparToken();
    localStorage.clear();
    sessionStorage.clear();
  }

  setEmailUser(email: string){
    localStorage.setItem('emailUser', email);
  }

  getEmailUser() {
    var emailUserLogado = localStorage.getItem('emailUser');
    if(emailUserLogado) {
      return emailUserLogado
    }
    else { 
      this.limparDadosUsuarios();
      return ""
    }
  }

  getEmailUsers() {
    var emailUserLogado = localStorage.getItem('emailUser');
    if(!emailUserLogado) this.limparDadosUsuarios();
      return ""
  }
}
