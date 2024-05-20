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
import { ICreateOrderRequest } from "ngx-paypal";

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
  public payPalConfig: any;

  constructor(private carrito: CarritoService, private authService: AuthService, private dataService: DatosService, private facturaService: FacturasService, private ventasService: VentasService) { }

  ngOnInit(): void {

    this.items = this.carrito.getItems();
    console.log(this.items)

    this.user = this.authService.getUsuario()
    console.log(this.user)
    this.initPaypalConfig()
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
    this.items = []
  }




  initPaypalConfig() {
    this.payPalConfig = {
      currency: "EUR",
      clientId: "AX_J8wPn4m0CH77AgEIkpkCudgOweEcb8tyDkgzKRbleWN8dWuCAb0TBP1V-zIj1QUdB-AfXWs7H88cn",
      createOrder: (data: any, actions: any) => <ICreateOrderRequest>{
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: "9.99", // Precio de ejemplo, puedes cambiarlo según tu lógica
            },
            items: this.items.map((item: Juego) => { // Mapea los juegos en items a la estructura requerida por PayPal
              return {
                name: item.nombre,
                quantity: "1",
                category: "DIGITAL_GOODS",
                unit_amount: {
                  currency_code: "EUR",
                  value: item.precio.toString(), // Convierte el precio a cadena
                }
              };
            })
          }
        ]
      },
      onApprove: (data: any, actions: { order: { get: () => Promise<any>; }; }) => {
        this.pagar();
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data: any) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
      },
      onCancel: (data: any, actions: any) => {
        console.log("OnCancel", data, actions);
      },
      onError: (err: any) => {
        console.log("OnError", err);
      },
      onClick: (data: any, actions: any) => {
        console.log("onClick", data, actions);
      }
    };
  }

}
