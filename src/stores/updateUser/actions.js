import { updateUser } from '../../services'

export default {
  async updateUser(data, id) {
    try {
      await updateUser(data, id)
      // await this.fetchQuote(id)
      console.log(id)
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
