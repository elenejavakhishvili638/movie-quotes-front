import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useMoviesStore = defineStore({
  id: 'movie',
  state: () => ({
    movieList: {
      movies: []
    },
    movie: {}
  }),
  getters,
  actions
})
