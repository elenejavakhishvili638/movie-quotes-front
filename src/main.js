import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './config/i18n/index'

import App from './App.vue'
import router from './router'

import './config/vee-validate/rules'
import './config/vee-validate/messages'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
