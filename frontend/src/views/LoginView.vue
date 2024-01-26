<template>
    <Form formLabel="Login Form">
        <div class="form__box">
            <input class="form__input-email" type="email" v-model="email" :class="{ 'has-value': email !== '' }">
            <label class="form__input-label">Email</label>
        </div>
        <div class="form__box">
            <input class="form__input-password" type="password" v-model="password" :class="{ 'has-value': password !== '' }">
            <label class="form__input-label">Password</label>
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

export default defineComponent({
    name: 'LoginView',
    components: {
        Form
    },
    setup() {
        const router = useRouter()
        const email = ref('');
        const password = ref('');

        const LogIn = async () => {
            try {
                const isLogIn = await requestData('login', 'POST', {
                    email: email.value,
                    password: password.value
                });
                if (isLogIn.token) {
                    sessionStorage.setItem('token', isLogIn.token)
                    router.push('profile')
                } else {
                    console.error('Invalid token or other error');
                }
            } catch (err) {
                console.error('Error during login:', err);
            }
        }

        return {
            email,
            password,
            LogIn
        };
    },
});
</script>
