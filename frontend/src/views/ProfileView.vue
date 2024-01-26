<template>
    <main class="profile">
        <section class="profile__hero">
            <h1 class="profile__header">Hello 👋</h1>
            <div class="profile__animation">
                <div class="profile__animation-first">
                    <div v-if="userData.user">{{ userData.user.username }}</div>
                </div>
                <div class="profile__animation-second">
                    <div v-if="userData.user">{{ userData.user.username }}</div>
                </div>
                <div class="profile__animation-third">
                    <div v-if="userData.user">{{ userData.user.username }}</div>
                </div>
            </div>
        </section>
        <section class="profile__action">
            <admin-panel v-if="userData.isAdmin"></admin-panel>
            <user-panel v-else :userData="userData" @updatedUserData="updateUserData"></user-panel>
        </section>
    </main>
</template>
<script lang="ts">
import { onBeforeMount, reactive, defineComponent, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
import AdminPanel from '../components/AdminPanel.vue'
import UserPanel from '../components/UserPanel.vue'
export default defineComponent({

    name: 'ProfileView',
    components: {
        AdminPanel,
        UserPanel
    },
    setup() {
        const router = useRouter()
        const userData = reactive({
            user: null,
            isAdmin: false
        })
        const { user } = toRefs(userData);
        const fetchProfileData = async () => {
            const token = sessionStorage.getItem('token') || null
            if (token) {
                const header = { Authorization: token }
                const response = await requestData('profile', 'GET', undefined, header)
                if (response.data.length !== 0) {
                    userData.user = response.data[0]
                    userData.isAdmin = userData.user!.type === 'admin'
                } else {
                    router.push('login')
                }
            } else {
                router.push('login')
            }
        }
        const updateUserData = (data) => {
            if (user.value) {
                user.value.id = data.userId;
                user.value.username = data.username;
                user.value.email = data.email;
            }
        };
        onBeforeMount(fetchProfileData)

        return {
            userData,
            updateUserData
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

.profile__hero {
    font-size: 24px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;

    .profile__header {
        font-size: 48px;
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
}
</style>
