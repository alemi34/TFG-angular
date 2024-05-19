import { Component } from '@angular/core';
import { AuthService } from './../servicios/auth.service';
import { Usuario } from '../model/user';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getUsuario()
    console.log(this.user)
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (loggedIn) => {
          if (loggedIn) {
            this.router.navigate([`/`])

          } else {
            this.error = 'Credenciales inválidas';
          }
        },
        (error) => {
          this.error = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      this.error = 'Por favor, ingresa tu correo electrónico y contraseña.';
    }
  }
}
