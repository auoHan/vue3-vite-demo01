import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    }
]

const index = createRouter({
    history: createWebHashHistory(),
    routes
})

export default index