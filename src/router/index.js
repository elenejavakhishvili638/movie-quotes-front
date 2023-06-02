import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'
import NewsFeed from '../views/NewsFeed.vue'
import axios from '../config/axios'
import { useEmailStore } from '../stores/email/index'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TheLanding
    },
    {
      path: '/news-feed',
      name: 'feed',
      component: NewsFeed,
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
    },
    {
      path: '/reset-password/:token',
      component: TheLanding,
      props: true
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const response = await axios.get('/api/user')
      console.log(response)
      next()
    } catch (error) {
      next('/')
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const store = useEmailStore()

  if (to.query.email_verified) {
    store.setEmailVerified(true)
  }

  next()
})

router.beforeEach(async (to, from, next) => {
  const store = useEmailStore()

  if (to.query.email) {
    store.setEmail(true)
  }

  next()
})

export default router
