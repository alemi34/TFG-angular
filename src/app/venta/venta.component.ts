import { AuthService } from './../servicios/auth.service';
import { DatosService } from './../servicios/datos.service';
import { Component } from '@angular/core';
import { Juego } from '../model/games';
import { tap } from 'rxjs/operators'; // Importa el operador 'tap'
import { Usuario } from '../model/user';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {

  juego: Juego = new Juego;
  imagenBytes: Uint8Array | undefined;
  public user!: Usuario;

  constructor(private datosService: DatosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  guardarDatos() {
    this.datosService.createJuego(this.juego)
      .subscribe(response => {
        console.log('Juego subido exitosamente', response);
      }, error => {
        console.error('Error al subir el juego', error);
      });
  }
}
