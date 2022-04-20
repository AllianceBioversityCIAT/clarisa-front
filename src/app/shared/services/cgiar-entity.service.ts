import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GenericService } from './generic.service';
import { CGIAREntity } from '../interfaces/CGIAREntity';
import { map, Observable } from 'rxjs';
import { filter } from 'rxjs-compat/operator/filter';

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

    public findAllActive(): Observable<CGIAREntity[]>{
        return this.findAll().pipe(map(entities => entities.filter(entity => entity.active)));
    }

}
