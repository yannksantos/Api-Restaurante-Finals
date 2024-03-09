import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItensmenuService } from '../../services/itensmenu.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ItenspedidoService } from '../../services/itenspedido.service';
import { ItensPedido } from '../../interfaces/itenspedido';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";


@Component({
    selector: 'app-cardapio',
    standalone: true,
    templateUrl: './cardapio.component.html',
    styleUrl: './cardapio.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NavbarComponent,
        FormsModule,
        AsyncPipe,
        MatIconModule,
        ToolbarComponent
    ]
})
export default class CardapioComponent {

  private route = inject(Router)
  constructor(
    private carrinhoService: CarrinhoService,
    private itensmmenuService: ItensmenuService,
    private itenspedidoService: ItenspedidoService

    ) {}

   protected items$ = this.itensmmenuService.ListarItensMenu();

  onAdicionarAoCarrinho(nome: string, preco: number){
    console.log(nome, preco);

  let novoItemPedido: ItensPedido = {
    Nome: nome,
    preco: preco,
    UserId: ''
  };

  console.log(novoItemPedido)
  
  this.itenspedidoService.AdicionarItensPedido(novoItemPedido).subscribe(() => {
    console.log(novoItemPedido , 'Esse daki é o enviado');
  });
}

  onItemClick(){
    this.route.navigate(['/adicionaritem'])
  }

  onRemoveClick(id: string){
    this.itensmmenuService.DeletarItensMenu(id).subscribe(() => {
      console.log('Item deletado com sucesso!');
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/cardapio']);
    });
  }
}