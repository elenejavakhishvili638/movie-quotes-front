export default {
  state() {
    return this.movieList
  },
  totalMovies: (state) => {
    return state.movieList.length
  }
}
