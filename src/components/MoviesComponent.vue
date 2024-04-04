<template>
  <div class="list-movies">
    <ul class="products-grid">
      <li class="film-lists" v-for="movie in movies" :key="movie.id">
        <div class="product-images">
          <router-link :to="`${$route.path}/${movie.name}`" class="product-image">
            <img :src="movie.image" alt="" />
          </router-link>
        </div>
        <div class="product-info">
          <div class="product-name">
            <router-link :to="`${$route.path}/${movie.name}`" :title="movie.title">{{
              movie.title
            }}</router-link>
          </div>
          <div class="movie-info">
            <span class="info-bold">Thể loại: </span>
            <span class="info-normal">Hành Động, Phiêu Lưu</span>
          </div>
          <div class="movie-info">
            <span class="info-bold">Thời lượng: </span>
            <span class="info-normal">115 phút</span>
          </div>
          <div class="movie-info">
            <span class="info-bold">Khởi chiếu: </span>
            <span class="info-normal">29-03-2024 </span>
          </div>
        </div>
        <div class="list-buttons">
          <router-link :to="{ name: 'bookingTicket' }">
            <button type="button" class="button is-danger btn-booking">MUA VÉ</button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
defineProps(['movies'])
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
.products-grid > li.film-lists {
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
  height: 125px;
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
