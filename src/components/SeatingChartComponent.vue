<template>
  <div class="seating-chart">
    <div class="screen"></div>
    <div v-if="seats.length">
      <div v-for="(seatRow, rowIndex) in seats" :key="rowIndex" class="row">
        <div
          v-for="(seat, seatIndex) in seatRow"
          :key="seatIndex"
          :class="[computeSeatClass(seat), { selected: seat.selected }]"
          @click="toggleSeatSelection(seat)"
        >
          <span :class="{ 'd-none': seat.display === 0 }"
            >{{ seat.row }}{{ String.fromCharCode(65 + seatIndex) }}</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="notice">
    <div class="icon-list">
      <div class="icon-item checked">Checked</div>
      <div class="icon-item occupied">Đã chọn</div>
    </div>
    <div class="icon-list">
      <div class="icon-item standard">Thường</div>
      <div class="icon-item vip">VIP</div>
    </div>
  </div>
  <TicketInfoComponent :buttons="buttons" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TicketInfoComponent from '../components/TicketInfoComponent.vue'

const buttons = ['btn-back','btn-prev']

// declare seats
const seats = ref<
  Array<Array<{ row: number; column: number; display: number; type: string; selected: boolean }>>
>([])

interface Seat {
  row: number
  column: number
  display: number
  type: string
  selected: boolean
}

// fake data
const rows = 10
const cols = 10
for (let i = 0; i < rows; i++) {
  let row = []
  for (let j = 0; j < cols; j++) {
    let display = j === 3 ? 0 : 1
    let type = i < 4 ? 'standard' : 'vip'
    row.push({ row: i + 1, column: j + 1, display: display, type: type, selected: false })
  }
  seats.value.push(row)
}
// computed
const computeSeatClass = (seat: Seat) => {
  const classes: { [key: string]: boolean } = {
    seat: true,
    'not-display': seat.display === 0
  }
  if (seat.display !== 0) {
    classes[`seat-${seat.type}`] = true
  }
  return classes
}
// click seat
const toggleSeatSelection = (seat: Seat) => {
  seat.selected = !seat.selected
}
</script>

<style scoped>
/* css seating chart */
.seating-chart .screen {
  width: 100%;
  height: 45px;
  margin: 40px auto 40px;
  text-align: center;
  background: url(../assets/bg-screen.png) no-repeat top center transparent;
  background-size: 100% auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.seat {
  width: 25px;
  height: 25px;
  margin: 3px;
}
.seat.seat-standard {
  border: 1px solid #01c73c;
}
.seat.seat-vip {
  border: 1px solid #f71708;
}
.seat.not-display {
  border: unset;
}
.seat.selected {
  background: #b11500;
  border-color: #b11500;
  color: #fff;
}
.seat:not(.not-display) span {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}
.d-none {
  display: none;
}
/* css notice */
.notice {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.notice .icon-list {
  width: 200px;
  display: flex;
  flex-direction: column;
}
.notice .icon-list:first-child {
  margin-left: 95px;
}
.notice .icon-list .icon-item::before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  margin: 0 5px 0 0;
}
.icon-item.checked::before {
  background-color: #b11500;
  border: 1px solid #b11500;
}
.icon-item.occupied::before {
  background-color: #bbb;
  border: 1px solid #bbb;
}
.icon-item.standard::before {
  border: 1px solid #01c73c;
}
.icon-item.vip::before {
  border: 1px solid #f71708;
}
</style>
