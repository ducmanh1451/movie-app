<template>
  <div class="cart">
    <div :class="[{ 'btn-left': true }, buttons[0]]"></div>
    <div class="minicart-wrapper">
      <div class="cart-item movie-detail">
        <div class="movie-img">
          <img
            src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/thumbnail/dc33889b0f8b5da88052ef70de32f1cb/p/o/poster_payoff_godzilla_va_kong_3_1_.jpg"
            alt="GODZILLA X KONG: ĐẾ CHẾ MỚI"
          />
        </div>
        <div class="movie-info">
          <ul>
            <li>GODZILLA X KONG: ĐẾ CHẾ MỚI</li>
            <li>2D</li>
          </ul>
        </div>
      </div>
      <div class="cart-item seat-detail">
        <ul>
          <li class="seat-detail-item">
            <div class="label">Rạp</div>
            <div>CGV Hùng Vương Plaza</div>
          </li>
          <li class="seat-detail-item">
            <div class="label">Suất chiếu</div>
            <div>19:40, 05/04/2024</div>
          </li>
          <li class="seat-detail-item">
            <div class="label">Phòng chiếu</div>
            <div>Cinema 5</div>
          </li>
          <li class="seat-detail-item">
            <div class="label">Ghế</div>
            <div>A1, A2, A3, A4, A5, A6, A7, A8</div>
          </li>
        </ul>
      </div>
      <div class="cart-item total-price">
        <ul>
          <li class="price-detail-item">
            <div class="label">Tổng tiền:</div>
            <div>150,000 đ</div>
          </li>
        </ul>
      </div>
    </div>
    <div :class="[{ 'btn-right': true }, buttons[1]]"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps(['buttons'])
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
.btn-left,
.btn-right {
  float: none;
  width: 110px;
  display: inline-block;
  height: 110px;
  vertical-align: top;
  background: url(../assets/bg-cgv-button-process.png) no-repeat;
  cursor: pointer;
  position: absolute;
  top: 36px;
}
.btn-left {
  left: 5px;
}
.btn-right {
  right: 0px;
}

.btn-prev {
  background-position: -152px -441px;
}
.btn-payment {
  background-position: -152px -110px;
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
}
.movie-img,
.movie-info {
  width: 50%;
  height: 100%;
}
.movie-img {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.movie-img img {
  width: 74px;
  height: 108px;
  display: block;
}
.movie-info ul {
  padding-top: 20px;
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
  width: 75px;
  margin: 0;
  color: #bbb;
  font-size: 14px;
  max-width: 75px;
  min-width: 75px;
}
.seat-detail-item div:last-child,
.price-detail-item div:last-child {
  font-weight: 500;
}
</style>
