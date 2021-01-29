import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private likeUrl :string = environment.apiUrl + "api/likes";

  constructor(private http:HttpClient) { }

  handleError<T>(operation ="operation", result?: T){
    return (error:any): Observable<T> =>{
      console.log(error);
      return of(result as T); 
    }
  }

  isUserLikedPhoto(photoId:string): Observable<boolean> {
    let uri = this.likeUrl+`/userLikedPhoto/${photoId}`;
    let result = this.http.get<boolean>(uri).pipe(
      tap((like: boolean) => console.info(`Getting info about like complete`)),
      catchError(this.handleError<boolean>('getUserLikePhoto'))
    );
    return result;
  }

  getUsersListLikedPhoto(photoId:string): Observable<any> {
    let uri = this.likeUrl+`/usersListLikedPhoto/${photoId}`;
    let result = this.http.get<any>(uri).pipe(
      tap((like: any) => console.info(`Getting users lish who likes photo complete`)),
      catchError(this.handleError<any>('getUsersListLikedPhoto'))
    );
    return result;
  }

  getPhotoLikesCount(photoId:string): Observable<number> {
    let uri = this.likeUrl+`/photoLikesCount/${photoId}`;
    let result = this.http.get<number>(uri).pipe(
      tap((likesCount: number) => console.info(`Getting count likes complete`)),
      catchError(this.handleError<any>('getPhotoLikesCount'))
    );
    return result;
  }

  setLike(photoId: string): Observable<boolean> {
    let like = new Like();
    like.id = photoId;
    let tmp = this.http.post<any>(this.likeUrl, like).pipe(
      tap((result: any) => console.info(`Set like completed`)),
      catchError(this.handleError<any>('setLike'))
    );
    return tmp;
  }
}
