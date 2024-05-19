import { AuthService } from './../servicios/auth.service';
import { Component } from '@angular/core';
import { Usuario } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  usuario: Usuario = new Usuario;
  nombre!: string;
  apellido!: string;
  password!: string
  password2!: string
  public user!: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  crearUser() {
    this.usuario.nombreCompleto = `${this.nombre} ${this.apellido}`;
    if (this.password === this.password2) {
      this.usuario.contraseña = this.password;
      console.log('antes', this.usuario);

      this.authService.registerUsers(this.usuario).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
}

