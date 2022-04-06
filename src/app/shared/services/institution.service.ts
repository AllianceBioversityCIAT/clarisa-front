import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class InstitutionService {

    constructor(private http: HttpClient) { }

  getInstitution() {
    return this.http.get<any>(`${environment['apiUrl']}institution/all`);
  }

  postInstitution(institution: any) {
    const body = institution;

    return this.http.post<any>(`${environment['apiUrl']}institution/save`, body);
  }

  updateInstitution(institution: any) {
    const body = institution;
    
    return this.http.put<any>(`${environment['apiUrl']}institution/update`, body);
  }

  deleteInstitution(institution: any) {
    return this.http.delete<any>(`${environment['apiUrl']}institution/delete/${institution['id']}`);
  }
  }