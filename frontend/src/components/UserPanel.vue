<template >
    <div>
        <h3 v-show="!isUpdating">Thanks for signing up for our community</h3>

        <div class="form" v-show="isUpdating">
            <form action="">
                <div class="form__box" :class="{ 'has-error-animation': isValidUser.isValid }">
                    <input class="form__input-username" type="text" v-model="username"
                        :class="{ 'has-value': username !== '' }">
                    <label class="form__input-label">Username</label>
                    <span v-show="isValidUser.isValid" class="form__input-error" @animationend="resetAnimation">{{
                        isValidUser.message }}</span>
                </div>
                <div class="form__box" :class="{ 'has-error-animation': isValidPassword.isValid }">
                    <input class="form__input-password" type="password" v-model="password"
                        :class="{ 'has-value': password !== '' }">
                    <label class="form__input-label">Password</label>
                    <password-meter :password="password" />
                    <span v-show="isValidPassword.isValid" class="form__input-error" @animationend="resetAnimation">{{
                        isValidPassword.message }}</span>
                </div>
                <a class="form__input-submit" href="#" @click.prevent="UpdateUser">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </a>
            </form>
        </div>

        <p v-show="!isUpdating">Now you can:</p>

        <div class="hero__buttons">
            <div class="hero__button hero__buttons-logout" v-show="!isUpdating" @click="logOut">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Log out
            </div>
            <div class="hero__button hero__buttons-openForm" :class="{'close-form': isUpdating }" @click="handleUpdate">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <template v-if="isUpdating">Close form</template>
                <template v-else>Update account</template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
// @ts-ignore
import PasswordMeter from 'vue-simple-password-meter';
import { isValid } from '../includes/isValid'
import { ServerErrors, InputType, ValidateApiResponse, ValidationResults } from '../includes/types'
export default defineComponent({
    name: 'UserPanel',
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    setup(props, { emit }) {
        const { user } = toRefs(props.userData!);
        const userId = user.value.id;
        const isUpdating = ref(false);
        const username = ref(user.value.username);
        const password = ref('');

        const isValidUser = ref({
            isValid: false,
            message: ''
        })
        const isValidPassword = ref({
            isValid: false,
            message: ''
        })


        const router = useRouter()
        const handleUpdate = () => {
            isUpdating.value = !isUpdating.value
        }
        const logOut = () => {
            const token = sessionStorage.getItem('token')
            if (token) {
                sessionStorage.removeItem('token')
                router.push('/')
            }
        }
        const validateInputs = () => {
            const passwordValidation = isValid(password.value, InputType.Password);
            const usernameValidation = isValid(username.value, InputType.Username);

            return {
                password: passwordValidation,
                username: usernameValidation
            };
        };

        const handleErrorResponse = (response: ValidateApiResponse) => {
            isValidUser.value.isValid = false;
            isValidPassword.value.isValid = false;

            switch (response.message.error) {
                case ServerErrors.INVALID_USERNAME:
                    isValidUser.value.isValid = true;
                    isValidUser.value.message = 'Invalid username';
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
            isValidPassword.value.isValid = !validationResult.password.isValid;
            isValidPassword.value.message = validationResult.password.errorMessage;

            isValidUser.value.isValid = !validationResult.username!.isValid;
            isValidUser.value.message = validationResult.username!.errorMessage;
        };

        const UpdateUser = async () => {
            try {
                const validationResult = validateInputs();

                if (validationResult.password.isValid || validationResult.username.isValid) {
                    const data: Record<string, any> = {};

                    if (validationResult.username.isValid) {
                        data.username = username.value;
                    }

                    if (validationResult.password.isValid) {
                        data.password = password.value;
                    }

                    const response = await requestData(`users/${userId}`, 'PUT', data);

                    if (response.success) {
                        emit('updatedUserData', {
                            userId: userId,
                            username: data.username,
                        });
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

            }, 3000)
        }

        return {
            UpdateUser,
            isUpdating,
            handleUpdate,
            username,
            password,
            logOut,
            isValidUser,
            isValidPassword,
            resetAnimation
        }
    }
})
</script>

<style>
.close-form > span {
    animation: none !important;
    background: transparent;
}
</style>