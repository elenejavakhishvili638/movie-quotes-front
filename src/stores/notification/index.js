import { defineStore } from 'pinia'
import actions from './actions'

export const useNotificationStore = defineStore({
  id: 'Notification',
  state: () => ({
    notifications: [],
    notificationOpen: false
  }),
  actions
})
