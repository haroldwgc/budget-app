import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import router from './routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

createApp(App)
    .use(ElementPlus)
    .use(createPinia())
    .use(router)
    .mount('#app')

import "bootstrap/dist/js/bootstrap.js"