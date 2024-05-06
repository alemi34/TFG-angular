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

  guardarDatos(){
    if(this.juego !== undefined && this.imagenBytes !== undefined){
      this.juego.cantidad = 1;
      this.juego.imagen = this.imagenBytes;


      // Utiliza el operador 'pipe' para encadenar operadores y realizar una operación antes de la suscripción
      this.datosService.createJuego(this.juego).pipe(
        tap(response => {
          console.log('Operación antes de la suscripción:', response);
          // Aquí puedes realizar cualquier operación que desees antes de la suscripción
        })
      ).subscribe(response => {
        console.log('Juego creado correctamente', response);
      },
      error => {
        console.error('Error al crear', error);
      });
    } else {
      alert('No se han rellenado todos los campos');
    }
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer: ArrayBuffer | null = reader.result as ArrayBuffer;
        if (arrayBuffer) {
          this.imagenBytes = new Uint8Array(arrayBuffer);
          console.log('Imagen convertida a byte[]:', this.imagenBytes);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
