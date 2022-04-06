import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<any>(`${environment['apiUrl']}roles/all`);
  }

  postRole(role: any) {
    const body = role;

    return this.http.post<any>(`${environment['apiUrl']}roles/save`, body);
  }

  updateRole(role: any) {
    const body = role;
    
    return this.http.put<any>(`${environment['apiUrl']}roles/update`, body);
  }

  deleteRole(role: any) {
    return this.http.delete<any>(`${environment['apiUrl']}roles/delete/${role['id']}`);
  }
}
