import {
  fetchMovies,
  fetchMovie,
  fetchGenres,
  addMovie,
  deleteMovie,
  editMovie
} from '../../services'

export default {
  filterMovies(searchTerm) {
    if (searchTerm === '') {
      this.filteredMovieList = this.movieList
    } else {
      this.filteredMovieList = this.movieList.filter(
        (movie) =>
          movie.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.title.ka.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  },

  async fetchFullList() {
    const response = await fetchMovies()
    this.movieList = response.data
    this.filteredMovieList = this.movieList
  },

  async fetchMovie(id) {
    const numId = Number(id)
    try {
      const foundMovie = this.movieList.find((movie) => movie.id === numId)
      if (foundMovie) {
        this.movie = foundMovie
      } else {
        const response = await fetchMovie(id)
        this.movie = response.data
      }
    } catch (error) {
      console.error(error)
    }
  },

  async fetchMovieId(id) {
    try {
      const response = await fetchMovie(id)
      this.movie = response.data
    } catch (error) {
      console.error(error)
    }
  },

  async updateMovie(id) {
    try {
      const response = await fetchMovie(id)
      this.movie = response.data
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
        this.errors = error.response.data.errors
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
      this.editErrors = {}
      await editMovie(data, id)
      await this.updateMovie(id)
      await this.fetchFullList()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        this.editErrors = error.response.data.errors
      } else {
        console.log(error)
      }
    }
  }
}
