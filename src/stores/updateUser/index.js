import { defineStore } from 'pinia'

import actions from './actions'

export const useUpdateUserStore = defineStore({
  id: 'updateUser',
  state: () => ({
    form: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }),
  actions
})
