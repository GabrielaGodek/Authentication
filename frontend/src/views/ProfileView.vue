<template>
    <main class="profile">
        <h1 class="profile__header">Hello 👋</h1>
        <section class="profile__animation">
            <div class="profile__animation-first">
                <div>{{ user.username }}</div>
            </div>
            <div class="profile__animation-second">
                <div>{{ user.username }}</div>
            </div>
            <div class="profile__animation-third">
                <div>{{ user.username }}</div>
            </div>
        </section>
    </main>
</template>
<script lang="ts">
import { onBeforeMount, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
export default defineComponent({

    name: 'ProfileView',
    setup() {
        const router = useRouter()
        const user = ref()

        onBeforeMount(async () => {

            const token = sessionStorage.getItem('token') || null
            if (token) {
                const header = { Authorization: token }
                const response = await requestData('profile', 'GET', undefined, header)
                console.log(response.data)
                if (response.data.length !== 0) {
                    user.value = response.data[0]
                } else {
                    router.push('login')
                }
            } else {
                router.push('login')
            }
        })
        return {
            user,
        }
    }

})
</script>

<style lang="scss">
@keyframes text-animation {
    0% {
        margin-top: 0;
    }

    10% {
        margin-top: 0;
    }

    20% {
        margin-top: -5.62rem;
    }

    30% {
        margin-top: -5.62rem;
    }

    40% {
        margin-top: -11.24rem;
    }

    60% {
        margin-top: -11.24rem;
    }

    70% {
        margin-top: -5.62rem;
    }

    80% {
        margin-top: -5.62rem;
    }

    90% {
        margin-top: 0;
    }

    100% {
        margin-top: 0;
    }
}

.profile {
    
    font-size:24px;
    text-transform: uppercase;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .profile__header {
        font-size: 24px;
    }
    .profile__animation {
        height: 40px;
        overflow: hidden;
        margin-left: 1rem;

        &>div>div {
            padding: 0 40px;
            height: 2.81rem;
            margin-bottom: 2.81rem;
            display: inline-block;
        }
        
        div:first-child {
            animation: text-animation 8s infinite;
        }
        
        .profile__animation-first div {
            background-color: #03e9f4;
        }

        .profile__animation-second div {
            background-color: #03e9f4;
        }

        .profile__animation-third div {
            background-color: #03e9f4;
        }
    }
}</style>
