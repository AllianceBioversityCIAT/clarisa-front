import { HttpHeaders } from "@angular/common/http";

export const HTTP_OPTIONS_JSON = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export const USER_STORAGE_KEY : string = 'currentUser';

export const ACCESS_TOKEN_STORAGE_KEY : string = 'accessToken';

export const REFRESH_TOKEN_STORAGE_KEY : string = 'refreshToken';