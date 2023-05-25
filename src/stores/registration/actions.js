export default {
  setUser(payload) {
    const { name, value } = payload
    this.form[name] = value
  },
  async registerUser(data) {
    console.log(data)
  }
}
