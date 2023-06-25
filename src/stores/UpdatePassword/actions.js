import { sendEmail, updatePassword } from '../../services'

export default {
  async sendEmail(payload) {
    try {
      await sendEmail(payload)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        this.errors = error.response.data.errors
        console.log(this.errors)
      } else {
        console.log(error)
      }
    }
  },

  async updatePassword(payload) {
    try {
      await updatePassword(payload)
    } catch (error) {
      console.error(error)
    }
  }
}
