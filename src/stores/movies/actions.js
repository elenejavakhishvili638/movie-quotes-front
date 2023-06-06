import { fetchMovies } from '../../services'

export default {
  async fetchMovies(searchTerm) {
    try {
      const response = await fetchMovies(searchTerm)
      this.movieList = response.data
    } catch (error) {
      console.error(error)
    }
  }
}
