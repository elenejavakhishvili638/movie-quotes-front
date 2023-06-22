// import { sendNotification } from '../../services'

export default {
  async sendNotification(data, id) {
    try {
      console.log(data, id)
      //   await sendNotification(data, id)
    } catch (error) {
      console.log(error)
    }
  }
}
