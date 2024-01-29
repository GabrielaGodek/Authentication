import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'login',
        props: route => ({ email: route.query.email }),
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        props: route => ({ email: route.query.email }),
        component: () => import('../views/RegisterView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        props: route => ({ email: route.query.email }),
        component: () => import('../views/ProfileView.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        props: route => ({ email: route.query.email }),
        component: () => import('../views/404.vue')
    }
];

const router = createRouter({
    history: createWebHistory((import.meta as any).env.BASE_URL),
    routes
});

export default router;
