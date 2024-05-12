import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/user';
import { AuthService } from '../servicios/auth.service';
import { FacturasService } from '../servicios/facturas.service';
import { Factura } from '../model/facturas';
import { VentasService } from '../servicios/ventas.service';
import { Ventas } from '../model/ventas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public user!: Usuario;
  public separatedWords: any;
  public facturas: Factura[] = [];
  public ventas: Ventas[] = [];
  public isEditing: boolean = false;
  public newUser!: Usuario;
  public nombre!: string;
  public apellido!: string;


  constructor(private authService: AuthService, private facturaService: FacturasService, private ventasService: VentasService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)

    this.isEditing = false

    this.facturaService.getFacturasById(this.user.idUsuario).subscribe((factura: Factura[]) => {
      this.facturas = factura;
      console.log(this.facturas)
    })

    this.ventasService.getVentas().subscribe((ventas: Ventas[]) =>{
      this.ventas=ventas
      console.log(this.ventas)
    })

    this.separatedWords = this.splitWordsByUppercase(this.user.nombreCompleto);
    console.log(this.user);
  }

  editar(){
    this.isEditing = true
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"], input[type="email"], input[type="tel"]');
  inputs.forEach((input: HTMLInputElement) => {
    input.readOnly = !this.isEditing;
  });

  }
  actualizar(){
    console.log(this.user)
    console.log(this.separatedWords)
    this.authService.modificarUsuario(this.user.email, this.user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  splitWordsByUppercase(input: string): string[] {
    return input.split(/(?=[A-Z])/).map(word => word.toLowerCase());
  }
}
