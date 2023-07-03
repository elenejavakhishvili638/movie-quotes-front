import {
  fetchQuotes,
  addQuote,
  addComment,
  deleteQuote,
  editQuote,
  like,
  unlike,
  fetchQuote
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
    } catch (error) {
      console.log(error)
    }
  },

  async fetchQuote(id) {
    const movieStore = useMoviesStore()
    try {
      const foundQuote = movieStore.movie.quotes.find((quote) => quote.id === id)
      if (foundQuote) {
        this.quote = foundQuote
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchQuoteId(id) {
    try {
      const response = await fetchQuote(id)
      this.quote = response.data
    } catch (error) {
      console.log(error)
    }
  },

  async addQuote(data) {
    const movieStore = useMoviesStore()
    try {
      await addQuote(data)
      await this.fetchFullList()
      await movieStore.fetchFullList()
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

  async addComment(data, id, type) {
    const movieStore = useMoviesStore()
    try {
      if (type === 'movie') {
        const foundQuote = movieStore.movie.quotes.find((quote) => quote.id === id)
        foundQuote.comments.push(data)
        await addComment(data, id)
        await this.fetchQuoteId(id)
      } else {
        await addComment(data, id)
      }
      this.addedComment = {
        body: '',
        user_id: null
      }
    } catch (error) {
      console.log(this.errors)
    }
  },

  async deleteQuote(id) {
    const movieStore = useMoviesStore()
    try {
      await deleteQuote(id)
      await movieStore.fetchFullList()
    } catch (error) {
      console.log(error)
    }
  },

  async editQuote(data, id) {
    const movieStore = useMoviesStore()
    try {
      await editQuote(data, id)
      await this.fetchQuote(id)
      await movieStore.fetchFullList()
    } catch (err) {
      console.log(err)
    }
  },

  async likeQuote(id, data, type) {
    const movieStore = useMoviesStore()
    try {
      if (type === 'movie') {
        const foundQuote = movieStore.movie.quotes.find((quote) => quote.id === id)
        foundQuote.likes.push(data)
        await like(id, data)
        await movieStore.fetchFullList()
      } else {
        const foundQuote = this.quoteList.find((quote) => quote.id === id)
        foundQuote.likes.push(data)
        await like(id, data)
        await this.fetchFullList()
      }
    } catch (error) {
      console.log(error)
    }
  },

  async unlikeQuote(id, data, type) {
    const movieStore = useMoviesStore()
    const { user_id } = data
    try {
      if (type === 'movie') {
        const foundQuote = movieStore.movie.quotes.find((quote) => quote.id === id)
        const likeIndex = foundQuote.likes.findIndex((like) => like.user_id === user_id)
        if (likeIndex !== -1) {
          foundQuote.likes.splice(likeIndex, 1)
        }
        await unlike(id)
      } else {
        const foundQuote = this.quoteList.find((quote) => quote.id === id)
        const likeIndex = foundQuote.likes.findIndex((like) => like.user_id === user_id)
        if (likeIndex !== -1) {
          foundQuote.likes.splice(likeIndex, 1)
        }
        await unlike(id)
        await this.fetchFullList()
      }
    } catch (error) {
      console.log(error)
    }
  }
}
