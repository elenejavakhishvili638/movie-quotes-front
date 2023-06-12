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
    } catch (error) {
      console.log(error)
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
