<template>
  <div id="header">
    <div class="container is-max-desktop">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <!-- <a href="" class="navbar-item">
          <img src="/src/assets/logo.jpg" alt="" />
        </a> -->
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link :to="{ name: 'home' }" class="navbar-item">Trang chủ</router-link>
            <router-link :to="{ name: 'showingMovie' }" class="navbar-item">Phim đang chiếu</router-link>
            <router-link :to="{ name: 'upcomingMovie' }" class="navbar-item">Phim sắp chiếu</router-link>
            <router-link :to="{ name: 'newsAndOffers' }" class="navbar-item">Tin mới & Ưu đãi</router-link>
          </div>
          <div v-if="authStore.accessToken == ''" class="navbar-end">
            <router-link :to="{ name: 'login' }" class="navbar-item pr-0 login">Đăng nhập</router-link>
            <router-link :to="{ name: 'login' }" class="navbar-item register">Đăng ký</router-link>
          </div>
          <div v-if="authStore.accessToken != ''" class="navbar-end">
            <router-link :to="{ name: 'customer' }" class="navbar-item pr-0 login">Xin chào {{
              authStore.customerData.customer_name }}</router-link>
            <a @click="logout" class="navbar-item register">Thoát</a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout();
  // go to home page after logout success
  router.push({ name: 'home' })
}

</script>

<style scoped>
#header {
  padding: 15px 0px;
  background: url(../assets/bg-top.png) repeat-x scroll center bottom rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

#header .navbar {
  background-color: unset;
}

/* css navbar left */
#header .navbar .navbar-start .navbar-item {
  color: rgb(34, 34, 34);
  font-family: Verdana, Arial, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
}

#header .navbar .navbar-start .navbar-item:hover {
  transform: scale(1.05);
}

#header .navbar .navbar-start .navbar-item:hover,
#header .navbar .navbar-start .navbar-item.router-link-active,
#header .navbar .navbar-start .navbar-item:active,
#header .navbar .navbar-end .navbar-item:hover,
#header .navbar .navbar-end .navbar-item.router-link-active,
#header .navbar .navbar-end .navbar-item:active {
  background-color: unset;
}

/* css navbar right */
.navbar-end .navbar-item {
  text-transform: uppercase;
}

.navbar-end .navbar-item.login {
  position: relative;
}

.navbar-end .navbar-item.login::before {
  width: 25px;
  content: '';
  background-image: url(../assets/icon_login25.png);
  background-repeat: no-repeat;
  position: absolute;
  left: -15px;
  top: 14px;
  height: 25px;
}

.navbar-end .navbar-item.login::after {
  width: 25px;
  content: '/';
  position: absolute;
  right: -27px;
  height: 25px;
}
</style>
