import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'
import TheRegistration from '../views/TheRegistration.vue'
import TheLogin from '../views/TheLogin.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheLanding
    },
    {
      path: '/sign-up',
      component: TheRegistration
    },
    {
      path: '/log-in',
      component: TheLogin
    }
  ]
})

export default router
