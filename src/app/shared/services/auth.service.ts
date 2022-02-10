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

  getUserAD(userEmail: string, userPassword: string) {
    let oa = `${environment['app_user']}:${environment['app_password']}`
    var httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append("Authorization", "Basic " + oa);
    const httpOptions = {
      headers: httpHeaders
    };
    let params = {
      "email": userEmail,
      "password": userPassword
    }
    return this.http.post<any>(`${environment['apiUrl']}/UserAuthentication`, params, httpOptions);
  }

  loginAD(email: string, password: string) {
    return this.getUserAD(email, password).pipe(map((user: User) => {
      console.log(user.email);
      console.log(user.authenticated);
      user.token = 'fake-jwt-token';
      user.expiresIn = moment().add(30, 'minutes').unix();
      // delete user.password
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (this.currentUserSubject) {
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }
}