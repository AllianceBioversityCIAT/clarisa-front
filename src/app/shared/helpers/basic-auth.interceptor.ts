import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ACCESS_TOKEN_STORAGE_KEY } from '../app-constants';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authenticationService.currentUserValue?.token;
        let requestCopy = request;

        if(token){
            requestCopy = this.addAuthHeader(request, token);
        }

        return next.handle(requestCopy).pipe(catchError(error =>{
            if(error instanceof HttpErrorResponse && !requestCopy.url.includes('auth/login') && error.status === 401){
                return this.handle401Error(requestCopy, next);
            }

            return throwError(() => error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        let requestCopy = request;

        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          let token = this.authenticationService.currentUserValue?.refreshToken;
          if (token)
            return this.authenticationService.refreshToken(token).pipe(
              switchMap((token: any) => {
                this.isRefreshing = false;
                this.authenticationService.saveToken(token.accessToken);
                this.refreshTokenSubject.next(token.accessToken);
                
                return next.handle(this.addAuthHeader(request, token.accessToken));
              }),
              catchError((err) => {
                this.isRefreshing = false;
                
                this.authenticationService.logout();
                return throwError(() => err);
              })
            );
        }
        return this.refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap((token) => next.handle(this.addAuthHeader(request, token)))
        );
      }

    private addAuthHeader(request: HttpRequest<any>, token: string): HttpRequest<any>{
        return request.clone({ headers: request.headers.set("Authorization", 'Bearer ' + token) });
    }
}