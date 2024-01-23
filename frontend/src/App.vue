<script lang="ts">
import { defineComponent, ref } from 'vue'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'

export default defineComponent({
  name: 'App',
  components: {
    HomeView,
    LoginView,
    RegisterView
  },
  setup() {
    const isToken = ref(true)

    return {
      isToken
    }
  }


})
</script>

<template>
  <router-view></router-view>
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
