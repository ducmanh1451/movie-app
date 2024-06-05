<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />
  <div id="content">
    <RouterView />
  </div>
  <FooterComponent />
</template>

<style>
#content {
  margin-top: 82px;
  margin-bottom: 120px;
}
</style>
