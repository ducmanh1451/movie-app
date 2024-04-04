<template>
  <div id="detail-movie-tab">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="main container is-max-desktop">
      <div class="page-title">
        <h1>Nội dung phim: {{ movieName }}</h1>
      </div>
      <MovieDetailComponent :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'
import MovieDetailComponent from '../components/MovieDetailComponent.vue'

// get movieName in route
const route = useRoute()
let movieName = route.params.movieName

// data breadcrumb
let title = route.name == 'showingMovieDetail' ? 'Phim đang chiếu' : 'Phim sắp chiếu'
let routeValue = route.name == 'showingMovieDetail' ? '/showing-movie' : '/upcoming-movie'
const breadcrumb = ref({
  title: title,
  movieName: movieName,
  route: routeValue
})

// data movie
const movie = ref({
  id: 1,
  name: 'godzillaxkong',
  title: 'GODZILLA X KONG: ĐẾ CHẾ MỚI',
  image:
    'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_payoff_godzilla_va_kong_3_1_.jpg'
})
</script>
