import { fetchMovies, fetchMovie } from '../../services'

export default {
  async fetchMovies(searchTerm) {
    try {
      const response = await fetchMovies(searchTerm)
      this.movieList = response.data
      console.log(this.movieList)
    } catch (error) {
      console.error(error)
    }
  },

  async fetchMovie(id) {
    try {
      const movieFromList = this.movieList.find((movie) => movie.id === id)
      console.log(movieFromList)
      if (movieFromList) {
        this.movie = movieFromList
        console.log(this.movie)
      } else {
        const response = await fetchMovie(id)
        this.movie = response.data
        console.log(this.movie)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
