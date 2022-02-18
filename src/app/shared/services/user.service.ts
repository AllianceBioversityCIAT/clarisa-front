import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers() {
    let token = `Bearer ${this.auth.currentUserValue.token}`;
    var httpHeaders = new HttpHeaders();

    httpHeaders = httpHeaders.append('Cache-Control', 'no-cache');
    httpHeaders = httpHeaders.append('Authorization', token);

    
    const httpOptions = {
      headers: httpHeaders
    };

    return this.http.get<any>(`${environment['apiUrl']}users/all`, httpOptions);
  }

  postUser() {

  }

  deleteUser() {

  }
}
