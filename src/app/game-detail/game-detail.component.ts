import { Component } from '@angular/core';
import { Juego } from '../model/games';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../servicios/datos.service';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  id!: number;
  game!: Juego;
  constructor(public datosService: DatosService ,private route: ActivatedRoute, private carrito:CarritoService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idJuego'];

    this.datosService.getJuego(this.id).subscribe((juego: Juego) =>{
      this.game = juego;
    })
  }
  addTocart(){
    console.log(this.game)
    this.carrito.addToCart(this.game)
  }
}
