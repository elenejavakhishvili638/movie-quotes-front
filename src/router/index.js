import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '@/views/TheLanding.vue'
import NewsFeed from '@/views/NewsFeed.vue'
import axios from '@/config/axios'
import ForbiddenError from '@/views/ForbiddenError.vue'
import NotFoundError from '@/views/NotFoundError.vue'
import { useEmailStore } from '@/stores/email'
import { emailModalGuard, emailVerifiedGuard, authGuard } from './guards'

const MovieList = () => import('@/views/MovieList.vue')
const TheProfile = () => import('@/views/TheProfile.vue')
const TheMovie = () => import('@/views/TheMovie.vue')
const NewQuote = () => import('@/components/NewQuote.vue')
const NewMovie = () => import('@/components/NewMovie.vue')
const EditMovie = () => import('@/components/EditMovie.vue')
const AddQuote = () => import('@/components/AddQuote.vue')
const ViewQuote = () => import('@/components/ViewQuote.vue')
const EditQuote = () => import('@/components/EditQuote.vue')
const TheLogin = () => import('@/components/TheLogin.vue')
const TheRegistration = () => import('@/components/TheRegistration.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheLanding,
      meta: { guest: true },
      children: [
        {
          name: 'login',
          path: 'login',
          component: TheLogin
        },
        {
          name: 'registration',
          path: 'registration',
          component: TheRegistration
        }
      ]
    },
    {
      path: '/news-feed',
      name: 'feed',
      component: NewsFeed,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'newQuote',
          path: 'new-quote',
          component: NewQuote
        }
      ]
    },
    {
      path: '/movie-list',
      name: 'movies',
      component: MovieList,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'newMovie',
          path: 'new-movie',
          component: NewMovie
        }
      ]
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: TheMovie,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'editMovie',
          path: 'edit-movie',
          component: EditMovie
        },
        {
          name: 'editQuote',
          path: 'edit-quote',
          component: EditQuote
        },
        {
          name: 'addQuote',
          path: 'add-quote',
          component: AddQuote
        },
        {
          name: 'viewQuote',
          path: 'view-quote',
          component: ViewQuote
        }
      ]
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
        const emailStore = useEmailStore()
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
            if (error) {
              emailStore.expired = true
            }
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
      component: ForbiddenError,
      meta: { guest: true }
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
