import { fetchMovies } from '../../services'

export default {
  async fetchMovies() {
    try {
      const response = await fetchMovies()
      this.movieList = response.data
      console.log(this.movieList)
    } catch (error) {
      console.error(error)
    }
  }
}
