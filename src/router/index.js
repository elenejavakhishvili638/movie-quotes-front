import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '../views/TheLanding.vue'
import NewsFeed from '../views/NewsFeed.vue'
import axios from '../config/axios'
import ForbiddenError from '../views/ForbiddenError.vue'
import NotFoundError from '../views/NotFoundError.vue'
import { emailModalGuard, emailVerifiedGuard, authGuard } from './guards'

const MovieList = () => import('../views/MovieList.vue')
const TheProfile = () => import('../views/TheProfile.vue')
const TheMovie = () => import('../views/TheMovie.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheLanding,
      meta: { guest: true }
    },
    {
      path: '/news-feed',
      name: 'feed',
      component: NewsFeed,
      meta: { requiresAuth: true }
    },
    {
      path: '/movie-list',
      name: 'movies',
      component: MovieList,
      meta: { requiresAuth: true }
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: TheMovie,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-profile',
      name: 'profile',
      component: TheProfile,
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
      path: '/email-change/verify/:id/:hash/:token',
      component: TheLanding,
      beforeEnter: (to, from, next) => {
        const { id, hash, token } = to.params
        const { expires, signature } = to.query
        axios
          .get(`api/email-change/verify/${id}/${hash}/${token}`, {
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
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenError
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundError
    }
  ]
})

router.beforeEach(authGuard)
router.beforeEach(emailVerifiedGuard)
router.beforeEach(emailModalGuard)

export default router
