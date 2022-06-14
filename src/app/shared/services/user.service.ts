import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${environment['apiUrl']}users/all`);
  }

  getUserByEmail(username: any) {
    return this.http.get<any>(`${environment['apiUrl']}users/get/username/${username}`);
  }

  postUser(user: any) {
    const body = user;

    return this.http.post<any>(`${environment['apiUrl']}users/save`, body);
  }

  updateUser(user: any) {
    const body = user;
    return this.http.put<any>(`${environment['apiUrl']}users/update`, body);
  }

  updateActiveUser(user: any) {
    const body = user;
    return this.http.put<any>(`${environment['apiUrl']}users/update`, body);
  }

  deleteUser(user: any) {
    return this.http.delete<any>(`${environment['apiUrl']}users/delete/${user['id']}`);
  }

  changeUserPassword(userInfo: any) {
    const body = {
      username: userInfo['username'],
      newPassword: userInfo['newPassword']
    }
    
    return this.http.post<any>(`${environment['apiUrl']}admin/passwordChange`, body);
  }

  forgotPassword(userInfo: any) {
    const body = {
      username: userInfo['username'],
      newPassword: userInfo['newPassword']
    }
    
    return this.http.post<any>(`${environment['apiUrl']}users/passwordChange`, body);
  }

  getRolePermissionsByUser(username: any) {
    return this.http.get<any>(`${environment['apiUrl']}rolepermissions/rolePermission/${username}`);
  }
}
