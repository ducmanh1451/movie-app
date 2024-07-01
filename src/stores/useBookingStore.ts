import { defineStore } from 'pinia'
import type { MovieRoomSeat } from '../helpers/types'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    // bookingId: localStorage.getItem('bookingId') || '',
    seatsBooked: JSON.parse(localStorage.getItem('seatsBooked') || '[]') as Array<MovieRoomSeat>,
    bookingData: JSON.parse(localStorage.getItem('bookingData') || '{}') || {
      booking_id: '',
      movie_id: '',
      movie_name: '',
      poster: '',
      room_id: '',
      room_name: '',

      cinema_id: '',
      cinema_name: ''
    }
  }),
  actions: {
    // setBookingId(id: string) {
    //   this.bookingId = id
    //   localStorage.setItem('bookingId', id)
    // },
    // resetBookingId() {
    //   this.bookingId = ''
    //   localStorage.removeItem('bookingId')
    // },

    addSeat(seat: MovieRoomSeat) {
      this.seatsBooked.push(seat)
      localStorage.setItem('seatsBooked', JSON.stringify(this.seatsBooked))
    },
    removeSeat(seat: MovieRoomSeat) {
      this.seatsBooked = this.seatsBooked.filter(
        (s) => s.row !== seat.row || s.column !== seat.column
      )
      localStorage.setItem('seatsBooked', JSON.stringify(this.seatsBooked))
    },
    resetSeats() {
      this.seatsBooked = []
      localStorage.removeItem('seatsBooked')
    },

    setBookingData(data: {
      booking_id: string
      movie_id: string
      movie_name: string
      poster: string
      room_id: string
      room_name: string

      cinema_id: string
      cinema_name: string
    }) {
      this.bookingData = data
      localStorage.setItem('bookingData', JSON.stringify(data))
    },
    resetBookingData() {
      this.bookingData = {
        booking_id: '',
        movie_id: '',
        movie_name: '',
        poster: '',
        room_id: '',
        room_name: '',

        cinema_id: '',
        cinema_name: ''
      }
      localStorage.removeItem('bookingData')
    }
  },
  getters: {
    getSeatsNameAndTotalPrice: (state) => {
      const seatNames = state.seatsBooked
        .map((seat) => `${String.fromCharCode(64 + seat.row)}${seat.column}`)
        .join(', ')
      const totalPrice = state.seatsBooked.reduce((total, seat) => total + seat.price, 0)
      const formattedTotalPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(totalPrice)
      return { seatNames, totalPrice: formattedTotalPrice }
    }
  }
})
