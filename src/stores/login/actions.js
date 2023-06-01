import { loginUser, loginWithGoogle } from '../../services'

export default {
  setUser(payload) {
    const { name, value } = payload
    this.login[name] = value
  },

  async loginUser(payload) {
    try {
      console.log(payload)
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
  }
}
