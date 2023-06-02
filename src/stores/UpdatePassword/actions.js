import { sendEmail } from '../../services'

export default {
  verifyEmail(payload) {
    console.log(payload)
    const { name, value } = payload
    this.verifyEmail[name] = value
  },
  updatePassword(payload) {
    const { name, value } = payload
    this.updatePassword[name] = value
  },
  async sendEmail(payload) {
    try {
      // console.log(payload)
      await sendEmail(payload)
    } catch (error) {
      console.error('Error during login', error)
    }
  }
}
