import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItensMenu } from '../interfaces/itensmenu';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() { }

  private carrinho: ItensMenu[] = [];
  private carrinhoSubject = new BehaviorSubject(this.carrinho)

  carrinho$ = this.carrinhoSubject.asObservable(); 

  adicionarItemAoCarrinho(item: ItensMenu){
    this.carrinho.push(item)
    this.carrinhoSubject.next(this.carrinho)
  }

}

