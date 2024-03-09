import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  private route = inject(Router)
  private userService = inject(UserService)

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


  onLogout() {
    this.userService.logout();
    this.route.navigate([''])
  }
 }
