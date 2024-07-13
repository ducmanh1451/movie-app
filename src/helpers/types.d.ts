export type Booking = {
  _id: string
  cinema_id: string
  cinema_name: string
  room_id: string
  room_name: string
  movie_id: string
  movie_name: string
  expected_start_date: string
  expected_end_date: string
  opening_date: string
  opening_start_time: string
  opening_end_time: string
  seats: MovieRoomSeat[]
  rows: number
  columns: number
}

export type MovieRoomSeat = {
  seat_id: number
  seat_name: string
  row: number
  column: number
  type: number
  available: boolean
  price: number
  customer: object
  booking: boolean
}

export type Movie = {
  _id: string
  movie_name: string
  poster: string
}

export type FormRegister = {
  customer_name: string
  phone_number: string
  birthday: Date | null
  gender: number
  email: string
  password: string
  address: string
}

export type FormLogin = {
  email: string
  password: string
}

export type Customer = {
  _id: string
  customer_name: string
  phone_number: string
  birthday: string
  gender: number
  email: string
  password: string
  address: string
  is_change_password: boolean
  new_password: string
  booking_history?: BookingHistory[]
}

export type BookingHistory = {
  booking_id: string
  cinema_name: string
  room_name: string
  movie_name: string
  opening_start_time: string
  opening_end_time: string
  booking_date: string
  seats: [
    {
      seat_id: number
      price: number
    }
  ]
}
