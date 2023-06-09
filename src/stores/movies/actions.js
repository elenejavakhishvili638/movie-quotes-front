import { fetchMovies, fetchMovie, fetchGenres, addMovie } from '../../services'

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
  },

  async fetchGenres() {
    try {
        if (this.genres.length === 0) {
            const response = await fetchGenres();
            this.genres = response.data;
            // console.log(this.genres);
        }
    } catch(error) {
        console.log(error);
    }
  },

  async addMovie(data) {
    // console.log(data)
    try {
      await addMovie(data)
    } catch (err) {
      console.log(err)
    }
  }
}
