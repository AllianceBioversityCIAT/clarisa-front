import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../interfaces/Role";
import { UserRoleDTO } from "../interfaces/UserRoleDTO";
import { GenericService } from "./generic.service";

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {

    private endpoint: string = `${environment['apiUrl']}user-roles`;

    constructor(private http: HttpClient) {  }

    getUserRolesByUser(userId: number): Observable<Role[]> {
        return this.http.get<Role[]>(`${this.endpoint}/by-user/${userId}`);
    }

    deleteUserRole(userRole: UserRoleDTO): Observable<void>{
        return this.http.delete<void>(`${this.endpoint}/delete/`, {body:userRole});
    }

    saveUserRole(userRole: UserRoleDTO): Observable<UserRoleDTO>{
        return this.http.post<UserRoleDTO>(`${this.endpoint}/save/`, userRole);
    }
}