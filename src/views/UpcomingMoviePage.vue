<template>
  <div id="upcoming-movie-tab">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="main container is-max-desktop">
      <div class="page-title">
        <h1>Phim sắp chiếu</h1>
      </div>
      <MoviesComponent :movies="movies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'
import MoviesComponent from '../components/MoviesComponent.vue'

// Data movies
const movies = ref([
  {
    id: 1,
    name: 'monkey-man',
    title: 'MONKEY MAN BÁO THÙ',
    image:
      'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/4/7/470x700_monkeyman.jpg'
  },
  {
    id: 2,
    name: 'civil-war',
    title: 'NGÀY TÀN CỦA ĐẾ QUỐC',
    image:
      'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/k/t/kt_facebook.jpg'
  }
])

// Data breadcrumb
const breadcrumb = ref({
  title: 'Phim sắp chiếu',
  route: '/upcoming-movie'
})
</script>
