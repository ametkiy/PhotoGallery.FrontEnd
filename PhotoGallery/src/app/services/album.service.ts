import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs'
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError,map,tap} from 'rxjs/operators'
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albumUrl :string ="https://localhost:44319/api/album";
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

  getAlbums(): Observable<Album | never[]>{
    let result = this.http.get<Album>(this.albumUrl).pipe(
      tap(()=>console.info('Fetched albums')),
      catchError(this.handleError('getAlbums',[]))
    );
    return result;
  }

  addAlbum(album: Album): Observable<any> {
    let tmp = this.http.post<any>(this.albumUrl, album).pipe(
      tap((newAlbumId: number) => console.info(`added album`)),
      catchError(this.handleError<any>('addAlbum'))
    );
    return tmp;
  }

  
  deleteAlbum(id:number): Observable<any>{
    const url = `${this.albumUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      tap((deletedId:any) => console.info(`deleted photo id=${deletedId}`)),
      catchError(this.handleError<any>('deleteAlbum'))
    );
  }
  
}
