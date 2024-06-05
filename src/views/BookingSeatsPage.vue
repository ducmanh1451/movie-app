<template>
  <LoadingComponent :loading="isLoading"></LoadingComponent>
  <div id="booking-detail">
    <div class="container is-max-desktop pt-3 pb-3">
      <div class="card">
        <div class="card-body p-5">
          <div class="title">BOOKING ONLINE</div>
          <div v-if="booking" class="location-info">
            <span>{{ booking?.cinema_name }} | {{ booking?.room_name }} | Số ghế (96/96)</span>
            <span> {{ formatDateToDisplay(booking?.opening_start_time) }} : {{
              convertDateStringToTime(booking?.opening_start_time) }} - {{
                convertDateStringToTime(booking?.opening_end_time) }}</span>
          </div>
          <SeatingChartComponent :booking="booking" :seats="booking?.seats" :columns="booking?.columns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SeatingChartComponent from '../components/SeatingChartComponent.vue'
import axios from 'axios'
import LoadingComponent from '../components/LoadingComponent.vue'
import type { Booking } from "../helpers/types"
import { formatDateToDisplay, convertDateStringToTime } from "../helpers/date";
import { useBookingStore } from '../stores/useBookingStore'

// variables
const isLoading = ref<boolean>(false)
const booking = ref<Booking>()
const bookingStore = useBookingStore()

// mounted
onMounted(() => {
  if (bookingStore.bookingData.booking_id != '') {
    // call api
    getBookingInformation(bookingStore.bookingData.booking_id)
  }
  // reset seatsBooked in state
  bookingStore.resetSeats()
})

// functions
// get booking information
const getBookingInformation = async (bookingId: string) => {
  try {
    isLoading.value = true
    const response = await axios.get(`http://localhost:8001/api/v1/booking/find/${bookingId}`);
    booking.value = response.data.booking[0]
    // Xử lý dữ liệu trả về ở đây
  } catch (error) {
    console.error('Error calling API:', error);
  }
  finally {
    isLoading.value = false // Kết thúc loading
  }
}
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
