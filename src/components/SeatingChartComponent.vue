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
  <div class="notice">abc</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
</style>
