import { loginUser, loginWithGoogle, logout } from '../../services'

export default {
  async loginUser(payload) {
    try {
      await loginUser(payload)
    } catch (error) {
      console.error('Error during login', error)
    }
  },

  async loginWithGoogle() {
    try {
      await loginWithGoogle()
    } catch (error) {
      console.log(error)
    }
  },

  async logout() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }
}
