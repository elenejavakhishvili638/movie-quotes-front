import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'

import axios from '../config/axios'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheLanding
    },
    {
      path: '/user',
      name: 'User',
      component: TheLanding,
      meta: { requiresAuth: true }
    },
    {
      path: '/email/verify/:id/:hash',
      component: TheLanding,
      beforeEnter: (to, from, next) => {
        const { id, hash } = to.params
        const { expires, signature } = to.query
        axios
          .get(`api/email/verify/${id}/${hash}`, {
            params: {
              expires: expires,
              signature: signature
            }
          })
          .then((response) => {
            console.log(response)
            next()
          })
          .catch((error) => {
            console.log(error)
            next()
          })
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    next('/')
  } else {
    next()
  }
})

export default router
