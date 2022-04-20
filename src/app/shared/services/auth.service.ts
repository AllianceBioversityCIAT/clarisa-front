import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  private expirationSubscription: Subscription = new Subscription();

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject && this.isUserOnStorage) {
      return this.currentUserSubject.value;
    }
    return null as any;
  }

  private get isUserOnStorage(): boolean {
    let user: string = localStorage.getItem('currentUser') ?? '';
    return user.trim().length > 0;
  }

  public get isLoggedIn(): boolean {
    const expiration: moment.Moment = moment(Number(this.currentUserValue.expiresIn));
    if (this.currentUserValue && moment().isBefore(expiration)) {
      return true;
    } else {
      return false;
    }
  }

  getUserAD(userEmail: string, userPassword: string) {
    var httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: httpHeaders
    };
    let params = {
      "email": userEmail,
      "password": userPassword
    }
    return this.http.post<any>(`${environment['apiUrl']}auth/login`, params, httpOptions);
  }

  loginAD(email: string, password: string) {
    return this.getUserAD(email, password).pipe(map((user: User) => {
      delete user.password;
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (this.currentUserSubject) {
        this.currentUserSubject.next(user);
      }
      this.setExpirationSubscription(user.expiresIn);
      return user;
    }));
  }

  private setExpirationSubscription(expiresIn: number): void {
    this.expirationSubscription.unsubscribe();
    this.expirationSubscription = of(null).pipe(delay(expiresIn)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      this.router.navigate(["/login"], { state: { tokenExpired: true } });
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    this.expirationSubscription.unsubscribe();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}
