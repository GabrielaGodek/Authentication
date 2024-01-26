<template>
    <Form formLabel="Register Form">
        <div class="form__box">
            <input class="form__input-username" type="text" v-model="username" :class="{ 'has-value': username !== '' }">
            <label class="form__input-label">Username</label>
        </div>
        <div class="form__box">
            <input class="form__input-email" type="email" v-model="email" :class="{ 'has-value': email !== '' }">
            <label class="form__input-label">Email</label>
        </div>
        <div class="form__box">
            <input class="form__input-password" type="password" v-model="password" :class="{ 'has-value': password !== '' }">
            <label class="form__input-label">Password</label>
            <password-meter :password="password" />
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

        const RegisterIn = async () => {
            try {
                const isRegister = await requestData('register', 'POST', {
                    username: username.value,
                    email: email.value,
                    password: password.value
                })
                if (isRegister.token) {
                    sessionStorage.setItem('token', isRegister.token)
                    router.push('profile')
                } else {
                    console.error('Invalid token or other error');
                }
            } catch (err) {
                console.error('Error during registration:', err);
            }
        }
        return {
            RegisterIn,
            username,
            email,
            password
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
