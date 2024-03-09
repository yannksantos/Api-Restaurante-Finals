import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component , OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItenspedidoService } from '../../services/itenspedido.service';
import { ItensmenuService } from '../../services/itensmenu.service';
import { ItensPedido } from '../../interfaces/itenspedido';
import { Router } from '@angular/router';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { Observable, map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { NOMEM } from 'dns';

@Component({
    selector: 'app-carrinho',
    standalone: true,
    templateUrl: './carrinho.component.html',
    styleUrl: './carrinho.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        NavbarComponent,
        ToolbarComponent
    ]
})
export default class CarrinhoComponent implements OnInit  {

  private route = inject(Router) 
  constructor(private carrinhoService: CarrinhoService,
              private itenspedidosService: ItenspedidoService,
              private itensmenuService: ItensmenuService,
              private userService: UserService
    ){}

  protected items$ = this.itenspedidosService.ListarItensPedido();

  /* somarItensPedido(): Observable<number> {
    return this.itenspedidosService.ListarItensPedido().pipe(
      map((itens: ItensPedido[]) => itens.reduce((acc: number, item: ItensPedido) => {
        if (item.Preco) {
          return acc + item.Preco;
        } else {
          console.error('Item sem preço:', item);
          return acc;
        }
      }, 0))
    );
  } */

  somarPedido(){
    this.itenspedidosService.ListarItensPedido().subscribe((itens: ItensPedido[]) => {
      this.total = itens.reduce((acc, item) => acc + item.preco, 0);
      console.log(this.total); // imprime o total no console
    });
  }
  
  
  
  
  ngOnInit() {
    /* this.somarItensPedido().subscribe(total => {
      this.total = total;
    }); */

    this.somarPedido()
  }

  onMostrar(item: ItensPedido) {
    console.log(item)
  }

  onRemoveClick(id: string){
    this.itenspedidosService.DeletarItensPedido(id).subscribe(() => {
      console.log('Item deletado com sucesso!');
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(['/carrinho']);
    });
  }

  protected total = 0;

  onPagmento(){
    this.route.navigate(['pagamento'])
    this.userService.updateTotal(this.total);
  }


}
