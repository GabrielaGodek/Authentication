<template>
    <form>
        <input type="text" placeholder="Username">
        <input type="email">
        <input type="password">
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { requestData } from '../includes/requestData'

export default defineComponent({
    name: 'RegisterView',
    setup() {
        const getUsers = ref([])
        const username = ref('user')
        const email = ref('mail123@mail')
        const password = ref('098')

        const user: object = {
            email,
            password,
        };

      

        return {
            getUsers
        }
    }


})

</script>

<style lang="scss" scoped></style>../includes/requestData