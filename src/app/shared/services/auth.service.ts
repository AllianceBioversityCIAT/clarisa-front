import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/User';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_STORAGE_KEY, HTTP_OPTIONS_JSON, REFRESH_TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../app-constants';
import { RefreshToken } from '../interfaces/RefreshToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;
  //private expirationSubscription: Subscription = new Subscription();

  private baseServiceUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient, private router: Router) {
    let user = localStorage.getItem(USER_STORAGE_KEY);
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
    let user: string = localStorage.getItem(USER_STORAGE_KEY) ?? '';
    return user.trim().length > 0;
  }
  
  public get tokenExpired() : boolean {
    const expiration: moment.Moment = moment(Number(this.currentUserValue.expiresIn));
    if (moment().isBefore(expiration)) {
      return true;
    } else {
      return false;
    }
  }

  public refreshToken(token: string) : Observable<RefreshToken> {
    return this.http.post<RefreshToken>(`${this.baseServiceUrl}/refreshToken`, {
      refreshToken: token
    }, HTTP_OPTIONS_JSON);
  }

  public saveToken(accessToken : string) : void {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    
    if(this.currentUserSubject){
      let updatedUser : User = this.currentUserSubject.getValue();
      updatedUser.token = accessToken;
      this.currentUserSubject.next(updatedUser);
      this.saveUser(updatedUser);
    }
  }

  public saveUser(user : User) : void{
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  public saveRefreshToken(refreshToken : string) : void{
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  }

  public get isLoggedIn(): boolean {
    if(!this.currentUserValue){
      return false;
    }
    
    return this.tokenExpired;
  }

  getUserAD(userEmail: string, userPassword: string) {
    let params = {
      "email": userEmail,
      "password": userPassword
    }

    return this.http.post<any>(`${this.baseServiceUrl}/login`, params, HTTP_OPTIONS_JSON);
  }

  loginAD(email: string, password: string) {
    return this.getUserAD(email, password).pipe(map((user: User) => {
      this.saveUser(user);
      this.saveToken(user.token);
      this.saveRefreshToken(user.refreshToken);
      if (this.currentUserSubject) {
        this.currentUserSubject.next(user);
      }

      //this.setExpirationSubscription(user.expiresIn);
      return user;
    }));
  }

  /*private setExpirationSubscription(expiresIn: number): void {
    this.expirationSubscription.unsubscribe();
    console.log(`expiration subscription: expires in: " ${moment(expiresIn)}`);
    this.expirationSubscription = of(null).pipe(delay(expiresIn)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      this.router.navigate(["/login"], { state: { tokenExpired: true } });
    });
  }*/

  logout() {
    // remove user from local storage and set current user to null
    //this.expirationSubscription.unsubscribe();
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    this.currentUserSubject.next(null as any);
  }
}
