<template>
  <div id="showing-movie-tab">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="main container is-max-desktop">
      <div class="page-title">
        <h1>Phim đang chiếu</h1>
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
    name: 'godzillaxkong',
    title: 'GODZILLA X KONG: ĐẾ CHẾ MỚI',
    image:
      'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_payoff_godzilla_va_kong_3_1_.jpg'
  },
  {
    id: 2,
    name: 'dune2',
    title: 'DUNE: HÀNH TINH CÁT - PHẦN HAI',
    image:
      'https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/190x260/2e2b8cd282892c71872b9e67d2cb5039/p/o/poster_dune_2_bb_3_no_qr_1_.jpg'
  }
])

// Data breadcrumb
const breadcrumb = ref({
  title: 'Phim đang chiếu',
  route: '/showing-movie'
})
</script>
