import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class LocationService {

    constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<any>(`${environment['apiUrl']}Locations/countries`);
  }

  getRegions() {
    return this.http.get<any>(`${environment['apiUrl']}Locations/regions`);
  }

  postPostLocation(location: any) {
    const body = location;

    return this.http.post<any>(`${environment['apiUrl']}Locations/save`, body);
  }

  updateLocation(location: any) {
    const body = location;
    
    return this.http.put<any>(`${environment['apiUrl']}Locations/update`, body);
  }

  deleteLocations(location: any) {
    return this.http.delete<any>(`${environment['apiUrl']}Locations/delete/${location['id']}`);
  }
  }