import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { Subscription, forkJoin, map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { PedidosService } from '../../services/pedidos.service';
import { Cliente } from '../../interfaces/cliente';
import { MatIconModule } from '@angular/material/icon';
import { ItenspedidoService } from '../../services/itenspedido.service';
import { EntregadorService } from '../../services/entregador.service';
import { ItensPedido } from '../../interfaces/itenspedido';
import { Entregador } from '../../interfaces/entregador';
import { Pedidos } from '../../interfaces/pedidos';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  templateUrl:'./pagamento.component.html',
  styleUrl: './pagamento.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ToolbarComponent,
    ReactiveFormsModule,
    MatIconModule]
})
export default class PagamentoComponent implements OnInit {

  protected total!: number; 
  protected subscription?: Subscription;

  private userService = inject(UserService)
  private clienteService = inject(ClienteService)
  private formBuilder = inject(FormBuilder)
  private pedidoService = inject(PedidosService)
  private itenspedidoService = inject(ItenspedidoService)
  private entregadorService = inject(EntregadorService)

  public enderecoForm!: FormGroup;

  ngOnInit(): void {
    this.subscription = this.userService.total$.subscribe(total => {
      this.total = total; 
    });

    this.enderecoForm = this.formBuilder.group({
      Nome: [''],
      Sobrenome: [''],
      CPF: [''],
      Rua: [''],
      CEP: [''],
      Numero: ['']
    });
  }

  protected cliente: any

  onBuscar() {
    const buscar: string = this.enderecoForm?.get('CPF')?.value;
    if (buscar) {
      this.clienteService.ObterClienteCPF(buscar).subscribe(
        (cliente: any) => {
          console.log('Cliente encontrado', cliente);
          this.preencherFormulario(cliente);
          this.cliente = cliente
          alert("Cliente encontrado");
        },
        (erro) => {
          console.log('Erro ao buscar cliente', erro);
          alert("Cliente não encontrado");
        }
      );
    } else {
      console.log('CPF não fornecido');
      alert("Por favor, digite um CPF válido");
    }
  }

  preencherFormulario(cliente: any) {
    this.enderecoForm?.patchValue({
      Nome: cliente.nome,
      Sobrenome: cliente.sobrenome,
      CPF: cliente.cpf,
      Rua: cliente.endereco.rua,
      CEP: cliente.endereco.cep,
      Numero: cliente.endereco.numeroCasa
    });
    this.enderecoForm?.get('Nome')?.disable();
    this.enderecoForm?.get('Sobrenome')?.disable();
    this.enderecoForm?.get('CPF')?.disable();
    this.enderecoForm?.get('Rua')?.disable();
    this.enderecoForm?.get('CEP')?.disable();
    this.enderecoForm?.get('Numero')?.disable();
  }

  escolherEntregador(entregadores: Entregador[]): Entregador {
    let randomIndex = Math.random() * entregadores.length;
    randomIndex = Math.floor(randomIndex);
    let entregador = entregadores[randomIndex];
    return entregador;
  }

  gerarId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  criarPedido(itens: ItensPedido[], cliente: Cliente, entregador: Entregador): Pedidos {
    let numeroPedido = this.gerarId()
    let total = this.total
    let status = 1;
    let pedido: Pedidos = {
      numeroPedido: numeroPedido,
      clientesId: this.gerarId(),
      cliente: cliente,
      entregadorId: this.gerarId(),
      entregador: entregador,
      total: total,
      status: status,
      itensPedido: itens,
      userId: ""
    };
    alert("Pedido adicionado")
    return pedido;
  }
  
  onClick() {
    var itensPedido$ = this.itenspedidoService.ListarItensPedido();
    var entregadores$ = this.entregadorService.ListarEntregador();
    var entregador$ = entregadores$.pipe(
      map(entregadores => this.escolherEntregador(entregadores))
    );
    forkJoin([itensPedido$, entregador$]).subscribe(([itensPedido, entregador]) => {
      var pedido = this.criarPedido(itensPedido, this.cliente, entregador);
      console.log(pedido, "pedidosEm precosse")
      this.pedidoService.AdicionarPedidos(pedido).subscribe(() => {
        alert("Pedido feito com sucesso");
      });
    });
  }
}
