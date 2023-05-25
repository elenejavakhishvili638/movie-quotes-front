import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'
import TheRegistration from '../views/TheRegistration.vue'

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
    }
  ]
})

export default router
