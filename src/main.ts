import App from './App.vue'
//pinia持久化
import piniaPluginPersist from 'pinia-plugin-persist'
//路由
import router from '@/router'
//全局引入svg
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)
app.mount('#app')
