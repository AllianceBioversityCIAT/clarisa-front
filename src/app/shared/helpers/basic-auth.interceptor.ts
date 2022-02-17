import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.auth.currentUserValue.token;

        console.log('Intercerptor oa ' + token);
        request = request.clone({
            setHeaders: {
                'Cache-Control': 'no-cache',
                Authorization: token
            }
        });

        return next.handle(request);
    }
}