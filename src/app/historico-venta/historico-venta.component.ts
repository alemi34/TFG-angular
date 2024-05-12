import { Component } from '@angular/core';
import { Ventas } from '../model/ventas';
import { Usuario } from '../model/user';
import { AuthService } from '../servicios/auth.service';
import { VentasService } from '../servicios/ventas.service';

@Component({
  selector: 'app-historico-venta',
  templateUrl: './historico-venta.component.html',
  styleUrls: ['./historico-venta.component.scss']
})
export class HistoricoVentaComponent {
  public ventas: Ventas[] = []
  public user!: Usuario;

  constructor(private authService: AuthService, private ventasService: VentasService){}

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)

    this.ventasService.getVentas().subscribe((ventas: Ventas[]) =>{
      this.ventas=ventas
      console.log(this.ventas)
    })
  }
}
