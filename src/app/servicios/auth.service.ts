import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged: boolean = false;
  private userEmail!: string;
  private url = 'https://localhost:7149/api/Usuarios/'
  usuario!: Usuario

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getUser(email: string): Observable<any> {
    return this.httpClient.get(`${this.url}${email}`).pipe(catchError(this.errorHandler));
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getUser(email).subscribe(
        (user) => {
          // Verificamos si el usuario existe
          if (user) {
            // Guardamos los datos del usuario en la variable usuario
            this.usuario = user;
            console.log(this.usuario, "antes")
            // Verificamos si la contraseña coincide
            if (this.usuario.contraseña === password) {
              // Si coincide, establecemos isLoggedIn en true y almacenamos el correo electrónico del usuario
              console.log(this.usuario)
              this.isLogged = true;
              this.userEmail = email;
              observer.next(true); // Credenciales válidas
            } else {
              this.usuario = new Usuario;
              observer.next(false); // Contraseña inválida
            }
          } else {
            observer.next(false); // Usuario no encontrado
          }
          observer.complete();
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
          observer.next(false); // Manejo de errores
          observer.complete();
        }
      );
    });
  }

  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}id/${id}`).pipe(catchError(this.errorHandler));
  }

  getUsuario(): any {
    return this.usuario;
  }

  modificarUsuario(email: string, user:Usuario){
    console.log(user)
    console.log(email)
    console.log(this.url+email)
    return this.httpClient.put(this.url+email, JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  registerUsers(user: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.url, user, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }


  errorHandler(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

}
