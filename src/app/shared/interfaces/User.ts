import { BaseDTO } from "./BaseDTO";

export interface User extends BaseDTO {
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    token: string;
    expiresIn: number;
    authenticated: boolean;
    refreshToken: string;
    active: boolean;
}