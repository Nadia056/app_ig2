import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, Subject, tap, throwError } from 'rxjs';

import {  HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/models/book';
import { env } from 'src/app/enviroments/env';

@Injectable({
  providedIn: 'root'
})

export class P9ServiceService {
  private _refresh$ = new Subject<void>();
  private  url=env.apiUrl


  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }

  constructor(private http: HttpClient) { }



  get refresh$() { return this._refresh$ }

  getBooks()
  {
    return this.http.get(this.url+"practica9");
  }
  bookStore(form:Book)
  {
      return this.http.post<any>(this.url+'practica9',form) .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 422) {
            window.alert('Fill all the fields');
          } else {
            window.alert('An error occurred. Please try again later');
          }
          return throwError(() => new Error('Server Down'));
        })
      );
  }
  updateBook( id:any,form:Book)
  {
    return this.http.put<any>(this.url+'practica9/'+id,form) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          window.alert('Fill all the fields');
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(() => new Error('Server Down'));
      }
      )
    );
  }
  deleteBook(id:any)
  {
    return this.http.delete<any>(this.url+'practica9/'+id) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          window.alert('Fill all the fields');
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(() => new Error('Server Down'));
      }
      )
    );

  }
}
