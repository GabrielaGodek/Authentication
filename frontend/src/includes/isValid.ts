
import { InputType, ValidationResponse } from './types'
export const isValid = (plainText: string, type: InputType): ValidationResponse => {
    let regex: RegExp
    let errorMessage: string

    if (type === InputType.Email) {
        regex = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/
        errorMessage = 'Invalid email';

    } else if (type === InputType.Password) {
        regex = /[a-zA-Z0-9]{3,16}/
        errorMessage = 'Invalid password';

    } else if (type === InputType.Username) {
        regex = /^[a-zA-Z0-9_-]{3,16}$/
        errorMessage = 'Invalid username';

    } else {
        errorMessage = 'Invalid input type';
        return { isValid: false, errorMessage };
    }
    return { isValid: regex.test(plainText), errorMessage };
}