<template>
  <div class="auth-container">
    <div class="tabs">
      <button class="tab" :class="{ active: isLoginActive }" @click="switchTab(true)">
        Đăng Nhập
      </button>
      <button class="tab" :class="{ active: !isLoginActive }" @click="switchTab(false)">
        Đăng Ký
      </button>
    </div>
    <div class="form-container">
      <form class="form-login" v-if="isLoginActive" @submit.prevent="login">
        <div class="field">
          <label class="label">Email hoặc số điện thoại</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email hoặc số điện thoại" />
          </div>
        </div>
        <div class="field">
          <label class="label">Mật khẩu</label>
          <div class="control">
            <input class="input" type="password" placeholder="Mật khẩu" />
          </div>
        </div>
        <div class="button">Đăng nhập</div>
      </form>

      <form class="form-register" v-else @submit.prevent="register">
        <div class="field">
          <label class="label required">Tên</label>
          <div class="control">
            <input class="input" type="text" placeholder="Tên" />
          </div>
        </div>
        <div class="field">
          <label class="label required">Số điện thoại</label>
          <div class="control">
            <input class="input" type="text" placeholder="Số điện thoại" />
          </div>
        </div>
        <div class="field">
          <label class="label required">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email" />
          </div>
        </div>
        <div class="field">
          <label class="label required">Mật khẩu</label>
          <div class="control">
            <input class="input" type="password" placeholder="Mật khẩu" />
          </div>
        </div>
        <div class="field">
          <div class="d-flex">
            <div class="birthday mr-3">
              <label class="label required">Ngày sinh</label>
              <div class="select mr-3">
                <select>
                  <option value="0">Ngày</option>
                </select>
              </div>
              <div class="select mr-3">
                <select>
                  <option value="0">Tháng</option>
                </select>
              </div>
              <div class="select">
                <select>
                  <option value="0">Năm</option>
                </select>
              </div>
            </div>
            <div class="gender">
              <label class="label required">Giới tính</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" name="gender" />
                  Nam
                </label>
                <label class="radio">
                  <input type="radio" name="gender" />
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label required">Khu vực</label>
          <div class="select is-fullwidth">
            <select>
              <option value="0">Khu vực</option>
            </select>
          </div>
        </div>
        <div class="button">Đăng ký</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoginActive = ref(true)

const switchTab = (isLogin: boolean) => {
  isLoginActive.value = isLogin
}

const login = () => {
  // Logic để xử lý đăng nhập
}

const register = () => {
  // Logic để xử lý đăng ký
}
</script>

<style scoped>
.auth-container {
  width: 500px;
  margin: auto;
  min-height: calc(100vh - 202px);
  padding-top: 20px;
}
.tabs {
  display: flex;
  justify-content: space-around;
  background-color: #e71a0f;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  text-align: left;
}
.tab {
  padding: 10px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  font-weight: 500;
}
.tab.active {
  border-bottom: 3px solid #fff;
}
.form-container {
  margin-top: 20px;
}
form .button {
  width: 100%;
  background-color: #e71a0f;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}
.form-register label.required {
  position: relative;
}
.form-register label.required::after {
  content: '*';
  width: 24px;
  height: 24px;
  display: inline-block;
  position: absolute;
  top: 3px;
  vertical-align: middle;
  margin-left: 3px;
  color: #e71a0f;
}
.form-register .d-flex {
  display: flex;
}
.form-register .birthday,
.form-register .gender {
  width: fit-content;
}
</style>
