<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'HomeView',
    setup() {
        const isToken = ref(true)

        return {
            isToken
        }
    }


})
</script>

<template>
    <main class="hero">
        <h1 class="hero__header">Hello!</h1>
        <p class="hero__paragraph">
            Log in or register to proceed. Join our community and enjoy full access to all features!
        </p>
        <br>
        <div class="hero__buttons">
            <router-link to="login">
                <div class="hero__button hero__buttons-login">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </div>

            </router-link>
            <router-link to="register">
                <div class="hero__button hero__buttons-login">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Register
                </div>
            </router-link>
        </div>
    </main>
</template>

<style scoped lang="scss">
.hero {
    width: 500px;

    .hero__header {
        font-size: 100px;
        animation: slideIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        transform: translateY(20px);
        opacity: 0;
        margin: 20px;
    }

    @keyframes slideIn {
        100% {
            transform: translateY(-20px);
            opacity: 1;
        }
    }

    .hero__paragraph {
        font-size: 20px;
    }

    .hero__buttons {
        display: flex;
        gap: 10px;
        justify-content: center;

        .hero__button {
            appearance: none;
            width: 150px;
            position: relative;
            display: inline-block;
            padding: 10px 20px;
            color: #03e9f4;
            font-size: 16px;
            text-decoration: none;
            text-transform: uppercase;
            overflow: hidden;
            transition: .5s;
            margin-top: 40px;
            letter-spacing: 4px;

            &:hover {
                background: #03e9f4;
                color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 5px #03e9f4,
                    0 0 25px #03e9f4,
                    0 0 50px #03e9f4,
                    0 0 100px #03e9f4;
            }
        }
    }
}
</style>
