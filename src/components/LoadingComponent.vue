<template>
    <div v-if="props.loading" class="loading">
        <div class="loading-icon"></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped>
.loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10;
    opacity: 0.7;
    background-color: #e1e1e1;
}

.loading .loading-icon {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -75px 0 0 -25px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>