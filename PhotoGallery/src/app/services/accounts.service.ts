import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
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
      if (operation=="registrUser" )
        alert(error.error.error);
      console.log(error);
      return of(result as T); 
    }
  }

  registrUser(user: RegisterUser): Observable<any> {
    let tmp = this.http.post<any>(this.url+'/register', user).pipe(
      tap((id:string) => console.info(`Adding user completed. ID = ${id}`)),
      catchError(this.handleError<any>('registrUser'))
    );
    return tmp;
  }

  getUserInfo(): Observable<any> {
    let tmp = this.http.get<any>(this.url+'/userInfo').pipe(
      tap(() => console.info(`User info is received`)),
      catchError(this.handleError<any>('getUserInfo'))
    );
    return tmp;
  }

}
