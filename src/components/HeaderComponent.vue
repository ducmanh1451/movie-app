<template>
  <div id="header">
    <div class="container is-max-desktop">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <!-- <a href="" class="navbar-item">
          <img src="/src/assets/logo.jpg" alt="" />
        </a> -->
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link :to="{ name: 'home' }" class="navbar-item">Trang chủ</router-link>
            <router-link :to="{ name: 'showingMovie' }" class="navbar-item"
              >Phim đang chiếu</router-link
            >
            <router-link :to="{ name: 'upcomingMovie' }" class="navbar-item"
              >Phim sắp chiếu</router-link
            >
            <router-link :to="{ name: 'newsAndOffers' }" class="navbar-item"
              >Tin mới & Ưu đãi</router-link
            >
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Đăng ký</strong>
                </a>
                <a class="button is-light"> Đăng nhập </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#header {
  padding: 15px 0px;
  background: url(../assets/bg-top.png) repeat-x scroll center bottom rgba(0, 0, 0, 0);
}
#header .navbar {
  background-color: unset;
}
#header .navbar .navbar-start .navbar-item {
  color: rgb(34, 34, 34);
  font-family: Verdana, Arial, sans-serif;
  font-weight: bold;
  transition: transform 0.3s ease;
}
#header .navbar .navbar-start .navbar-item:hover {
  background-color: unset;
  transform: scale(1.05);
}
#header .navbar .navbar-start .navbar-item.router-link-active {
  background-color: unset;
}
</style>
