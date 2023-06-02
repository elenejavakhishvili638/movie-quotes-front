export default {
  verifyEmail(payload) {
    console.log(payload)
    const { name, value } = payload
    this.verifyEmail[name] = value
  },
  updatePassword(payload) {
    const { name, value } = payload
    this.updatePassword[name] = value
  }
}
