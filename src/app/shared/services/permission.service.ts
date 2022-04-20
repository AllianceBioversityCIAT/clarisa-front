import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GenericService } from './generic.service';
import { Permission } from '../interfaces/Permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends GenericService<Permission>{

  private baseServiceUrl = `${environment.apiUrl}permissions`;

    constructor(private client: HttpClient) { super(); }

    protected getHttpClient(): HttpClient {
        return this.client;
    }

    protected getServiceBaseUrl(): string {
        return this.baseServiceUrl;
    }
}
