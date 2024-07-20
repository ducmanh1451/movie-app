<template>
  <LoadingComponent :loading="isLoading"></LoadingComponent>
  <div id="detail-movie-tab">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="main container is-max-desktop">
      <div class="page-title">
        <h1>Nội dung phim: {{ movie?.movie_name }}</h1>
      </div>
      <MovieDetailComponent :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'
import MovieDetailComponent from '../components/MovieDetailComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import axios from 'axios'
import { useMovieStore } from '../stores/useMovieStore'
import type { Movie } from '../helpers/types'

// vars
const route = useRoute()
const router = useRouter()
let movieName = route.params.movieName
const isLoading = ref<boolean>(false)
const movieStore = useMovieStore()
const movie = ref<Movie>()

// data breadcrumb
let title = route.name == 'showingMovieDetail' ? 'Phim đang chiếu' : 'Phim sắp chiếu'
let routeValue = route.name == 'showingMovieDetail' ? '/showing-movie' : '/upcoming-movie'
const breadcrumb = ref({
  title: title,
  movieName: movieName,
  route: routeValue
})

router.beforeEach((to, from, next) => {
  if (from.name === 'detailMovie') {
    localStorage.removeItem('movieId')
  }
  next()
})

onBeforeMount(() => {
  // call api
  if (movieStore.movieId != '') {
    getDetailMovieInformation(movieStore.movieId)
  }
})

const getDetailMovieInformation = async (movieId: string) => {
  try {
    isLoading.value = true
    const response = await axios.get(`http://localhost:8000/api/v1/movie/find/${movieId}`);
    // Xử lý dữ liệu trả về ở đây
    movie.value = response.data.payload[0]
    isLoading.value = false
  } catch (error: any) {
    console.log('Error calling API getDetailMovieInformation:', error)
    isLoading.value = false
  }
}
</script>
