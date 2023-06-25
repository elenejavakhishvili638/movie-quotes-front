import { loginUser, loginWithGoogle, logout } from '../../services'

export default {
  async loginUser(payload) {
    try {
      await loginUser(payload)
    } catch (error) {
      console.log(error.response)
      if (error.response && error.response.data && error.response.data.errors) {
        this.errors = error.response.data.errors
        for (let field in this.errors) {
          this.errors[field] = this.errors[field].map((error) => JSON.parse(error))
        }
      } else {
        this.errors = { password: [error.response.data] }
      }
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
