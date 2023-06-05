import { registerUser, registerWithGoogle } from '../../services'

export default {
  setUser(payload) {
    const { name, value } = payload
    this.form[name] = value
  },
  async registerUser(data) {
    console.log(data)
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
