import { defineStore } from 'pinia'

import actions from './actions'

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    login: {
      username: '',
      password: '',
      remember: null
    },
    errors: {}
  }),
  actions
})
