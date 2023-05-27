import { defineStore } from 'pinia'
import actions from './actions'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }),
  actions
})
