import { Injectable } from '@angular/core';
import { Photo} from '../models/photo'
import { PageOfFoto} from '../models/pageOfPhotos'
import { Observable, from } from 'rxjs'
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError,map,tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoUrl :string ="https://localhost:44319/api/photo"; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE' 
  },
    
    )
  };

  constructor(private http:HttpClient) { }

  handleError<T>(operation ="operation", result?: T){
    return (error:any): Observable<T> =>{
      console.log(error);
      return of(result as T); 
    }
  }

  getPhotos(page:number, pageSize:number): Observable<PageOfFoto| never[]>{
    const url = `${this.photoUrl}?pageSize=${pageSize}&page=${page}`;
    let result = this.http.get<PageOfFoto| never[]>(url).pipe(
      tap(()=>console.info('Fetched photos')),
      catchError(this.handleError('getHeroes',[]))
    );
    return result;
  }

  getPhoto(id: any): Observable<Photo> {
    const url = `${this.photoUrl}/${id}`;
    let result = this.http.get<Photo>(url).pipe(
      tap(()=>console.info(`Fetched photo id=${id}`)),
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
     return result;
  }

  addPhoto(photo: FormData): Observable<Photo> {
    let tmp = this.http.post<Photo>(this.photoUrl, photo).pipe(
      tap((newphoto: Photo) => console.info(`added photo  id=${newphoto.id}`)),
      catchError(this.handleError<Photo>('addPhoto'))
    );
    console.log(tmp);
    return tmp;
  }

  updatePhoto(photo: Photo): Observable<any> {
    const url = `${this.photoUrl}/${photo.id}`;
    return this.http.put(url, photo, this.httpOptions).pipe(
      tap(_ => console.info(`updated photo id=${photo.id}`)),
      catchError(this.handleError<any>('updatePhoto'))
    );
  }

  deletePhoto(id:number): Observable<Photo>{
    const url = `${this.photoUrl}/${id}`;
    return this.http.delete<Photo>(url).pipe(
      tap(_ => console.info(`deleted photo id=${id}`)),
      catchError(this.handleError<Photo>('deleteHero'))
    );
  }
}
