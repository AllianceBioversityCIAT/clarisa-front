import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient) {
    let user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
    return null as any;
  }

  public get isLoggedIn(): boolean {
    if (this.currentUserValue && moment().isBefore(moment.unix(Number(this.currentUserValue.expiresIn)))) {
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
      console.log(user)
      return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}
