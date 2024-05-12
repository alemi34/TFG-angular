import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/user';
import { AuthService } from '../servicios/auth.service';
import { FacturasService } from '../servicios/facturas.service';
import { Factura } from '../model/facturas';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public user!: Usuario;
  public separatedWords: any;
  public facturas: Factura[] = [];

  constructor(private authService: AuthService, private facturaService: FacturasService) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)

    this.facturaService.getFacturasById(this.user.idUsuario).subscribe((factura: Factura[]) => {
      this.facturas = factura;
      console.log(this.facturas)
    })


    this.separatedWords = this.splitWordsByUppercase(this.user.nombreCompleto);
    console.log(this.user);

  }

  splitWordsByUppercase(input: string): string[] {
    return input.split(/(?=[A-Z])/).map(word => word.toLowerCase());
  }
}
