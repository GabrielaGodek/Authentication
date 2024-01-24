<template>
    <form @submit.prevent="RegisterIn">
        <input type="text" placeholder="Username" v-model="username">
        <input type="email" v-model="email">
        <input type="password" v-model="password">
        <input type="submit">
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'

export default defineComponent({
    name: 'RegisterView',
    setup() {
        // const getUsers = ref([])
        const router = useRouter()
        const username = ref('user')
        const email = ref('mail123@mail')
        const password = ref('098')
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
            } catch(err) {
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
