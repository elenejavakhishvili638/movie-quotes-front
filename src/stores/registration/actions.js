import { registerUser, registerWithGoogle } from '../../services'

export default {
  async registerUser(data) {
    try {
      await registerUser(data)
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirmation = ''
      console.log(this.form)
      this.errors = {}
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors)
        this.errors = error.response.data.errors
        console.log(this.errors)
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
