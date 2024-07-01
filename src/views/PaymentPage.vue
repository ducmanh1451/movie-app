<template>
  <div id="payment">
    <div class="container is-max-desktop pt-3 pb-3">
      <div class="card">
        <div class="card-body p-5">
          <div class="title">THANH TOÁN</div>
          <div class="wrapper">
            <div class="left-content">
              <!-- step 1 -->
              <div class="step">
                <div class="step-title">
                  <span class="step-payment">Bước 1: </span>
                  <span>GIẢM GIÁ</span>
                </div>
                <div class="step-content">
                  <ul class="methods">
                    <li class="method">
                      <span class="method-name">Tích điểm</span>
                    </li>
                    <li class="method">
                      <span class="method-name">Mã giảm giá</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- step 2 -->
              <div class="step">
                <div class="step-title">
                  <span class="step-payment">Bước 2: </span>
                  <span>CHỌN HÌNH THỨC THANH TOÁN</span>
                </div>
                <div class="step-content">
                  <ul class="methods">
                    <li class="method">
                      <input id="method-vnpay" type="radio" name="payment-method" />
                      <label for="method-vnpay">
                        <span class="method-icon" style="background-image: url('src/assets/vnpay_newlogo.png')"></span>
                        <span class="method-name">VNPAY</span>
                      </label>
                    </li>
                    <li class="method">
                      <input id="method-zalopay" type="radio" name="payment-method" />
                      <label for="method-zalopay">
                        <span class="method-icon" style="background-image: url('src/assets/zalopay_logo.png')"></span>
                        <span class="method-name">ZALOPAY</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="right-content">
              <div class="cart-items table-total">
                <table>
                  <thead>
                    <tr>
                      <th colspan="2">Tổng cộng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>VIP</td>
                      <td>
                        <span class="price">{{ bookingStore.getSeatsNameAndTotalPrice.totalPrice }}</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2"><span class="price">{{ bookingStore.getSeatsNameAndTotalPrice.totalPrice }}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="cart-items mt-5 table-discount">
                <table>
                  <thead>
                    <tr>
                      <th>Khuyến mãi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td><span class="price">0,00&nbsp;đ</span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="cart-items mt-5 table-payment">
                <table>
                  <thead>
                    <tr>
                      <th colspan="2">Tổng số tiền thanh toán</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <td colspan="2"><span class="price">{{ bookingStore.getSeatsNameAndTotalPrice.totalPrice }}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <TicketInfoComponent buttonLeft="btn-previous" buttonRight="btn-payment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TicketInfoComponent from '../components/TicketInfoComponent.vue'
import { useBookingStore } from '../stores/useBookingStore'

// variables
const bookingStore = useBookingStore()
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

.wrapper {
  display: flex;
}

.left-content {
  width: 70%;
}

.right-content {
  width: 30%;
}

.step {
  width: 90%;
}

.step .step-title {
  background: #bcbdc0;
  border: 2px solid #9d9fa2;
  padding: 5px 0px;
}

.step .step-title .step-payment {
  text-transform: none;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  font-family: Verdana, Arial, sans-serif;
  margin-left: 20px;
}

.step .step-title span {
  color: #231f20;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: bold;
}

ul.methods li.method {
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 0;
  background-color: #fff1ce;
  padding-left: 20px;
}

ul.methods li.method .method-icon {
  background-position: 50% 50%;
  background-size: 100% 100%;
  width: 37px;
  height: 37px;
  display: inline-block;
  /* background-image: url(../assets/vnpay_newlogo.png); */
  position: absolute;
  top: 5px;
  left: 40px;
}

ul.methods li.method label {
  padding-left: 55px;
  height: 100%;
  line-height: 45px;
}

.right-content .cart-items table {
  width: 100%;
  font-family: Verdana, Arial, sans-serif;
  color: #222;
  font-size: 14px;
  line-height: 18px;
}

.right-content .cart-items table thead,
.right-content .cart-items table tfoot {
  font-weight: bold;
  text-align: center;
}

.right-content .cart-items table tr {
  border: 1px solid #d4d3c9;
  background: #fff1ce;
}

.right-content .cart-items table tfoot tr {
  background: #d0cece;
}

.right-content .cart-items table th,
.right-content .cart-items table td {
  padding: 10px;
}

.right-content .cart-items.table-payment table thead tr {
  background: #e71a0f;
}

.right-content .cart-items.table-payment table thead tr th {
  color: #fff;
}
</style>
