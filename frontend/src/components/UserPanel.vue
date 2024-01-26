<template >
    <div>
        <h3>Thanks for signing for our community</h3>
        Now you can:
        <div class="form" v-show="isUpdating">
            <form action="">
                <div class="form__box">
                    <input class="form__input-username" type="text" v-model="username"
                        :class="{ 'has-value': username !== '' }">
                    <label class="form__input-label">Username</label>
                </div>
                <div class="form__box">
                    <input class="form__input-email" type="email" v-model="email" :class="{ 'has-value': email !== '' }">
                    <label class="form__input-label">Email</label>
                </div>
                <div class="form__box">
                    <input class="form__input-password" type="password" v-model="password"
                        :class="{ 'has-value': password !== '' }">
                    <label class="form__input-label">Password</label>
                    <password-meter :password="password" />
                </div>
                <a class="form__input-submit" href="#" @click.prevent="updateUser">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </a>
            </form>
        </div>
        <div class="hero__buttons">
            <div class="hero__button hero__buttons-login" @click="logOut">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Log out
            </div>
            <div class="hero__button hero__buttons-login" @click="handleUpdate">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Update account
            </div>
        </div>


    </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { requestData } from '../includes/requestData'
// @ts-ignore
import PasswordMeter from 'vue-simple-password-meter';
export default defineComponent({
    name: 'UserPanel',
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    setup(props, { emit }) {
        const { user } = toRefs(props.userData!);
        const userId = user.value.id;
        const isUpdating = ref(false);
        const username = ref(user.value.username);
        const email = ref(user.value.email);
        const password = ref('');

        const router = useRouter()
        const handleUpdate = () => {
            isUpdating.value = !isUpdating.value
        }
        const logOut = () => {
            const token = sessionStorage.getItem('token')
            if (token) {
                sessionStorage.removeItem('token')
                router.push('/')
            }
        }
        const updateUser = async () => {
            try {
                await requestData(`users/${userId}`, 'PUT', {
                    username: username.value,
                    email: email.value,
                    password: password.value
                }, undefined)
                isUpdating.value = false

                emit('updatedUserData', {
                    userId: userId,
                    username: username.value,
                    email: email.value
                });

            } catch (err) {
                console.log(err)
            }
        }
        return {
            updateUser,
            isUpdating,
            handleUpdate,
            username,
            email,
            password,
            logOut
        }
    }
})
</script>
<style lang="">
    
</style>