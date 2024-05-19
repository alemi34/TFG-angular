import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Comentario } from '../model/comentario';

@Injectable({
  providedIn: 'root'
})

export class ComentarioService {
  private url = 'https://localhost:7149/api/Comentarios/'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.url).pipe(catchError(this.errorHandler))
  }

  createComent(comentario: Comentario): Observable<any>{
    console.log(comentario)
    return this.httpClient.post(this.url, comentario, this.httpOptions)
  }

  getByGame(id: number): Observable<any>{
    return this.httpClient.get(`${this.url}game/${id}`)
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
