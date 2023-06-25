import axios from '../../config/axios'

export default {
  setLoggedOut(value) {
    this.loggedOut = value
  },
  setUser(userData) {
    this.user = userData
  },
  async fetchUserData () {
    try {
      const response = await axios.get('/api/user')
      this.setUser(response.data.data)
    } catch(error) {
      console.log(error)
    }
  },
  async fetchUser(status) {
    if (!this.user || status === 'edit') {
      try {
        const response = await axios.get('/api/user')
        this.setUser(response.data.data)
        if (response.data.data.email_verified_at === null) {
          this.userVerified = response.data.data.google_id
        } else {
          this.userVerified = response.data.data.email_verified_at
        }
      } catch (error) {
        console.log(error)
        this.setUser(null)
      }
    }
  }
}
