import {
  fetchMovies,
  fetchMovie,
  fetchGenres,
  addMovie,
  deleteMovie,
  editMovie,
  fetchAllMovies
} from '../../services'

export default {
  async fetchMovies(searchTerm) {
    try {
      if (this.movieList.length > 0 && !searchTerm) {
        return
      }
      const response = await fetchMovies(searchTerm)
      this.movieList = response.data
    } catch (error) {
      console.error(error)
    }
  },

  async fetchAllMovies() {
    const response = await fetchAllMovies()
    this.allMovies = response.data.data
  },

  async fetchFullList() {
    const response = await fetchMovies()
    this.movieList = response.data
  },

  async fetchMovie(id) {
    const numId = Number(id)
    try {
      const foundMovie = this.movieList.find((movie) => movie.id === numId)
      if (foundMovie) {
        this.movie = foundMovie
      } else {
        const response = await fetchMovie(id)
        this.movie = response.data.data
      }
    } catch (error) {
      console.error(error)
    }
  },

  async updateMovie(id) {
    try {
      const response = await fetchMovie(id)
      this.movie = response.data.data
      console.log(this.movie, response.data.data)
    } catch (error) {
      console.error(error)
    }
  },

  async fetchGenres() {
    try {
      if (this.genres.length === 0) {
        const response = await fetchGenres()
        this.genres = response.data
      }
    } catch (error) {
      console.log(error)
    }
  },

  async addMovie(data) {
    try {
      await addMovie(data)
      this.addedMovie = {
        user_id: null,
        title: {
          en: '',
          ka: ''
        },
        year: null,
        genres: [],
        description: {
          en: '',
          ka: ''
        },
        director: {
          en: '',
          ka: ''
        },
        image: ''
      }
      this.errors = {}
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors)
        this.errors = error.response.data.errors
        console.log(this.errors)
      } else {
        console.log(error)
      }
    }
  },
  async deleteMovie(id) {
    try {
      await deleteMovie(id)
    } catch (err) {
      console.log(err)
    }
  },

  async editMovie(data, id) {
    try {
      await editMovie(data, id)
      await this.updateMovie(id)
      await this.fetchFullList()
    } catch (err) {
      console.log(err)
    }
  }
}
