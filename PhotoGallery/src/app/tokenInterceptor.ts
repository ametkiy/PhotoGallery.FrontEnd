import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
    private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let t = this.authService.getToken();

        let tmp = req.clone({
            headers: req.headers.set('Authorization', 
            `Bearer `+ t),
        })
        
        let authReq;
        if (t)
            authReq = tmp;
        else
            authReq = req;

        return next.handle(authReq).pipe(
            tap(
            (event: any) => {
                if (event instanceof HttpResponse)
                console.debug('Server response')
            },
            (err) => {
                if (err instanceof HttpErrorResponse) {
                if (err.status == 401){
                    console.log('Unauthorized');
                    this.authService.clearToken();
                    this.router.navigate(['login']);
                }
                }
            }
            )
        )
        
    }
 
}