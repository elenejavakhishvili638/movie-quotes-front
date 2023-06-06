import { fetchQuotes } from '../../services'

export default {
  async fetchQuotes() {
    try {
      const response = await fetchQuotes()
      // console.log(response.data, this.quoteList)
      this.quoteList = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
