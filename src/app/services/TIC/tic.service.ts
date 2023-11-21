import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, retry, throwError } from 'rxjs';
import { env } from 'src/app/enviroments/env';
import { echo } from 'src/app/enviroments/echo';

enum Player {
  None = '',
  One = 'X',
  Two = 'O'
}
@Injectable({
  providedIn: 'root'
})
export class TicService {
  private channel=echo;

  private _refresh$ = new Subject<void>();
  private URL = env.apiUrl;
  private board: Player[][] = [
    [Player.None, Player.None, Player.None],
    [Player.None, Player.None, Player.None],
    [Player.None, Player.None, Player.None]
  ];
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }
  get refresh$() { return this._refresh$ }

  
  constructor(private http: HttpClient) { }
  private boardUpdatesObservable!: Observable<any>;

  listenForBoardUpdates(): Observable<any> {
    console.log('listening');
    return new Observable<any>(observer => {
      echo.channel('channel-game').listen('TICEvent',(data:any) => {
        observer.next(data);
      });
    });
  }
  boardMoves(board:any)
  {
    return this.http.post<any>(this.URL+'moves',board).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        
          return throwError(() => new Error('Server Down'));
        }
        )
      );
  }


  login(form:any)
  {
    

    return this.http.post<any>(this.URL+'login',form) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          window.alert(error.error.error);
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(() => new Error('Server Down'));
      }
      )
    );
  }

  logout(): Observable<any>
  {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
  
    });
    return this.http.post<any>(this.URL+'logout',null,{headers}) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          window.alert(error.error.error);
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(() => new Error('Server Down'));
      }
      )
    );
    
  }
   
  storeClient(form:any)
  {
    return this.http.post<any>(this.URL+'practica10',form) .pipe(
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
  getID()
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,

    });

   
    return this.http.get<any>(this.URL+'user',{headers}) .pipe(
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

  join()
  {
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,

    });

   
    return this.http.post<any>(this.URL+'join',{headers}) .pipe(
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

  boards()
  {
    return this.http.get<any>(this.URL+'board') .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          window.alert('Soomething went wrong');
        } else {
          window.alert('An error occurred. Please try again later');
        }
        return throwError(() => new Error('Server Down'));
      }
      )
    );
  }

  move(form:any)
  {
    return this.http.post<any>(this.URL+'move',form) .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
      
        return throwError(() => new Error('Server Down'));
      }
      )
    );
  }


  
    getBoard(): Player[][] {
      return this.board;
    }
  
    updateBoard(board: Player[][]): void {
      this.board = board;
    }

  }



 
  


