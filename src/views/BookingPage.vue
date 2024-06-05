<template>
  <LoadingComponent :loading="isLoading"></LoadingComponent>
  <div id="booking">
    <BreadcrumbComponent :breadcrumb="breadcrumb" />
    <div class="container is-max-desktop pt-3 pb-3">
      <div class="card">
        <div class="card-body p-5">
          <div class="title">CHỌN THỜI GIAN VÀ ĐỊA ĐIỂM</div>
          <div class="calendar">
            <div class="calendar-item" v-for="(date, index) in dates" :key="index" @click="searchBooking(index, date)"
              :class="{ 'active': selectedIndex === index }">
              <span class="month">{{ date.month }}</span>
              <span class="day-name">{{ date.dayName }}</span>
              <strong class="day">{{ date.day }}</strong>
            </div>
          </div>
          <div class="location" v-if="bookings.length > 0 && !isLoading">
            <div class="location-item" v-for="booking in bookings">
              <span class="location-name">{{ booking['cinema_name'] }}</span>
              <span class="location-type">{{ booking['room_name'] }}</span>
              <div class="showtime">
                <a class="item" href="#" v-for="item in booking['times']"
                  @click.prevent="navigateToBookingSeats(item.booking_id, booking)">
                  {{ convertDateStringToTime(item.opening_start_time) }}
                </a>
              </div>
            </div>
          </div>
          <div class="location" v-else="bookings.length === 0 && !isLoading">
            Không có lịch chiếu
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { convertDateStringToTime } from "../helpers/date"
import BreadcrumbComponent from '../components/BreadcrumbComponent.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import { useBookingStore } from '../stores/useBookingStore'

// variables
const route = useRoute()
const router = useRouter()
const bookingStore = useBookingStore()
const bookings = ref<Array<{ cinema_id: string; cinema_name: string; room_id: string, room_name: string, opening_date: string, times: Array<{ opening_start_time: string, booking_id: string }> }>>([])
const isLoading = ref<boolean>(false)
let dates = ref<Array<{ day: string; month: string; dayName: string, fullDate: Date }>>([])
const breadcrumb = ref({
  title: 'Đặt vé',
  route: `${route.fullPath}`
})
const selectedIndex = ref<number | null>(null)

// mounted
onMounted(() => {
  generateDateList()
  if (dates.value.length > 0) {
    searchBooking(0, dates.value[0])
  }
  // reset booking_id in booking_data in state
  let newBookingData = bookingStore.bookingData
  newBookingData.booking_id = ''
  newBookingData.room_id = ''
  newBookingData.room_name = ''
  bookingStore.setBookingData(newBookingData)
})

// functions
// search bookings when select date
const searchBooking = async (index: number, date: { day: string; month: string; dayName: string, fullDate: Date }) => {
  try {
    isLoading.value = true
    selectedIndex.value = index
    const response = await axios.get('http://localhost:8001/api/v1/booking/search', {
      params: {
        movieId: bookingStore.bookingData.movie_id,
        date: date.fullDate.toISOString() // Chuyển ngày thành chuỗi ISO để truyền cho server
      }
    });
    // Xử lý dữ liệu trả về ở đây
    bookings.value = response.data.bookings
  } catch (error) {
    console.error('Error calling API:', error);
  }
  finally {
    isLoading.value = false // Kết thúc loading
  }
}

// create list date
const generateDateList = () => {
  const currentDate = new Date()
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  for (let i = 0; i < 10; i++) {
    const fullDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000)
    const day = ('0' + fullDate.getDate()).slice(-2) // Lấy ngày (định dạng 2 chữ số)
    const month = ('0' + (fullDate.getMonth() + 1)).slice(-2) // Lấy tháng (định dạng 2 chữ số)
    const dayName = daysOfWeek[fullDate.getDay()] // Lấy tên ngày tiếng Anh
    fullDate.setHours(0, 0, 0, 0);
    dates.value.push({ day, month, dayName, fullDate })
  }
}

// go to bookingSeat page when click button 
const navigateToBookingSeats = (booking_id: string, booking: any) => {
  let newBookingData = bookingStore.bookingData
  newBookingData.booking_id = booking_id
  newBookingData.room_id = booking.room_id
  newBookingData.room_name = booking.room_name
  bookingStore.setBookingData(newBookingData)
  router.push({ name: 'bookingSeats' })
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
}

.calendar {
  display: flex;
  flex-wrap: wrap;
}

.calendar-item {
  width: 80px;
  height: 50px;
  margin: 5px;
  position: relative;
  border: 2px solid #ccc;
  border-radius: 10%;
  cursor: pointer;
}

.calendar-item:hover,
.calendar-item.active {
  border-color: #000;
}

.calendar-item .day {
  color: #717171;
  font-size: 32px;
  line-height: 32px;
  font-weight: normal;
  position: absolute;
  right: 5px;
  bottom: 5px;
}

.calendar-item .month {
  position: absolute;
  top: 5px;
  left: 5px;
}

.calendar-item .day-name {
  position: absolute;
  top: 25px;
  left: 5px;
  font-size: 13px;
}

.location {
  padding-top: 15px;
}

.location-item {
  display: flex;
  flex-direction: column;
  padding: 15px 0px;
  border-top: 1px solid #000;
}

.location-item:last-child {
  border-bottom: 1px solid #000;
}

.location-item .location-name {
  color: #636363;
  font-weight: 400;
  font-family: Verdana, Arial, sans-serif;
  font-size: 18px;
}

.location-item .location-type {
  color: #222;
  font-family: Verdana, Arial, sans-serif;
  font-size: 14px;
}

.showtime {
  display: flex;
  margin-top: 5px;
}

.showtime .item {
  width: 130px;
  height: 30px;
  margin-right: 10px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
  color: var(--bulma-card-color);
}

.showtime .item:hover {
  border-color: #000;
}
</style>
