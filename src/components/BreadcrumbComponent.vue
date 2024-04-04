<template>
  <div class="breadcrumbs">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul class="container is-max-desktop">
        <li class="home">
          <router-link :to="{ name: 'home' }"></router-link>
        </li>
        <li>
          <router-link :to="breadcrumb.route">{{ breadcrumb.title }}</router-link>
        </li>
        <li v-show="breadcrumb.movieName !== undefined">
          <a>{{ breadcrumb.movieName ?? '' }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

defineProps({
  breadcrumb: {
    type: Object
  }
})
</script>

<style scoped>
.breadcrumbs {
  background-color: #f1f0e5;
  border-bottom: 1px solid #cacac0;
  padding: 5px 0;
  margin: 0;
  width: 100%;
}
.breadcrumbs li {
  height: 24px;
}
.breadcrumbs li a {
  padding: 0;
  color: #222;
}
.breadcrumbs li.home a {
  background: url(../assets/bg-cgv-bread-home.png) no-repeat scroll left center transparent;
  width: 24px;
  height: 24px;
}
.breadcrumb.has-succeeds-separator li + li:before {
  content: '≻';
  padding: 0 10px;
  color: #222;
}
</style>
