import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GenericService } from './generic.service';
import { CGIAREntity } from '../interfaces/CGIAREntity';

@Injectable({
    providedIn: 'root'
})
export class CGIAREntityService extends GenericService<CGIAREntity> {

    private baseServiceUrl = `${environment.apiUrl}globalUnits`;

    constructor(private client: HttpClient) { super(); }

    protected getHttpClient(): HttpClient {
        return this.client;
    }

    protected getServiceBaseUrl(): string {
        return this.baseServiceUrl;
    }

}
