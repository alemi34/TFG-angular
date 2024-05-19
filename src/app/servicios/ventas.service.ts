import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private url = 'https://localhost:7149/api/UserBuy/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getVentas(): Observable<any> {
    return this.httpClient.get(this.url).pipe(catchError(this.errorHandler))
  }

  getVentaById(userId : number): Observable<any> {
    return this.httpClient.get(`${this.url}User/${userId}`).pipe(catchError(this.errorHandler))
  }

  deleteVenta(userId : number, gameId : number) {
    // TODO hacer que cuando se quite uno se ponga en 0 la cantidad
    return this.httpClient.delete(`${this.url}${userId}${gameId}`, this.httpOptions).pipe(
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
