export enum ServerErrors {
    INVALID_USERNAME = 'INVALID_USERNAME',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    INVALID_EMAIL = 'INVALID_EMAIL',
    USER_EXIST = 'USER_EXIST',
}
export interface ValidationResponse {
    isValid: boolean;
    errorMessage: string;
}

export enum InputType {
    Email = 'email',
    Password = 'password',
    Username = 'username',
}

export type ValidateApiResponse = {
    message: {
        error: ServerErrors;
    };
    success: boolean;
    token?: string;
};
export type ValidationResults = {
    password: ValidationResponse,
    email?: ValidationResponse,
    username?: ValidationResponse
}
export type UpdatedUserData = {
    userId: number,
    username: string,
    email: string,
    type: string
}
export interface UserData {
    user: UpdatedUserData | null;
    isAdmin: boolean;
}