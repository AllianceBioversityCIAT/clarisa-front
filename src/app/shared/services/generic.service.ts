import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseDTO } from '../interfaces/BaseDTO';
import { Observable } from 'rxjs';

export abstract class GenericService<T extends BaseDTO> {

    constructor(
    ) { }

    protected abstract getHttpClient(): HttpClient;
    protected abstract getServiceBaseUrl(): string;

    count() : Observable<number> {
        return this.getHttpClient().get<number>(`${this.getServiceBaseUrl()}/count`);
    }
    
    delete(object: T) : Observable<void>{
        return this.getHttpClient().delete<void>(`${this.getServiceBaseUrl()}/delete`, {body: object});
    }

    deleteById(id: number) : Observable<void>{
        return this.getHttpClient().delete<void>(`${this.getServiceBaseUrl()}/delete/${id}`);
    }

    existsById(id: number) : Observable<boolean>{
        return this.getHttpClient().get<boolean>(`${this.getServiceBaseUrl()}/exists/${id}`);
    }

    findAll(): Observable<T[]> {
        return this.getHttpClient().get<T[]>(`${this.getServiceBaseUrl()}/all`);
    }

    findById(id: number) : Observable<T> {
        return this.getHttpClient().get<T>(`${this.getServiceBaseUrl()}/get/${id}`);
    }

    save(object: T) {
        return this.getHttpClient().post<T>(`${this.getServiceBaseUrl()}/save`, object);
    }

    update(object: T) {
        return this.getHttpClient().put<T>(`${this.getServiceBaseUrl()}/update`, object);
    }

}
