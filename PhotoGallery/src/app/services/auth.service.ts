import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url :string = environment.apiUrl ;

  constructor(private http:HttpClient) { }

  public getToken(): string|null {
    return localStorage.getItem('token');
  }

  public clearToken(){
    localStorage.removeItem('token');
  }

  handleError<T>(operation ="operation", result?: T){
    return (error:any): Observable<T> =>{
      console.log(error);
      return of(result as T); 
    }
  }



  login(username:string, password:string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', "password");

    let tmp = this.http.post<any>(this.url+ "connect/token", body.toString(), {
      headers: headers
    }).pipe(
      tap(() => console.info(`Login completed`)),
      catchError(this.handleError<any>('login'))
    );
    return tmp;
  }

  logout():Observable<any>{
    let result = this.http.get<any>(this.url+ "connect/logout")
      .pipe(
        tap(() => console.log('LogOut compleated')),
        catchError(this.handleError<any>('logout'))
      );
      return result;
  }

}
