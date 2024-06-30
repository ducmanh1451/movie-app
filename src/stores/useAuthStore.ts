import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    customerData: JSON.parse(localStorage.getItem('customerData') || '{}') || {
      customer_id: '',
      email: '',
      customer_name: ''
    },
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  }),
  actions: {
    login(
      customerData: {
        customer_id: string
        email: string
        customer_name: string
      },
      accessToken: string,
      refreshToken: string
    ) {
      this.customerData = customerData
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      localStorage.setItem('customerData', JSON.stringify(customerData))
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    },
    logout() {
      this.customerData = {}
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('customerData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
    async refreshAccessToken() {
      try {
        const response = await axios.post(
          'http://localhost:8002/api/v1/auth-customer/refresh-access-token',
          {
            customer_id: this.customerData.customer_id,
            refresh_token: this.refreshToken
          }
        )
        const newAccessToken = response.data.accessToken
        this.accessToken = newAccessToken
        localStorage.setItem('accessToken', newAccessToken)
      } catch (error) {
        console.error('Error refreshing token:', error)
      }
    }
  },
  getters: {
    // Các getters có thể được thêm vào đây để truy cập và sử dụng trong các component khác
  }
})
