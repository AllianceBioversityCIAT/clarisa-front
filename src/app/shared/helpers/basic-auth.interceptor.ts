import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ACCESS_TOKEN_STORAGE_KEY } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token : string = this.authenticationService.currentUserValue?.token;
    let requestCopy : HttpRequest<any> = request;

    if (token) {
      requestCopy = this.addAuthHeader(request, token);
    }
    console.log(`request handled on ${this.constructor.name}`);

    next.handle(requestCopy).subscribe({
      next: x=>console.log('next', x),
      error: error => console.log('error', error)
    });

    return next.handle(requestCopy).pipe(catchError(error => {
      console.log('error on intercept', error);
      if (error instanceof HttpErrorResponse && !requestCopy.url.includes('auth/login') && error.status === 401) {
        return this.handle401Error(requestCopy, next);
      }

      return throwError(() => {return error});
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      let token = this.authenticationService.currentUserValue?.refreshToken;
      if (token) {
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
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addAuthHeader(request, token)))
    );
  }

  private addAuthHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ headers: request.headers.set("Authorization", 'Bearer ' + token) });
  }
}