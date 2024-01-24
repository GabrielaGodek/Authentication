<template>
    <div>
        <h1>Hello {{ user.username }}</h1>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
export default defineComponent({

    name: 'ProfileView',
    setup() {
        const isAuthenticate = ref(false)
        const router = useRouter()
        const user = ref()

        onMounted(async () => {
            // console.log(router.params)
            const token = sessionStorage.getItem('token') || null
            console.log(token)
            if (token) {
                const header = { Authorization: token }
                const response = await requestData('profile', 'GET', undefined, header)
                isAuthenticate.value = true
                user.value = response.data[0]
                console.log(response.data)
                // userData()
            } else {
                router.push('login')
            }
        })
        return {
            user
        }
    }

})
</script>
