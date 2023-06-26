import { resendEmail } from '../../services/index'
export default {
  setEmailVerified(value) {
    this.emailVerified = value
  },
  setEmail(value) {
    this.email = value
  },
  updateEmail() {
    let url = new URL(window.location.href)
    url.searchParams.set('email', false)
    window.history.pushState({}, '', url)
  },
  async resend() {
    try {
      await resendEmail()
    } catch (error) {
      console.log(error)
    }
  }
}
