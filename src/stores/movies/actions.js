import { fetchMovies, fetchMovie } from '../../services'

export default {
  async fetchMovies(searchTerm) {
    try {
      const response = await fetchMovies(searchTerm)
      this.movieList = response.data
    } catch (error) {
      console.error(error)
    }
  },
  async fetchMovie(id) {
    try {
      const response = await fetchMovie(id)
      console.log(response.data)
      this.movie = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
