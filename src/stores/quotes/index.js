import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useQuotesStore = defineStore({
  id: 'Quote',
  state: () => ({
    quoteList: {
      quotes: []
    }
  }),
  getters,
  actions
})
