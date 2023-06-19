import {
  fetchQuotes,
  addQuote,
  addComment,
  deleteQuote,
  editQuote,
  like,
  unlike
} from '../../services'
import { useMoviesStore } from '../movies'

export default {
  async fetchQuotes(searchTerm, page) {
    try {
      const response = await fetchQuotes(page, searchTerm)
      if (this.currentSearchTerm !== searchTerm) {
        this.quoteList = response.data
      } else {
        this.quoteList = [...this.quoteList, ...response.data]
      }

      this.currentSearchTerm = searchTerm
    } catch (error) {
      console.error(error)
    }
  },

  async fetchFullList() {
    try {
      const response = await fetchQuotes(1)
      this.quoteList = response.data
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  },

  async fetchQuote(id) {
    const movieStore = useMoviesStore()
    try {
      const foundQuote = movieStore.movie.myQuotes.find((quote) => quote.id === id)
      if (foundQuote) {
        this.quote = foundQuote
      }
      // else {
      //   const response = await fetchQuote(id)
      //   this.quote = response.data
      // }
    } catch (error) {
      console.error(error)
    }
  },

  async addQuote(data) {
    try {
      await addQuote(data)
      await this.fetchFullList()
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
  },

  async editQuote(data, id) {
    try {
      await editQuote(data, id)
      await this.fetchQuote(id)
      // console.log(id)
      // for (let [key, value] of data.entries()) {
      //   console.log(`${key}: ${value}`)
      // }
    } catch (err) {
      console.log(err)
    }
  },

  async likeQuote(id, data) {
    try {
      await like(id, data)
      await this.fetchFullList()
    } catch (error) {
      console.log(error)
    }
  },

  async unlikeQuote(id) {
    try {
      await unlike(id)
      await this.fetchFullList()
    } catch (error) {
      console.log(error)
    }
  }
}
