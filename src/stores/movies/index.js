import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useMoviesStore = defineStore({
  id: 'movie',
  state: () => ({
    movieList: [],
    movie: {},
    genres: [],
    addedMovie: {
      user_id: null,
      title: {
        en: '',
        ka: ''
      },
      year: null,
      genres: [],
      description: {
        en: '',
        ka: ''
      },
      director: {
        en: '',
        ka: ''
      },
      image: ''
    }
  }),
  getters,
  actions
})
