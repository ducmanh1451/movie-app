<template>
  <div class="breadcrumbs">
    <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul class="container">
        <li class="home">
          <RouterLink to="/"></RouterLink>
        </li>
        <li>
          <RouterLink :to="breadcrumb.route">{{ breadcrumb.title }}</RouterLink>
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

const props = defineProps({
  breadcrumb: Object
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
