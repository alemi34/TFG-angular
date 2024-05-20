import { Component } from '@angular/core';
import { AuthService } from './../servicios/auth.service';
import { DatosService } from './../servicios/datos.service';
import { Juego } from '../model/games';
import { Usuario } from '../model/user';
import { VentasService } from '../servicios/ventas.service';
import { Ventas } from '../model/ventas';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {

  juego: Juego = new Juego();
  imagenBytes: Uint8Array | undefined;
  public user!: Usuario;
  generos: string[] = [];
  venta: Ventas = new Ventas();

  constructor(private datosService: DatosService, private authService: AuthService, private ventaService: VentasService) {
    this.juego.categoria = '';
  }

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    console.log(this.user);
  }

  guardarDatos() {
    this.juego.cantidad = 1;
    console.log(this.juego);

    this.datosService.createJuego(this.juego)
      .subscribe((juegoCreadoId: number) => {
        console.log('ID del juego creado:', juegoCreadoId);

        this.venta.idJuego = juegoCreadoId;

        this.venta.idUsuario = this.user.idUsuario;
        this.venta.operacion = 'V';

        console.log(this.venta)
        this.ventaService.createVenta(this.venta).subscribe(response => {
          console.log('Venta subida exitosamente', response);
        }, error => {
          console.error('Error al subir la venta', error);
        });
      }, error => {
        console.error('Error al subir el juego', error);
      });
  }

  actualizarGeneros(event: Event, genero: string) {
    const checkbox = (event.target as HTMLInputElement)?.checked;
    if (checkbox !== undefined) {
      if (checkbox) {
        // Agregar el género si está seleccionado
        if (!this.juego.categoria.includes(genero)) {
          this.juego.categoria += (this.juego.categoria ? ', ' : '') + genero;
        }
      } else {
        // Quitar el género si está deseleccionado
        this.juego.categoria = this.juego.categoria.replace(new RegExp(genero + ',?'), '');
      }
    }
  }
}
