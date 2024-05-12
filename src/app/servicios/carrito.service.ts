import { Injectable } from '@angular/core';
import { Juego } from '../model/games';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: Juego[] = [];
  constructor(){}

  addToCart(juego: Juego){
    this.items.push(juego);
    console.log(this.items)
  }

  removeFromCart(index: number){
    this.items.splice(index,1)
  }
  getItems(): Juego[] {
    return this.items;
  }

}
