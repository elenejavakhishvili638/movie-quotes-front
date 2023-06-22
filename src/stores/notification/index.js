import { defineStore } from 'pinia'
import { sendNotification, fetchNotifications } from '../../services'

// import actions from './actions'

export const useNotificationStore = defineStore({
  id: 'Notification',
  state: () => ({
    notifications: []
  }),
  actions: {
    async sendNotification(data, id) {
      try {
        console.log(data, id)
        await sendNotification(data, id)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchNotifications() {
      try {
        const response = await fetchNotifications()
        this.notifications = response.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
