import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
//import {  MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConfiguracoesComponent } from "../configuracoes/configuracoes.component";

@Component({
    selector: 'app-toolbar',
    standalone: true,
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        //MatIconModule,
        ConfiguracoesComponent
    ]
})
export class ToolbarComponent implements OnInit{

  private route = inject(Router)
  private userService = inject(UserService)

  protected showConfig = false

  mudarConfig() {
      this.showConfig = !this.showConfig;
  }

  isHomeRoute() {
    return this.route.url === '/home';
  }

  onQuemSomos(){
    this.route.navigate(['/quemsomos'])
  }

  onHome(){
    this.route.navigate(['/home'])
  }

  onCardapio(){
    this.route.navigate(['/cardapio'])
  }

  onDoDia(){
    this.route.navigate(['/dodia'])
  }

  onCarrinho(){
    this.route.navigate(['/carrinho'])
  }

  protected userName!: string 


  ngOnInit(): void {
    this.onMostrarUser();
  }
  onMostrarUser(){
    const email = this.userService.nomeUser();
  
  if (email.includes('@')) {
    this.userName = email.split('@')[0];
  } else {
    this.userName = email;
  }
  this.userName = this.userName.substring(0, 11);
 }
} 