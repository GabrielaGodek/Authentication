<template>
    <Form formLabel="Login Form">
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
            <span v-show="isValidPassword.isValid" class="form__input-error" @animationend="resetAnimation">{{
                isValidPassword.message }}</span>
        </div>
        <a class="form__input-submit" href="#" @click.prevent="LogIn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </a>
    </Form>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue';
import { requestData } from '../includes/requestData';
import Form from '../components/FormItem.vue'
import { isValid } from '../includes/isValid'
import { ServerErrors, InputType, ValidateApiResponse, ValidationResults } from '../includes/types'

export default defineComponent({
    name: 'LoginView',
    components: {
        Form
    },
    setup() {
        const router = useRouter()
        const email = ref('');
        const password = ref('')
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

            return {
                email: emailValidation,
                password: passwordValidation
            };
        };
        // console.log(validateInputs())
        const handleErrorResponse = (response: ValidateApiResponse) => {
            isValidEmail.value.isValid = false;
            isValidPassword.value.isValid = false;

            switch (response.message.error) {
                case ServerErrors.INVALID_EMAIL:
                    isValidEmail.value.isValid = true;
                    isValidEmail.value.message = 'Invalid email';
                    break;
                case ServerErrors.INVALID_PASSWORD:
                    isValidPassword.value.isValid = true;
                    isValidPassword.value.message = 'Invalid password';
                    break;
                default:
                    break;
            }
        };
        const updateValidationStatus = (validationResult: ValidationResults) => {
            console.log(validationResult)
            // isValidEmail.value.isValid = true;
            // isValidPassword.value.isValid = true;
            isValidEmail.value.isValid = !validationResult.email!.isValid;
            isValidEmail.value.message = validationResult.email!.errorMessage;

            isValidPassword.value.isValid = !validationResult.password.isValid;
            isValidPassword.value.message = validationResult.password.errorMessage;
        };
        const LogIn = async () => {
            try {
                const validationResult = validateInputs();
                console.log(validationResult)
                if (validationResult.email.isValid && validationResult.password.isValid) {

                    const response = await requestData('login', 'POST', {
                        email: email.value,
                        password: password.value,
                    });

                    console.log(response);

                    if (response.success) {
                        sessionStorage.setItem('token', response.token);
                        router.push('profile');
                    } else {
                        handleErrorResponse(response)
                    }
                } else {
                    updateValidationStatus(validationResult)
                }
            } catch (err) {
                console.error('Error during login:', err);
            }
        }
        const resetAnimation = () => {
            setTimeout(() => {
                isValidPassword.value.isValid = false;
                isValidEmail.value.isValid = false;

            }, 3000)
        }
        return {
            email,
            password,
            LogIn,
            isValidEmail,
            isValidPassword,
            resetAnimation
        };
    },
});
</script>
