import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getPermission() {
    return this.http.get<any>(`${environment['apiUrl']}permissions/all`);
  }

  postPermission(permission: any) {
    const body = permission;

    return this.http.post<any>(`${environment['apiUrl']}permissions/save`, body);
  }

  updatePermission(permission: any) {
    const body = permission;
    
    return this.http.put<any>(`${environment['apiUrl']}permissions/update`, body);
  }

  deletePermission(permission: any) {
    return this.http.delete<any>(`${environment['apiUrl']}permissions/delete/${permission['id']}`);
  }
}
