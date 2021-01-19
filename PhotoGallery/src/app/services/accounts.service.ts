import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private url :string = environment.apiUrl + "api/accounts";
  
  constructor(private http:HttpClient) { }

  handleError<T>(operation ="operation", result?: T){
    return (error:any): Observable<T> =>{
      console.log(error);
      return of(result as T); 
    }
  }

  registrUser(user: RegisterUser): Observable<any> {
    let tmp = this.http.post<any>(this.url+'/register', user).pipe(
      tap(() => console.info(`Adding user completed`)),
      catchError(this.handleError<any>('registrUser'))
    );
    return tmp;
  }


}
