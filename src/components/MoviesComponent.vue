<template>
  <div class="list-movies">
    <ul class="products-grid">
      <li class="film-lists" v-for="movie in movies" :key="movie.id">
        <div class="product-images">
          <router-link :to="`${$route.path}/${movie.movie_name}`" class="product-image">
            <img :src="movie.poster" alt="" />
          </router-link>
        </div>
        <div class="product-info">
          <div class="product-name">
            <router-link :to="`${$route.path}/${movie.movie_name}`" :title="movie.movie_name">{{
              movie.movie_name
            }}</router-link>
          </div>
          <div class="movie-info">
            <span class="info-bold">Thể loại: </span>
            <span class="info-normal">{{ convertToString(movie.genre) }}</span>
          </div>
          <div class="movie-info">
            <span class="info-bold">Thời lượng: </span>
            <span class="info-normal">{{ movie.movie_duration }} phút</span>
          </div>
          <div class="movie-info">
            <span class="info-bold">Khởi chiếu: </span>
            <span class="info-normal">{{ formatDateToDisplay(movie.expected_start_date) }}</span>
          </div>
        </div>
        <div class="list-buttons">
          <a class="button is-danger btn-booking" href="#" @click.prevent="navigateToBooking(movie)">
            MUA VÉ
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { formatDateToDisplay } from "../helpers/date"
import type { Movie } from '../helpers/types'
import { useBookingStore } from '../stores/useBookingStore'

// define props
defineProps(['movies'])

// variables
const bookingStore = useBookingStore()
const router = useRouter()

// // mounted
// onMounted(() => {
//   // reset booking_date in state
//   bookingStore.resetBookingData()
//   // reset seatsBooked
//   bookingStore.resetSeats()
// })

// functions
// convert genre to string
const convertToString = (genre: string[]) => {
  return genre.join(', ')
}

// go to booking page
const navigateToBooking = (movie: Movie) => {
  bookingStore.setBookingData({
    booking_id: '',
    movie_id: movie._id,
    movie_name: movie.movie_name,
    poster: movie.poster,
    room_id: '',
    room_name: '',

    cinema_id: '',
    cinema_name: ''
  })
  router.push({ name: 'bookingTicket' })
}
</script>

<style scoped>
.list-movies {
  border-bottom: 3px solid #241d1e;
  margin-bottom: 35px;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
}

.products-grid>li.film-lists {
  text-align: left;
  margin-right: 64px;
  width: 200px;
  height: 300px;
  margin-bottom: 200px;
}

li.film-lists .product-images {
  position: relative;
  border: 6px solid #000000;
  width: 100%;
  height: 100%;
}

li.film-lists .product-images .product-image {
  width: inherit;
  height: inherit;
  display: block;
}

li.film-lists .product-images .product-image img {
  width: inherit;
  height: inherit;
}

li.film-lists .product-info {
  width: 100%;
  min-height: 125px;
  position: relative;
}

.product-info .product-name {
  text-transform: uppercase;
  font-size: 15px;
  font-family: Verdana, Arial, sans-serif;
  padding-top: 5px;
}

.product-info .product-name a {
  color: #333;
  font-size: 15px;
  font-weight: bold;
  text-transform: none;
  font-family: Verdana, Arial, sans-serif;
}

.movie-info .info-bold {
  font-weight: bold;
  font-size: 14px;
}

.movie-info .info-normal {
  font-size: 14px;
}

.list-buttons {
  display: flex;
  justify-content: start;
}

.list-buttons .btn-booking {
  color: #fff;
}
</style>
