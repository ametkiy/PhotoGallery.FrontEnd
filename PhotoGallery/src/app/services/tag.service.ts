import { Injectable } from '@angular/core';
import { Tag } from '../models/tag'
import { Observable, from } from 'rxjs'
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError,map,tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private tagUrl :string = environment.apiUrl + "api/tags";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE' 
  })};

  constructor(private http:HttpClient) { }

  handleError<T>(operation ="operation", result?: T){
    return (error:any): Observable<T> =>{
      console.log(error);
      return of(result as T); 
    }
  }

  addTag(tag: Tag): Observable<any> {
    let result = this.http.post<any>(this.tagUrl, tag).pipe(
      tap((newTagId: any) => console.info(`Adding tag completed`)),
      catchError(this.handleError<any>('addTag'))
    );
    return result;
  }
}
