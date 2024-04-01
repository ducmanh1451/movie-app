<template>
  <div id="header" class="container">
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
          <a class="navbar-item"> <RouterLink to="/">Trang chủ</RouterLink> </a>
          <a class="navbar-item">
            <RouterLink to="/showing-movie">Phim đang chiếu</RouterLink>
          </a>
          <a class="navbar-item"> <RouterLink to="/upcoming-movie">Phim sắp chiếu</RouterLink> </a>
          <a class="navbar-item">
            <RouterLink to="/tin-tuc-va-uu-dai">Tin mới & Ưu đãi</RouterLink>
          </a>
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
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#header {
  padding: 15px 0px;
}
#header .navbar {
  background-color: unset;
}
</style>
