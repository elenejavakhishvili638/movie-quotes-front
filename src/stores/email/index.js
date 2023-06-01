import { defineStore } from 'pinia'

import actions from './actions'

export const useEmailStore = defineStore({
  id: 'verificaiton',
  state: () => ({
    emailVerified: false
  }),
  actions
})
