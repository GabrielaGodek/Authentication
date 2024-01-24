<template>
    <Form formLabel="Register Form">
        <div class="user-box">
            <input type="text" v-model="username">
            <label>Username</label>
        </div>
        <div class="user-box">
            <input type="email" v-model="email">
            <label>Email</label>
        </div>
        <div class="user-box">
            <input type="password" v-model="password">
            <label>Password</label>
        </div>
        <div class="strong-password">strong</div>
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
import { requestData } from '../includes/requestData'
import Form from '../components/FormItem.vue'

export default defineComponent({
    name: 'RegisterView',
    components: {
        Form
    },
    setup() {
        const router = useRouter()
        const username = ref('')
        const email = ref('')
        const password = ref('')
        const created_at = '2017-10-10'

        const RegisterIn = async () => {
            try {
                const isRegister = await requestData('register', 'POST', {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                    created_at: created_at
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
