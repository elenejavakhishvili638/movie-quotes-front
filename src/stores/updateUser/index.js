import { defineStore } from 'pinia'

import actions from './actions'

export const useUpdateUserStore = defineStore({
  id: 'updateUser',
  state: () => ({
    form: {
      updatedUsername: '',
      updatedEmail: '',
      password: '',
      password_confirmation: '',
      image: ''
    }
  }),
  actions
})
