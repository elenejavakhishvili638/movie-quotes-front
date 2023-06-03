import { defineStore } from 'pinia'

import actions from './actions'

export const usePasswordResetStore = defineStore({
  id: 'password',
  state: () => ({
    verifyEmail: {
      email: ''
    },

    updatePassword: {
      password: '',
      password_confirmation: ''
    }
  }),
  actions
})
