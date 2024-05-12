import { AuthService } from './../servicios/auth.service';
import { DatosService } from './../servicios/datos.service';
import { Component, OnInit } from '@angular/core';
import { Juego } from '../model/games';
import { Usuario } from '../model/user';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public juegos: Juego[] = [];
  public user!: Usuario;

  constructor(private datosService: DatosService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.datosService.getJuegos().subscribe((juego: Juego[]) => {
        this.juegos = juego;
      }
    )
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

}
