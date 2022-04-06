import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class InstitutionTypeService {

    constructor(private http: HttpClient) { }

    getInstitutionType() {
        return this.http.get<any>(`${environment['apiUrl']}institution-type/all`);
    }

    postInstitutionType(institutiontype: any) {
        const body = institutiontype;

        return this.http.post<any>(`${environment['apiUrl']}institution-type/save`, body);
    }

    updateInstitutionType(institutiontype: any) {
        const body = institutiontype;
        
        return this.http.put<any>(`${environment['apiUrl']}institution-type/update`, body);
    }

    deleteInstitutionType(institutiontype: any) {
        return this.http.delete<any>(`${environment['apiUrl']}institution-type/delete/${institutiontype['id']}`);
    }
  }