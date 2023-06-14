import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useQuotesStore = defineStore({
  id: 'Quote',
  state: () => ({
    quoteList: [],
    addedQuote: {
      user_id: null,
      movie_id: null,
      body: {
        en: '',
        ka: ''
      },
      image: ''
    },
    addedComment: {
      body: '',
      user_id: null
    }
  }),
  getters,
  actions
})
