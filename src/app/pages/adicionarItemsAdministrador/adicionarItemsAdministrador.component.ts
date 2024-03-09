import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ItensmenuService } from '../../services/itensmenu.service';
import { ItensMenu } from '../../interfaces/itensmenu';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adicionar-items-administrador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './adicionarItemsAdministrador.component.html',
  styleUrl: './adicionarItemsAdministrador.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdicionarItemsAdministradorComponent implements OnInit {


  private route = inject(Router)
 
  constructor(private itensmenuService: ItensmenuService) {}


  ngOnInit(): void {
    
  }


  itensMenu: ItensMenu = { Nome: '' , Preco : 0  }

  onSubmit() {
    this.itensmenuService.AdicionarItensMenu(this.itensMenu).subscribe(() => {
      console.log('Item adicionado com sucesso!');
      this.route.navigate(['/cardapio'])
    });
  }
 }