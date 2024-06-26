import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Juego } from '../model/games';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private url = 'http://4.233.222.166:83/api/Juegos/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getJuegos(): Observable<any> {
    return this.httpClient.get(this.url).pipe(catchError(this.errorHandler));
  }

  getJuego(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}${id}`).pipe(catchError(this.errorHandler));
  }

  createJuego(juego: Juego): Observable<any> {
    console.log(juego);
    return this.httpClient.post<any>(this.url, juego, this.httpOptions).pipe(
      map(response => {
        // Devuelve la ID del juego creado desde la respuesta
        return response.idJuego;
      }),
      catchError(this.errorHandler)
    );
  }

  searchGame(juego: string): Observable<any> {
    console.log(juego);
    return this.httpClient.get(`${this.url}nombre/${juego}`).pipe(catchError(this.errorHandler))
  }

  modificarJuego(idJuego: number, Juego: Juego) {
    console.log(Juego);
    console.log(idJuego);
    return this.httpClient.put(`${this.url}${idJuego}`, Juego, this.httpOptions).pipe(catchError(this.errorHandler));
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
