import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authenticationService.currentUserValue?.token;

        if(token){
            const signed = request.clone({
                setHeaders: {
                    'Cache-Control': 'no-cache',
                    Authorization: token
                }
            });

            return next.handle(signed);
        } else {
            return next.handle(request);
        }
    }
}