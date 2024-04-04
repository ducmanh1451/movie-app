<template>
  <div id="booking">
    <div class="container is-max-desktop pt-3 pb-3">
      <div class="card">
        <div class="card-body p-5">
          <div class="title">CHỌN THỜI GIAN VÀ ĐỊA ĐIỂM</div>
          <div class="calendar">
            <div class="calendar-item" v-for="(date, index) in dates" :key="index">
              <span class="month">{{ date.month }}</span>
              <span class="day-name">{{ date.dayName }}</span>
              <strong class="day">{{ date.day }}</strong>
            </div>
          </div>
          <div class="location">
            <div class="location-item">
              <span class="location-name">CGV Hùng Vương Plaza</span>
              <span class="location-type">Rạp 2D</span>
              <div class="showtime">
                <div class="item">21:00 PM</div>
                <div class="item">22:00 PM</div>
                <div class="item">23:00 PM</div>
              </div>
            </div>
            <div class="location-item">
              <span class="location-name">CGV Hùng Vương Plaza</span>
              <span class="location-type">Rạp 2D</span>
              <div class="showtime">
                <div class="item">21:00 PM</div>
                <div class="item">22:00 PM</div>
                <div class="item">23:00 PM</div>
              </div>
            </div>
            <div class="location-item">
              <span class="location-name">CGV Hùng Vương Plaza</span>
              <span class="location-type">Rạp 2D</span>
              <div class="showtime">
                <div class="item">21:00 PM</div>
                <div class="item">22:00 PM</div>
                <div class="item">23:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
let dates = ref<Array<{ day: string; month: string; dayName: string }>>([])

onMounted(() => {
  generateDateList()
})

function generateDateList() {
  const currentDate = new Date()
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  for (let i = 0; i < 20; i++) {
    const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000)
    const day = ('0' + date.getDate()).slice(-2) // Lấy ngày (định dạng 2 chữ số)
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // Lấy tháng (định dạng 2 chữ số)
    const dayName = daysOfWeek[date.getDay()] // Lấy tên ngày tiếng Anh
    dates.value.push({ day, month, dayName })
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
.calendar-item:hover {
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
}
.showtime .item:hover {
  border-color: #000;
}
</style>
