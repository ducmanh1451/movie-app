<template>
  <div class="seating-chart">
    <div class="screen"></div>
    <div v-if="props.booking?.seats" class="wrapper">
      <div class="main-seat" :style="{ '--column': props.booking?.columns }">
        <div v-for="(seat, rowIndex) in props.booking?.seats" :key="rowIndex"
          :class="[computedSeatClass(seat), { 'not-available': !seat.available }]" @click="toggleSeatSelection(seat)"
          :seatType="seat.type" :seatPrice="seat.price" :seatId="seat._id">
          <span :class="[{ 'd-none': seat.type == 3 }]">{{ String.fromCharCode(64 + seat.row) }}{{ seat.column }}
          </span>
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
  <TicketInfoComponent buttonLeft="btn-previous" buttonRight="btn-next">
  </TicketInfoComponent>
</template>

<script setup lang="ts">
import { defineProps, watch } from 'vue'
import TicketInfoComponent from '../components/TicketInfoComponent.vue'
import type { MovieRoomSeat } from "../helpers/types"
import { useBookingStore } from '../stores/useBookingStore'

// define props
const props = defineProps({
  seats: {
    type: Array<MovieRoomSeat>
  },
  columns: {
    type: Number
  },
  booking: {
    type: Object
  }
})

// variables
const bookingStore = useBookingStore()

// functions
// click seat
const toggleSeatSelection = (seat: MovieRoomSeat) => {
  if (bookingStore.seatsBooked.length >= 6) {
    alert('Chỉ được chọn tối đa 6 ghế')
    return
  }
  if (seat.available) {
    bookingStore.addSeat(seat)
  } else {
    bookingStore.removeSeat(seat)
  }
  seat.available = !seat.available
}

// watch
watch(
  () => props.booking,
  () => {
    if (!props.booking) {
      return
    }
  },
  { immediate: true },
)

// computed
const computedSeatClass = (seat: MovieRoomSeat) => {
  if (seat.type == 1) {
    return 'seat seat-standard'
  }
  if (seat.type == 2) {
    return 'seat seat-vip'
  }
  if (seat.type == 3) {
    return 'seat not-display'
  }
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

.wrapper {
  display: flex;
  justify-content: center;
}

.main-seat {
  display: grid;
  grid-template-columns: repeat(var(--column), auto);
}

.seat {
  width: 25px;
  height: 25px;
  margin: 3px;
  text-align: center;
}

.seat.seat-standard {
  border: 1px solid #01c73c;
}

.seat.seat-vip {
  border: 1px solid #f71708;
}

.seat.not-display {
  border: unset;
  pointer-events: none;
}

.seat.not-available {
  background: #b11500;
  border-color: #b11500;
  color: #fff;
}

.seat:not(.not-display) span {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
  font-size: 12px;
  line-height: 23px;
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
