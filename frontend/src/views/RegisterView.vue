<template>
    <Form formLabel="Register Form">
        <div class="form__box" :class="{ 'has-error-animation': isValidUser.isValid }">
            <input class="form__input-username" type="text" v-model="username" :class="{ 'has-value': username !== '' }">
            <label class="form__input-label">Username</label>
            <span v-show="isValidUser.isValid" class="form__input-error" @animationend="resetAnimation">{{
                isValidUser.message }}</span>
        </div>
        <div class="form__box" :class="{ 'has-error-animation': isValidEmail.isValid }">
            <input class="form__input-email" type="email" v-model="email" :class="{ 'has-value': email !== '' }">
            <label class="form__input-label">Email</label>
            <span v-show="isValidEmail.isValid" class="form__input-error" @animationend="resetAnimation">{{
                isValidEmail.message }}</span>
        </div>
        <div class="form__box" :class="{ 'has-error-animation': isValidPassword.isValid }">
            <input class="form__input-password" type="password" v-model="password"
                :class="{ 'has-value': password !== '' }">
            <label class="form__input-label">Password</label>
            <password-meter :password="password" />
            <span v-show="isValidPassword.isValid" class="form__input-error" @animationend="resetAnimation">{{
                isValidPassword.message }}</span>
        </div>
        <a class="form__input-submit" href="#" @click.prevent="RegisterIn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
    </Form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
// @ts-ignore
import PasswordMeter from 'vue-simple-password-meter';
import { requestData } from '../includes/requestData'
import Form from '../components/FormItem.vue'
import { isValid } from '../includes/isValid'
import { ServerErrors, InputType, ValidateApiResponse, ValidationResults } from '../includes/types'

export default defineComponent({
    name: 'RegisterView',
    components: {
        Form,
        PasswordMeter
    },

    setup() {
        const router = useRouter()
        const username = ref('')
        const email = ref('')
        const password = ref('')
        const isValidUser = ref({
            isValid: false,
            message: ''
        })
        const isValidEmail = ref({
            isValid: false,
            message: ''
        })
        const isValidPassword = ref({
            isValid: false,
            message: ''
        })



        const validateInputs = () => {
            const emailValidation = isValid(email.value, InputType.Email);
            const passwordValidation = isValid(password.value, InputType.Password);
            const usernameValidation = isValid(username.value, InputType.Username);

            return {
                email: emailValidation,
                password: passwordValidation,
                username: usernameValidation
            };
        };

        const handleErrorResponse = (response: ValidateApiResponse) => {
            isValidUser.value.isValid = false;
            isValidEmail.value.isValid = false;
            isValidPassword.value.isValid = false;

            switch (response.message.error) {
                case ServerErrors.INVALID_USERNAME:
                    isValidUser.value.isValid = true;
                    isValidUser.value.message = 'Invalid username';
                    break;
                case ServerErrors.INVALID_EMAIL:
                    isValidEmail.value.isValid = true;
                    isValidEmail.value.message = 'Invalid email';
                    break;
                case ServerErrors.INVALID_PASSWORD:
                    isValidPassword.value.isValid = true;
                    isValidPassword.value.message = 'Invalid password';
                    break;
                case ServerErrors.USER_EXIST:
                    isValidEmail.value.isValid = true;
                    isValidEmail.value.message = 'User with this email already exists';
                    break;
                default:
                    break;
            }
        };

        const updateValidationStatus = (validationResult: ValidationResults) => {
            isValidEmail.value.isValid = !validationResult.email!.isValid;
            isValidEmail.value.message = validationResult.email!.errorMessage;

            isValidPassword.value.isValid = !validationResult.password.isValid;
            isValidPassword.value.message = validationResult.password.errorMessage;

            isValidUser.value.isValid = !validationResult.username!.isValid;
            isValidUser.value.message = validationResult.username!.errorMessage;
        };

        const RegisterIn = async () => {
            try {
                const validationResult = validateInputs();

                if (validationResult.email.isValid && validationResult.password.isValid && validationResult.username.isValid) {
                    const response = await requestData('register', 'POST', {
                        username: username.value,
                        email: email.value,
                        password: password.value
                    });

                    if (response.success) {
                        sessionStorage.setItem('token', response.token);
                        router.push('profile');
                    } else {
                        handleErrorResponse(response);
                    }
                } else {
                    updateValidationStatus(validationResult);
                }
            } catch (err) {
                console.error('Error during registration:', err);
            }
        };

        const resetAnimation = () => {
            setTimeout(() => {
                isValidUser.value.isValid = false;
                isValidPassword.value.isValid = false;
                isValidEmail.value.isValid = false;

            }, 3000)
        }
        return {
            RegisterIn,
            username,
            email,
            password,
            isValidUser,
            isValidPassword,
            isValidEmail,
            resetAnimation
        }
    }


})

</script>
<style>
.po-password-strength-bar {
    transition: all 0.2s linear;
    height: 5px;
    margin-top: 0px;
}
</style>
