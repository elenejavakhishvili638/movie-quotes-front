import { sendNotification, fetchNotifications, markAsRead, markAllAsRead } from '../../services'

export default {
  async sendNotification(data, id) {
    try {
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
  },
  async markAsRead(id) {
    try {
      await markAsRead(id)
    } catch (error) {
      console.log(error)
    }
  },
  async markAllAsRead() {
    try {
      await markAllAsRead()
    } catch (error) {
      console.log(error)
    }
  }
}