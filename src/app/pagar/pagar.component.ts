import { VentasService } from './../servicios/ventas.service';
import { AuthService } from './../servicios/auth.service';
import { Juego } from '../model/games';
import { Usuario } from '../model/user';
import { CarritoService } from './../servicios/carrito.service';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../servicios/datos.service';
import { FacturasService } from '../servicios/facturas.service';
import { Factura } from '../model/facturas';
import { Ventas } from '../model/ventas';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {
  items!: Juego[]
  public user!: Usuario;
  factura: Factura = new Factura;
  venta: Ventas = new Ventas;

  constructor(private carrito: CarritoService, private authService: AuthService, private dataService: DatosService, private facturaService: FacturasService, private ventasService: VentasService) { }

  ngOnInit(): void {
    this.items = this.carrito.getItems();
    console.log(this.items)

    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  pagar() {
    this.items.forEach(item => {
      item.cantidad =0;
      this.dataService.modificarJuego(item.idJuego, item).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
      this.factura.idJuego = item.idJuego
      this.factura.idUsuario = this.user.idUsuario
      this.factura.precio = item.precio
      this.factura.fecha = new Date()
      this.facturaService.createFactura(this.factura).subscribe(response => {
        console.log('Juego subido exitosamente', response);
      }, error => {
        console.error('Error al subir el juego', error);
      });
      this.venta.idJuego = item.idJuego
      this.venta.idUsuario = this.user.idUsuario
      this.venta.operacion = "c"
      this.ventasService.modifyVenta(this.user.idUsuario, item.idJuego, this.venta).subscribe(response => {
        console.log('Juego subido exitosamente', response);
      }, error => {
        console.error('Error al subir el juego', error);
      });
    });
  }


}
