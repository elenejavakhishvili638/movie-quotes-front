import { registerUser } from '../../services'

export default {
  setUser(payload) {
    const { name, value } = payload
    this.form[name] = value
  },
  async registerUser(data) {
    console.log(data)
    try {
      await registerUser(data)
    } catch (error) {
      console.log(error)
    }
  }
}
