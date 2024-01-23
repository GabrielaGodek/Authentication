<template>
    <div>
        <h1>Template!</h1>
    </div>
</template>
<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
export default {
    name: 'ProfileView',
    setup() {
        const isAuthenticate = ref(false)
        const router = useRouter()
        onMounted(() => {
            const token = sessionStorage.getItem('token') || null
            if (token) {
                isAuthenticate.value = true
                const header = { Authorization: token }
                const response = requestData('profile', undefined, header)
                console.log(response)
            } else {
                router.push('login')
            }
        })
        return {

        }
    }

}
</script>
<style lang="">
    
</style>