import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles() {
    return this.http.get<any>(`${environment['apiUrl']}roles/all`);
  }

  getRoleByAcronymCGIAREntity(acronym: any, cgiarEntity: any) {
    return this.http.get<any>(`${environment['apiUrl']}roles/RoleByAcronym-CGIAREntity?cgiarEntity=${cgiarEntity}&acronym=${acronym}`);
  }

  getGlobalUnits() {
    let list: object[] = [];
    let object: any = {};
    return this.http.get<any>(`${environment['apiUrl']}globalUnits/all`).pipe(
      map(x => {
        for (let i = 0; i < x.length; i++) {
          if (x[i].active) {
            if (x[i].acronym != '' && x[i].acronym != ' ') {
              object = {
                id: x[i].id,
                name: x[i].acronym
              }
            } else {
              object = {
                id: x[i].id,
                name: x[i].officialCode
              }
            }
            list.push(object);
          }
        }
        return list;
      })
    );
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
