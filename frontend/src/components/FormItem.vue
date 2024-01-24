<template>
    <div class="form">
        <h1>{{ props.formLabel }}</h1>
        <form>
            <slot></slot>
        </form>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['formLabel']);
</script>

<style lang="scss">
.form form {
    display: flex;
    flex-direction: column;

    .form__box {
        position: relative;
    }

    .form__box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }

    .form__box input.form__input-password {
        margin-bottom: 10px;
    }

    .form__box label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }

    .form__box input:focus~label {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
    }
}
</style>
