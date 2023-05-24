import { defineStore } from 'pinia'

import getters from './getters'
import actions from './actions'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    currentLanguage: 'en',
    display: 'Eng'
  }),
  getters,
  actions
})
