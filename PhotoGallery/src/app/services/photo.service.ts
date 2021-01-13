import { Injectable } from '@angular/core';
import { Photo} from '../models/photo'
import { Observable, from } from 'rxjs'
import { of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {catchError,map,tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photoUrl :string = environment.apiUrl + "photos"; 
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

  getPhotos(page:number, pageSize:number): Observable<any>{
    const url = `${this.photoUrl}?page=${page}&pageSize=${pageSize}`;
    let result = this.http.get<any>(url).pipe(
      tap(()=>console.info('Fetched photos')),
      catchError(this.handleError('getPhotos',[]))
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

  getPhotoFile(id: any): Observable<any> {
    const url = `${this.photoUrl}/${id}/file`;
    let result = this.http.get(url, { responseType: 'blob' }).pipe(
      tap(()=>console.info(`Fetched photo file by id=${id}`)),
      catchError(this.handleError<any>(`getPhotoFile id=${id}`))
    );
     return result;
  }

  addPhoto(photo: FormData): Observable<any> {
    let tmp = this.http.post<any>(this.photoUrl, photo).pipe(
      tap((newPhotosGuids: any) => console.info(`Photo adding completed`)),
      catchError(this.handleError<any>('addPhoto'))
    );
    return tmp;
  }

  updatePhoto(photo: Photo): Observable<any> {
    const url = `${this.photoUrl}/${photo.id}`;
    return this.http.put(url, photo, this.httpOptions).pipe(
      tap((id: any)=> console.info(`Updating photo with id=${id} completed`)),
      catchError(this.handleError<any>('updatePhoto'))
    );
  }

  deletePhoto(id:string): Observable<any>{
    const url = `${this.photoUrl}/${id}`;
    return this.http.delete<Photo>(url).pipe(
      tap((deletedId: any)=> console.info(`Deleting photo with id=${deletedId} completed`)),
      catchError(this.handleError<Photo>('deletePhoto'))
    );
  }
}
