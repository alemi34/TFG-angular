import { Component } from '@angular/core';
import { Juego } from '../model/games';
import { ActivatedRoute } from '@angular/router';
import { DatosService } from '../servicios/datos.service';
import { CarritoService } from '../servicios/carrito.service';
import { Usuario } from '../model/user';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  id!: number;
  game!: Juego;
  public user!: Usuario;

  constructor(public datosService: DatosService ,private route: ActivatedRoute, private carrito:CarritoService,private  authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idJuego'];

    this.datosService.getJuego(this.id).subscribe((juego: Juego) =>{
      this.game = juego;
    })

    this.user = this.authService.getUsuario()
    console.log(this.user)
  }
  addTocart(){
    console.log(this.game)
    this.carrito.addToCart(this.game)
  }
}
