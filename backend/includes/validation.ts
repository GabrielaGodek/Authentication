import { InputType } from './types'
export const isValid = (plainText: string, type: InputType): boolean => {
    let regex: RegExp
    if (InputType.Email) {
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(plainText)
        regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    } else if (InputType.Username) {
        regex = /^[a-zA-Z0-9_-]{3,16}$/
    } else {
        return false
    }
    return regex.test(plainText)
}