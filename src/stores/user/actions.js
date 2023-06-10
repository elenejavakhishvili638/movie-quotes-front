import axios from '../../config/axios'

export default {
  setLoggedOut(value) {
    this.loggedOut = value
  },
  setUser(userData) {
    this.user = userData
  },
  async fetchUser() {
    if (!this.user) {
      try {
        const response = await axios.get('/api/user')
        this.setUser(response.data)
        this.userVerified = response.data.email_verified_at
      } catch (error) {
        console.log(error)
        this.setUser(null)
      }
    }
  }
}
