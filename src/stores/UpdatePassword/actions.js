import { sendEmail, updatePassword } from '../../services'

export default {
  verifyEmail(payload) {
    console.log(payload)
    const { name, value } = payload
    this.verifyEmail[name] = value
  },

  updatePasswordForm(payload) {
    const { name, value } = payload
    this.updatePassword[name] = value
  },

  async sendEmail(payload) {
    try {
      await sendEmail(payload)
    } catch (error) {
      console.error(error)
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
