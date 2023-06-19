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
        console.log(response.data.data)
        this.setUser(response.data.data)
        if (response.data.data.email_verified_at === null) {
          this.userVerified = response.data.data.google_id
        } else {
          this.userVerified = response.data.data.email_verified_at
        }
        // console.log(this.userVerified)
      } catch (error) {
        console.log(error)
        this.setUser(null)
      }
    }
  }
}
