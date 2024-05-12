import { AuthService } from './../servicios/auth.service';
import { Component } from '@angular/core';
import { Factura } from '../model/facturas';
import { Usuario } from '../model/user';
import { FacturasService } from '../servicios/facturas.service';

@Component({
  selector: 'app-historico-factura',
  templateUrl: './historico-factura.component.html',
  styleUrls: ['./historico-factura.component.scss']
})
export class HistoricoFacturaComponent {
  public facturas: Factura[]= []
  public user! : Usuario;

  constructor(private authService: AuthService, private facturaService: FacturasService) {}

  ngOnInit(): void {
    this.user = this.authService.getUsuario();
    console.log(this.user)

    this.facturaService.getFacturasById(this.user.idUsuario).subscribe((factura: Factura[]) => {
      this.facturas = factura;
      console.log(this.facturas)
    })

  }
}
