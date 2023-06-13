import { defineStore } from 'pinia'

import actions from './actions'

export const useEmailStore = defineStore({
  id: 'verification',
  state: () => ({
    emailVerified: false,
    email: false
  }),
  actions
})
