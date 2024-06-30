// import type {
//   NavigationGuardNext,
//   RouteLocationNormalized,
//   RouteLocationNormalizedLoaded
// } from 'vue-router'
// import { useAuthStore } from '../stores/useAuthStore'
// import axios from 'axios'

// export default async function Authentication(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalizedLoaded,
//   next: NavigationGuardNext
// ): Promise<void> {
//   const authStore = useAuthStore()
//   if (authStore.accessToken == '') {
//     // Nếu chưa đăng nhập, chuyển hướng sang trang đăng nhập
//     next({
//       name: 'login'
//     })
//   } else {
//     try {
//       // Verify access token
//       const response = await axios.post(
//         'http://localhost:8002/api/v1/auth-customer/verify-access-token',
//         {
//           access_token: authStore.accessToken
//         }
//       )
//       if (response.status === 200) {
//         // Token hợp lệ, cho phép tiếp tục
//         next()
//       }
//     } catch (error: any) {
//       // Nếu access token đã hết hạn (status = 403)
//       if (error.response.status === 403) {
//         try {
//           // Gọi API refresh access token dựa trên refresh token
//           const refreshTokenResponse = await axios.post(
//             'http://localhost:8002/api/v1/auth-customer/refresh-access-token',
//             {
//               customer_id: authStore.customerData.customer_id,
//               refresh_token: authStore.refreshToken
//             }
//           )
//           if (refreshTokenResponse.status === 200 && refreshTokenResponse.data.accessToken) {
//             // Cập nhật access token mới và thử lại
//             authStore.accessToken = refreshTokenResponse.data.accessToken
//             next()
//           } else {
//             // Không thể cập nhật access token, chuyển hướng sang trang đăng nhập
//             authStore.logout()
//             next({ name: 'login' })
//           }
//         } catch (refreshTokenError) {
//           // Có lỗi khi gọi API refresh token, chuyển hướng sang trang đăng nhập
//           authStore.logout()
//           next({ name: 'login' })
//         }
//       } else {
//         // Có lỗi xảy ra khi xác thực access token, chuyển hướng sang trang đăng nhập
//         authStore.logout()
//         next({ name: 'login' })
//       }
//     }
//   }
// }

import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded
} from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

export default async function Authentication(
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext
): Promise<void> {
  const authStore = useAuthStore()
  if (authStore.accessToken == '') {
    // Nếu chưa đăng nhập, chuyển hướng sang trang đăng nhập
    next({
      name: 'login'
    })
  } else {
    next()
  }
}
