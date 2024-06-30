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
      <!-- Login form -->
      <div class="form-login" v-if="isLoginActive">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email" v-model="loginData.email" />
          </div>
        </div>
        <div class="field">
          <label class="label">Mật khẩu</label>
          <div class="control">
            <input class="input" type="password" placeholder="Mật khẩu" v-model="loginData.password" />
          </div>
        </div>
        <div class="button" @click="validateLoginForm">Đăng nhập</div>
      </div>
      <!-- Register form -->
      <div class="form-register" v-if="!isLoginActive">
        <div class="field">
          <label class="label required">Tên</label>
          <div class="control">
            <input class="input" type="text" placeholder="Tên" v-model="registerData.customer_name" />
          </div>
        </div>
        <div class="field">
          <div class="d-flex">
            <div class="column mr-3 p-0">
              <label class="label">Số điện thoại</label>
              <div class="control">
                <input class="input" type="text" placeholder="Số điện thoại" v-model="registerData.phone_number" />
              </div>
            </div>
            <div class="column mr-3 p-0">
              <label class="label">Ngày sinh</label>
              <div class="control">
                <input class="input" type="date" v-model="registerData.birthday" />
              </div>
            </div>
            <div class="column p-0">
              <label class="label">Giới tính</label>
              <div class="control select">
                <select v-model="registerData.gender">
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label required">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="Email" v-model="registerData.email" />
          </div>
        </div>
        <div class="field">
          <label class="label required">Mật khẩu</label>
          <div class="control">
            <input class="input" type="password" placeholder="Mật khẩu" v-model="registerData.password" />
          </div>
        </div>
        <div class="field">
          <label class="label">Địa chỉ</label>
          <div class="control">
            <input class="input" type="text" v-model="registerData.address" />
          </div>
        </div>
        <div class="button" @click="validateRegisterForm">Đăng ký</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormRegister, FormLogin } from '../helpers/types'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/useAuthStore'
import { useRouter } from 'vue-router'

// variables
const isLoginActive = ref(true)
const registerData = ref<FormRegister>({
  customer_name: '',
  phone_number: '',
  birthday: null,
  gender: 0,
  email: '',
  password: '',
  address: '',
})
const loginData = ref<FormLogin>({
  email: '',
  password: '',
})
const authStore = useAuthStore()
const router = useRouter()

// functions
// switch tab login and register
const switchTab = (isLogin: boolean) => {
  isLoginActive.value = isLogin
}

// click login
const login = async (data: FormLogin) => {
  // Logic để xử lý đăng nhập
  try {
    const response = await axios.post('http://localhost:8002/api/v1/auth-customer/login', data)
    if (response.status == 200) {
      authStore.login(response.data.payload, response.data.accessToken, response.data.refreshToken)
      // go to home page after login success
      router.push({ name: 'home' })
    }
  } catch (error: any) {
    if (error.response.data.error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.error}`,
        showConfirmButton: true,
        confirmButtonText: 'Đóng'
      });
    }
  }
}


// validate login form
const validateLoginForm = () => {
  // Kiểm tra trường email không được để trống và phải là chuẩn email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!loginData.value.email || !loginData.value.email.match(emailRegex)) {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập email hợp lệ',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Kiểm tra trường mật khẩu không được để trống
  if (!loginData.value.password) {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập mật khẩu',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Nếu thông tin nhập vào hợp lệ, có thể gửi form đăng ký điều này
  login(loginData.value)
}


// click register
const register = async (data: FormRegister) => {
  // Logic để xử lý đăng ký
  try {
    const response = await axios.post('http://localhost:8002/api/v1/auth-customer/register', data)
    if (response.status == 200) {
      Swal.fire({
        icon: 'success',
        title: 'Tạo mới thành công',
        showConfirmButton: true,
        confirmButtonText: 'Đóng'
      }).then((result) => {
        if (result.isConfirmed) {
          switchTab(true)
          clearFormRegister()
        }
      });
    }
  } catch (error: any) {
    if (error.response.data.error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.error}`,
        showConfirmButton: true,
        confirmButtonText: 'Đóng'
      });
    }
  }
}

// clear form register
const clearFormRegister = () => {
  registerData.value.customer_name = ''
  registerData.value.phone_number = ''
  registerData.value.birthday = null
  registerData.value.gender = 0
  registerData.value.email = ''
  registerData.value.password = ''
  registerData.value.address = ''
}

// validate
const validateRegisterForm = () => {
  // Kiểm tra trường tên không được để trống
  if (!registerData.value.customer_name) {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập tên của bạn',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Kiểm tra trường số điện thoại
  const phoneRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/
  if (!registerData.value.phone_number.match(phoneRegex) && registerData.value.phone_number != '') {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập số điện thoại hợp lệ (VD: 0987654321)',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Kiểm tra trường email không được để trống và phải là chuẩn email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!registerData.value.email || !registerData.value.email.match(emailRegex)) {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập email hợp lệ',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Kiểm tra trường mật khẩu không được để trống
  if (!registerData.value.password) {
    Swal.fire({
      icon: 'error',
      title: 'Vui lòng nhập mật khẩu',
      showConfirmButton: true,
      confirmButtonText: 'Đóng'
    });
    return
  }
  // Nếu thông tin nhập vào hợp lệ, có thể gửi form đăng ký điều này
  register(registerData.value)
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

div .button {
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
