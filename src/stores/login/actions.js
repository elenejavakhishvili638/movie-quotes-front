import { loginUser } from '../../services'

export default {
  setUser(payload) {
    const { name, value } = payload
    this.login[name] = value
  },
  async loginUser(payload) {
    try {
      await loginUser(payload)
      this.isAuthenticated = true
    } catch (error) {
      console.error('Error during login', error)
    }
  }
}
