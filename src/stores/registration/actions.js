import { registerUser, registerWithGoogle } from '../../services'

export default {
  async registerUser(data) {
    try {
      await registerUser(data)
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirmation = ''
      this.errors = {}
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        this.errors = error.response.data.errors
      } else {
        console.log(error)
      }
    }
  },
  async registerWithGoogle() {
    try {
      await registerWithGoogle()
    } catch (error) {
      console.log(error)
    }
  }
}
