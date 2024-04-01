<template>{{ movie.name }}</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  movie: Object
})
</script>
