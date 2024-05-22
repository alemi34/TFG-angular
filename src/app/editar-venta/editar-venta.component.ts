import { Juego } from './../model/games';
import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { VentasService } from '../servicios/ventas.service';
import { Usuario } from '../model/user';
import { DatosService } from '../servicios/datos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-venta',
  templateUrl: './editar-venta.component.html',
  styleUrls: ['./editar-venta.component.scss']
})
export class EditarVentaComponent {
  public user!: Usuario;
  public juego!: Juego;
  public idJuego!: number;


  constructor(private authService: AuthService, private ventasService: VentasService, private dataService: DatosService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)

    this.idJuego = this.route.snapshot.params['idJuego'];


    this.dataService.getJuego(this.idJuego).subscribe((juegos: Juego) => {
      this.juego = juegos
      console.log(this.juego)
    })
    this.dataService.getJuego(this.idJuego).subscribe((juegos: Juego) => {
      this.juego = juegos
      console.log(this.juego)
    })
  }

  editar() {
    console.log(this.juego)
    this.dataService.modificarJuego(this.juego.idJuego, this.juego).subscribe((response) => {
      console.log('Registro exitoso:', response);
    },
      (error) => {
        console.error('Error en el registro:', error);
      })
  }

}
