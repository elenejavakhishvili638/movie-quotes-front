import { fetchMovies, fetchMovie, fetchGenres, addMovie, deleteMovie, editMovie } from '../../services'

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

  async fetchFullList() {
    const response = await fetchMovies()
    this.movieList = response.data
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
            const response = await fetchGenres();
            this.genres = response.data;
        }
    } catch(error) {
        console.log(error);
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
      };
    } catch (err) {
      console.log(err)
    }
  },
  async deleteMovie(id) {
    try {
      await deleteMovie(id)
    } catch (err) {
      console.log(err)
    }
  },

  async editMovie(data,id) {
    try {
      await editMovie(data, id)
    } catch (err) {
      console.log(err)
    }
  }
}
