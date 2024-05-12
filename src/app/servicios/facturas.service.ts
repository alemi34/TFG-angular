import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private url = 'https://localhost:7149/api/Facturas/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getFacturas(): Observable<any> {
    return this.httpClient.get(this.url).pipe(catchError(this.errorHandler));
  }

  getFacturasById(id: number): Observable<any>{
    return this.httpClient.get(`${this.url}ByUserId/${id}`)
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
