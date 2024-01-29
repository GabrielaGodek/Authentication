<template>
    <Form formLabel="Register Form">
        <div class="form__box" :class="{ 'has-error-animation': invalidUser }">
            <input class="form__input-username" type="text" v-model="username" :class="{ 'has-value': username !== '' }">
            <label class="form__input-label">Username</label>
            <span v-show="invalidUser" class="form__input-error" @animationend="resetAnimation">Invalid username</span>
        </div>
        <div class="form__box" :class="{ 'has-error-animation': invalidEmail }">
            <input class="form__input-email" type="email" v-model="email" :class="{ 'has-value': email !== '' }">
            <label class="form__input-label">Email</label>
            <span v-show="invalidEmail" class="form__input-error">No user in database</span>
        </div>
        <div class="form__box" :class="{ 'has-error-animation': invalidPassword }">
            <input class="form__input-password" type="password" v-model="password"
                :class="{ 'has-value': password !== '' }">
            <label class="form__input-label">Password</label>
            <password-meter :password="password" />
            <span v-show="invalidPassword" class="form__input-error">No user in database</span>
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
        const password = ref('');
        const invalidUser = ref(false)
        const invalidEmail = ref(false)
        const invalidPassword = ref(false)

        const RegisterIn = async () => {
            try {
                const response = await requestData('register', 'POST', {
                    username: username.value,
                    email: email.value,
                    password: password.value
                })
                console.log(response)
                if (response.success) {
                    sessionStorage.setItem('token', response.token)
                    router.push('profile')
                } else {
                    invalidUser.value = false;
                    invalidEmail.value = false;
                    invalidPassword.value = false;
                    if (response.message.message.includes('Invalid username')) {
                        invalidUser.value = true
                        // invalidPassword.value = false
                    } else if (response.message.message.includes('Invalid email')) {
                        invalidEmail.value = true
                        // invalidUser.value = false
                        // invalidPassword.value = false
                    } else if (response.message.message.includes('Invalid password')) {
                        invalidPassword.value = true
                        // invalidUser.value = false
                        // invalidEmail.value = false
                    }
                }
            } catch (err) {
                console.error('Error during registration:', err);
            }

        }
        const resetAnimation = () => {
            invalidUser.value = false;
            invalidEmail.value = false;
            invalidPassword.value = false;
        }
        return {
            RegisterIn,
            username,
            email,
            password,
            invalidUser,
            invalidPassword,
            invalidEmail,
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
