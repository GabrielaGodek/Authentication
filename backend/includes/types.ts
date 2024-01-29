import { Request } from 'express'
export interface UserRequestBody {
    email: string;
    password: string;
    username?: string;
    created_at?: string;
}
export interface User {
    id: number;
    email: string;
    password: string;
}

export interface DBConfig {
    host: string,
    user: string,
    password: string,
    database: string,
}
export interface MiddlewareRequest extends Request {
    user?: any;
}
export enum Role {
    Admin = 'admin',
    User = 'user'
}
export enum InputType {
    Email = 'email',
    Password = 'password',
    Username = 'username'
}
export enum Errors {
    INVALID_USERNAME = 'INVALID_USERNAME',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    INVALID_EMAIL = 'INVALID_EMAIL',
    USER_EXIST = 'USER_EXIST',
}
export interface ValidationResponse {
    isValid: boolean;
    errorMessage: string;
}

