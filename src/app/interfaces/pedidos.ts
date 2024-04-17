import { Cliente } from "./cliente";
import { Entregador } from "./entregador";
import { ItensPedido } from "./itenspedido";

  export interface Pedidos {
      Id?: string;
      PedidosId?: string;
      numeroPedido?: string;
      clientesId?: string;
      cliente: Cliente;  
      entregadorId?: string;
      entregador: Entregador;
      total: number;
      status?: number; 
      itensPedido: ItensPedido[];
      userId: string
    }