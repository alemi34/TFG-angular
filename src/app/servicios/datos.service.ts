import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Juego } from '../model/games';



@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private url = 'https://localhost:7149/api/Juegos/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getJuegos(): Observable<any> {
    return this.httpClient.get(this.url).pipe(catchError(this.errorHandler));
  }

  getJuego(id: number): Observable<any>{
    return this.httpClient.get(`${this.url}${id}`).pipe(catchError(this.errorHandler));
  }

  createJuego(juego: Juego): Observable<any>{
    console.log(juego)
      return this.httpClient.post(this.url, juego, this.httpOptions).pipe(catchError(this.errorHandler));
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
