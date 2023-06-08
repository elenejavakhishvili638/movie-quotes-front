import { fetchQuotes } from '../../services'

export default {
  async fetchQuotes(searchTerm) {
    try {
      if (this.quoteList.length > 0 && !searchTerm) {
        return
      }
      const response = await fetchQuotes(searchTerm)
      this.quoteList = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
