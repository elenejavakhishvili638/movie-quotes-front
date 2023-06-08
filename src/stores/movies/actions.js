import { fetchMovies, fetchMovie } from '../../services'

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

  async fetchMovie(id) {
    try {
      const movieFromList = this.movieList.find((movie) => movie.id === id)
      if (movieFromList) {
        this.movie = movieFromList
      } else {
        const response = await fetchMovie(id)
        this.movie = response.data
      }
    } catch (error) {
      console.error(error)
    }
  }
}
