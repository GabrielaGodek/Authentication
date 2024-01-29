<template>
    <div class="not_found">
        <h1 class="not_found__header">404</h1>
        <h2>Page you looking for doesn't exist</h2>
        <div class="not_found__buttons">
            <router-link to="/">
                <div class="not_found__buttons 404__buttons-home">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Go home
                </div>
            </router-link>
        </div>
    </div>
</template>
<style lang="scss">
.not_found {
    .not_found__header {
        font-size: 100px;
        animation: slideIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        transform: translateY(20px);
        opacity: 0;
        margin: 0;
    }
    .not_found__buttons {
        margin: 0;
    }
}
</style>

