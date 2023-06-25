import { useUserStore } from '../stores/user/index'
import { useEmailStore } from '../stores/email/index'

export const emailModalGuard = async (to, from, next) => {
  const store = useEmailStore()
  if (to.query.email && to.query.modal === 'true') {
    store.setEmail(true)
  }
  if (to.query.email && to.query.modal === 'false') {
    store.setEmail(false)
  }

  next()
}


export const emailVerifiedGuard = async (to, from, next) => {
  const store = useEmailStore()
  if (to.query.email_verified) {
    store.setEmailVerified(true)
  }
  next()
}


export const authGuard = async (to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth) {
    await userStore.fetchUser()

    if (userStore.user && userStore.userVerified) {
      next()
    } else {
      next('/forbidden')
    }
  } else if (to.meta.guest) {
    await userStore.fetchUser()

    if (userStore.user && userStore.userVerified && !userStore.loggedOut) {
      next('/news-feed')
    } else {
      next()
    }
  } else {
    next()
  }
}
