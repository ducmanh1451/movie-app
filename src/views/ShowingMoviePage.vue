<template>
  <div id="showing-movie-tab">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="main container is-max-desktop">
      <div class="page-title">
        <h1>Phim đang chiếu</h1>
      </div>
      <div v-if="movies.length > 0">
        <MoviesComponent :movies="movies" />
      </div>
      <div v-else>
        Không có dữ liệu
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'
import MoviesComponent from '../components/MoviesComponent.vue'
import axios from 'axios'
import { useBookingStore } from '../stores/useBookingStore'


const movies = ref([])
const bookingStore = useBookingStore()

// Data movies
onMounted(async () => {
  try {
    // fetch data cinema
    const response = await axios.get(`http://localhost:8000/api/v1/movie/get-showing-movie`)
    movies.value = response.data.payload
    // reset booking_date in state
    bookingStore.resetBookingData()
    // reset seatsBooked
    bookingStore.resetSeats()
  } catch (error) {
    console.error('Error fetching genre data:', error)
  }
})

// Data breadcrumb
const breadcrumb = ref({
  title: 'Phim đang chiếu',
  route: '/showing-movie'
})
</script>
