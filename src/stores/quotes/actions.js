import { fetchQuotes, addQuote, addComment, deleteQuote, fetchQuote } from '../../services'

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
  },

  async fetchFullList() {
    const response = await fetchQuotes()
    this.quoteList = response.data
  },

  async fetchQuote(id) {
    try {
      const quoteList = this.quoteList.find((quote) => quote.id === id)
      if (quoteList) {
        this.movie = quoteList
      } else {
        const response = await fetchQuote(id)
        this.quote = response.data
      }
    } catch (error) {
      console.error(error)
    }
  },

  async addQuote(data) {
    try {
      await addQuote(data)
      this.addedQuote = {
        user_id: null,
        movie_id: null,
        body: {
          en: '',
          ka: ''
        },
        image: ''
      }
    } catch (error) {
      console.log(this.errors)
    }
  },

  async addComment(data, id) {
    try {
      await addComment(data, id)
      this.addedComment = {
        body: '',
        user_id: null
      }
    } catch (error) {
      console.log(this.errors)
    }
  },

  async deleteQuote(id) {
    try {
      await deleteQuote(id)
    } catch (error) {
      console.log(error)
    }
  }
}
