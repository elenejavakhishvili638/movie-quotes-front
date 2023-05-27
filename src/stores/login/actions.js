export default {
  setUser(payload) {
    const { name, value } = payload
    this.login[name] = value
  },
  async loginUser(payload) {
    console.log(payload)
  }
}
