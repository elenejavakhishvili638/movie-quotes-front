import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheLanding
    }
  ]
})

export default router
