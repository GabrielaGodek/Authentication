<template>
    <form @submit.prevent="RegisterIn">
        <input type="text" placeholder="Username" v-model="username">
        <input type="email" v-model="email">
        <input type="password" v-model="password">
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
        const created_at = Date.now()

        const RegisterIn = () => {
            const isRegister = requestData('register', [username, email, password, created_at])
            router.push('profile')
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
