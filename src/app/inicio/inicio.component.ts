import { AuthService } from './../servicios/auth.service';
import { DatosService } from './../servicios/datos.service';
import { Component, OnInit } from '@angular/core';
import { Juego } from '../model/games';
import { Usuario } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public juegos: Juego[] = [];
  public user!: Usuario;
  public juego!: Juego;
  public input!: string;

  constructor(private datosService: DatosService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.datosService.getJuegos().subscribe((juego: Juego[]) => {
      this.juegos = juego;
    }
    )
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  navegar() {
    this.datosService.searchGame(this.input).subscribe((game: Juego) => {
      this.juego = game;
      console.log(this.juego)
      this.router.navigate([`/details/${this.juego.idJuego}`])
    })
  }

}
