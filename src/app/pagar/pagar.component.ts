import { Juego } from '../model/games';
import { CarritoService } from './../servicios/carrito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit{
  items!: Juego[]
  constructor(private carrito:CarritoService) { }

  ngOnInit(): void {
    this.items = this.carrito.getItems();
    console.log(this.items)


  }

}
