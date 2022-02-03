import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && moment().isBefore(moment.unix(Number(currentUser.expiresIn)))) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }

}
