<template>
  <div id="booking-detail">
    <div class="container is-max-desktop pt-3 pb-3">
      <div class="card">
        <div class="card-body p-5">
          <div class="title">BOOKING ONLINE</div>
          <div class="location-info">
            <span>CGV Hùng Vương Plaza | Cinema 2 | Số ghế (96/96)</span>
            <span>03/04/2024 23:30 ~ 04/04/2024 01:50</span>
          </div>
          <SeatingChartComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SeatingChartComponent from '../components/SeatingChartComponent.vue'
</script>

<style scoped>
.card {
  background-color: #fdfcf0;
}
.title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  line-height: 32px;
  margin-bottom: 15px;
}
.location-info {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
}
.location-info span {
  font-family: Verdana, Arial, sans-serif;
  color: #222;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
}
</style>
