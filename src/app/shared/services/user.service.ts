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
    return this.http.get<any>(`${environment['apiUrl']}users/all`);
  }

  getUserByEmail(searchData: any) {
    const body = {
      "username": searchData['email'],
      "isCgiarUser": searchData['isCGIAR']
    }

    return this.http.post<any>(`${environment['apiUrl']}users/get/username`, body);
  }

  postUser(user: any) {
    const body = user;

    return this.http.post<any>(`${environment['apiUrl']}users/save`, body);
  }

  updateUser(user: any) {
    const body = user;

    return this.http.put<any>(`${environment['apiUrl']}users/update`, body);
  }

  deleteUser(user: any) {
    return this.http.delete<any>(`${environment['apiUrl']}users/delete/${user['id']}`);
  }
}
