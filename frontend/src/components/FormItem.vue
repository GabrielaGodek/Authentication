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
        margin-bottom: 30px;
    }

    .form__box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
        position: relative;

        &::placeholder {
            color: transparent;
        }

        &:focus,
        &.has-value {
            ~.form__input-label {
                top: -20px;
                left: 0;
                color: #03e9f4;
                font-size: 12px;
            }
        }
    }

    .form__box .form__input-label {
        position: absolute;
        top: 0px;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }

    .form__input-error {
        position: absolute;
        bottom: -14px;
        right: 0;
        left: 0;
        color: #ED4337;
        font-size: 14px;
        animation: error;
        animation-duration: .2s;
        animation-iteration-count: 3;
    }

    @keyframes error {
        0% {
            transform: translate(-5px, 0);
        }

        25% {
            transform: translate(5px, 0);
        }

        50% {
            transform: translate(-5px, 0);
        }

        100% {
            transform: translate(5px, 0);
        }
    }
}
</style>

