import { defineStore } from 'pinia'

import actions from './actions'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null
  }),
  actions
})
