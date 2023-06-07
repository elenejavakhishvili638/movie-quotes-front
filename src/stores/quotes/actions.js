import { fetchQuotes } from '../../services'

export default {
  async fetchQuotes(searchTerm) {
    try {
      const response = await fetchQuotes(searchTerm)
      // console.log(response.data, this.quoteList)
      this.quoteList = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
