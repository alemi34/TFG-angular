import { AuthService } from './../servicios/auth.service';
import { Juego } from '../model/games';
import { Usuario } from '../model/user';
import { CarritoService } from './../servicios/carrito.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {
  items!: Juego[]
  public user!: Usuario;

  constructor(private carrito: CarritoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.items = this.carrito.getItems();
    console.log(this.items)

    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

}
