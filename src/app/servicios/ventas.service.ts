import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Ventas } from '../model/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private url = 'http://4.233.222.166:83/api/UserBuy/'

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
    return this.httpClient.delete(`${this.url}${userId}${gameId}`, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  modifyVenta(userId: number, gameId: number, ventas: Ventas){
    return this.httpClient.put(`${this.url}${userId}/${gameId}`, ventas, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  createVenta(venta: Ventas){
    return this.httpClient.post(this.url, venta, this.httpOptions).pipe(catchError(this.errorHandler))
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
