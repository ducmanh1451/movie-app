<template>
  <div class="cart">
    <div v-if="props.buttonLeft" class="btn btn-left" @click="goBack">
      <ArrowLeftIcon class="btn-icon"></ArrowLeftIcon>
      <span>Previous</span>
    </div>
    <div class="minicart-wrapper">
      <div class="cart-item movie-detail">
        <div class="movie-info">
          <span>PHIM: {{ bookingStore.bookingData.movie_name }}</span>
          <img :src="bookingStore.bookingData.poster" alt="">
        </div>
      </div>
      <div class="cart-item seat-detail">
        <ul>
          <li class="seat-detail-item">
            <div class="label">Rạp</div>
            <div>{{ bookingStore.bookingData.cinema_name }}</div>
          </li>
          <li class="seat-detail-item">
            <div class="label">Phòng chiếu</div>
            <div>{{ bookingStore.bookingData.room_name }}</div>
          </li>
          <li class="seat-detail-item">
            <div class="label">Ghế</div>
            <div>{{ bookingStore.getSeatsNameAndTotalPrice.seatNames }}</div>
          </li>
        </ul>
      </div>
      <div class="cart-item total-price">
        <ul>
          <li class="price-detail-item">
            <div class="label">Tổng tiền:</div>
            <div>{{ bookingStore.getSeatsNameAndTotalPrice.totalPrice }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="props.buttonRight && props.buttonRight == 'btn-next'" class="btn btn-right" @click="goToPayment">
      <ArrowRightIcon class="btn-icon"></ArrowRightIcon>
      <span>Next</span>
    </div>
    <div v-if="props.buttonRight && props.buttonRight == 'btn-payment'" class="btn btn-right" @click="payment">
      <ShoppingBagIcon class="btn-icon"></ShoppingBagIcon>
      <span>Payment</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ArrowLeftIcon, ArrowRightIcon, ShoppingBagIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/useBookingStore'

// define props
const props = defineProps({
  buttonLeft: {
    type: String
  },
  buttonRight: {
    type: String
  },
})

// variables
const router = useRouter()
const bookingStore = useBookingStore()

// functions
const goBack = () => {
  router.go(-1);
}

const goToPayment = () => {
  if (bookingStore.seatsBooked.length > 0) {
    // Chuyển tới router "payment" với các tham số cần thiết
    router.push({ name: 'payment' })
  } else {
    // Nếu chưa chọn ghế, hiển thị alert thông báo
    alert('Vui lòng chọn ghế trước khi tiếp tục')
  }
}

const payment = () => {
  alert('payment')
}
</script>

<style scoped>
/* css cart */
.cart {
  margin-top: 30px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  display: flex;
  position: relative;
  height: 182px;
  background-color: #000;
  justify-content: center;
  align-items: center;
}

/* button css  */

.btn {
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffffc2;
  background-color: #343433;
  cursor: pointer;
}

.btn .btn-icon {
  width: 50%;
  height: 50%;
}

.btn.btn-left {
  position: absolute;
  left: 5px;
}

.btn.btn-right {
  position: absolute;
  right: 5px;
}

/* css for minicart */
.minicart-wrapper {
  width: calc(100% - 225px);
  height: 100%;
  color: #bbb;
  display: flex;
}

.minicart-wrapper .cart-item {
  width: calc(100% / 3);
  height: 100%;
}

.movie-detail {
  display: flex;
  justify-content: end;
}

.movie-detail .movie-info {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
}

.movie-detail .movie-info img {
  width: 50%;
  padding-left: 10px;
}

.seat-detail ul,
.total-price ul {
  padding-top: 20px;
  padding-left: 10px;
}

.seat-detail-item,
.price-detail-item {
  display: flex;
}

.seat-detail-item .label,
.price-detail-item .label {
  margin: 0;
  color: #bbb;
  font-size: 14px;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  margin-right: 10px;
}

.seat-detail-item div:last-child,
.price-detail-item div:last-child {
  font-weight: 500;
}
</style>
