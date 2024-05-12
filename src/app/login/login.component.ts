import { Component } from '@angular/core';
import { AuthService } from './../servicios/auth.service';
import { Usuario } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email!: string;
  password!: string;
  error!: string;
  public user!: Usuario;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  login(){
    // Verifica si el correo electrónico y la contraseña están presentes
    if (this.email && this.password) {
      // Llama al método login del servicio AuthService
      this.authService.login(this.email, this.password).subscribe(
        (loggedIn) => {
          if (loggedIn) {
            // Redirige al usuario a la página principal después del inicio de sesión exitoso
            // Puedes usar Router de Angular para redireccionar
          } else {
            // Muestra un mensaje de error al usuario si las credenciales son incorrectas
            this.error = 'Credenciales inválidas';
          }
        },
        (error) => {
          // Muestra un mensaje de error genérico si hay un error al iniciar sesión
          this.error = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      // Muestra un mensaje de error si el correo electrónico y/o la contraseña están vacíos
      this.error = 'Por favor, ingresa tu correo electrónico y contraseña.';
    }
  }
}
