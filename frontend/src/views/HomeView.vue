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
            To see what happen log in ;)
        </p>
        <br>
        <div class="hero__buttons">
            <router-link to="login">
                <input class="hero__buttons-login" type="button" value="Login">
            </router-link>
            <router-link to="register">
                <input class="hero__buttons-register" type="button" value="Register">
            </router-link>
        </div>
    </main>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
