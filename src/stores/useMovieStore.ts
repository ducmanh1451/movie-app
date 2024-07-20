import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movieId: localStorage.getItem('movieId') || ''
  }),
  actions: {
    setMovieId(id: string) {
      this.movieId = id
      localStorage.setItem('movieId', id)
    },
    resetMovieId() {
      this.movieId = ''
      localStorage.removeItem('movieId')
    }
  },
  getters: {}
})
