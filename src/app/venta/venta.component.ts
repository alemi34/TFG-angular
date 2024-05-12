import { DatosService } from './../servicios/datos.service';
import { Component } from '@angular/core';
import { Juego } from '../model/games';
import { tap } from 'rxjs/operators'; // Importa el operador 'tap'

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {

  juego: Juego = new Juego;
  imagenBytes: Uint8Array | undefined;

  constructor(private datosService: DatosService){}

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.juego.imagen = files[0];
    } else {
      console.error('No se seleccionó ningún archivo');
    }
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
