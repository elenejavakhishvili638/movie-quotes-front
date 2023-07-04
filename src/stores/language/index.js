import { defineStore } from 'pinia'

import actions from './actions'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    currentLanguage: 'en',
    display: 'Eng',
    show: false
  }),
  actions
})
