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

  getInstitutionParent(idParent: any) {
    return this.http.get<any>(`${environment['apiUrl']}institution/institutionParent/${idParent}`);
  }

  getInstitutionChild(idParent: any) {
    return this.http.get<any>(`${environment['apiUrl']}institution/childInstitutions/${idParent}`);
  }

  getInstitutionbyId(id: any) {
    return this.http.get<any>(`${environment['apiUrl']}institution/get/${id}`);
  }

  postInstitutionParent(institutionParent: any){
    const body= institutionParent;
    return this.http.post(`${environment['apiUrl']}institution/updateparent`, body);
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