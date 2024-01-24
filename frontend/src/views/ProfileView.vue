<template>
    <div>
        <h1 v-if="isAuthenticate">Hello {{ user.username }}</h1>
        <h1 v-else>Hello </h1>

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

            const token = sessionStorage.getItem('token') || null
            // console.log(token)
            if (token) {
                const header = { Authorization: token }
                const response = await requestData('profile', 'GET', undefined, header)
                console.log(response.data)
                if(response.data.length !== 0) {
                    user.value = response.data[0]
                    isAuthenticate.value = true
                } else {
                    router.push('login')
                }
            } else {
                router.push('login')
            }
        })
        return {
            user,
            isAuthenticate
        }
    }

})
</script>
