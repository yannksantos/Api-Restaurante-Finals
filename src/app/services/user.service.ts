import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, of, tap } from 'rxjs';
import { userStorage } from '../interfaces/userStorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = environment["endPoint"];
  private httpCliente = inject(HttpClient)
  private AutenticadoSubject = new BehaviorSubject<boolean>(false);
  private route = inject(Router)
  constructor() { }

  protected emailUser = ''

  login(Email: string , Password: string ){
    if (this.getToken()) {
      alert('Por favor, faça logout antes de fazer login com uma conta diferente.');
      this.route.navigate(['/home'])
      return of(null); 
      
    }
    
    this.emailUser = Email
    localStorage.setItem('username', this.emailUser);

    return this.httpCliente.post<any>(`${this.baseUrl}/CreateToken` , { Email: Email , Password : Password}).pipe(
      tap(response => localStorage.setItem('currentUser', JSON.stringify(response)))
    );
  }

  getToken(): string {
    const currentUser: userStorage = JSON.parse(localStorage.getItem('currentUser')!);
    return currentUser ? currentUser.securityToken : '';
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');

    this.AutenticadoSubject.next(false)
  }

  private token = this.getToken()

  estaLogado(){
    if(this.token) {
      return true;
    }
    return false;
  }
  
  nomeUser(): string {
    return localStorage.getItem('username')!; 
  }

  private totalSubject = new BehaviorSubject<number>(0); 
  total$ = this.totalSubject.asObservable(); 

  updateTotal(total: number) { 
    this.totalSubject.next(total);
  }
}
