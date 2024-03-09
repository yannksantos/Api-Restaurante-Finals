import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracoesComponent {


  private userService = inject(UserService)
  private route = inject(Router)

  onLogout() {
    this.userService.logout();
    this.route.navigate([''])
  }

  onConfig(){
    this.route.navigate(['/configuracoes'])
  }

  onPedidos(){
    this.route.navigate(['pedidos'])
  }
 }
