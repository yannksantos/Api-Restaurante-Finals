import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { PedidosService } from '../../services/pedidos.service';

@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ToolbarComponent,
        AsyncPipe,
    ]
})
export default class PedidosComponent implements OnInit {

  private pedidoService = inject(PedidosService)

  protected items$ = this.pedidoService.ListarPedidos();
  

  pedidos: any[] = []; 
  ngOnInit() {
    this.pedidoService.ListarPedidos().subscribe((data: any[]) => {
      this.pedidos = data;
      console.log(data)
    });
  }

  onClick(){
    console.log(this.items$)
  }
 }
