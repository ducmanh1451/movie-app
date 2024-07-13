<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore'
import type { Customer, BookingHistory } from "../helpers/types"
import { formatDateToDisplay, formatDatetimeToDisplay } from "../helpers/date"
import LoadingComponent from '../components/LoadingComponent.vue'
import Swal from 'sweetalert2'

// call api
onMounted(async () => {
    try {
        isLoading.value = true
        const response = await axios.get(`http://localhost:8003/api/v1/user/customer/${authStore.customerData.customer_id}`, {
            headers: {
                Authorization: `${authStore.accessToken}`
            }
        });
        customer.value = response.data.payload[0]
        customerEdit.value = { ...response.data.payload[0] }
        customerEdit.value.is_change_password = false
        customerEdit.value.new_password = ''
        isLoading.value = false
    } catch (error: any) {
        if (error.response && error.response.status === 403) {
            try {
                await authStore.refreshAccessToken()
                const retryResponse = await axios.get(`http://localhost:8003/api/v1/user/customer/${authStore.customerData.customer_id}`, {
                    headers: {
                        Authorization: `${authStore.accessToken}`
                    },
                })
                customer.value = retryResponse.data.payload[0]
                customerEdit.value = { ...retryResponse.data.payload[0] }
                customerEdit.value.is_change_password = false
                customerEdit.value.new_password = ''
            } catch (retryError: any) {
                console.log('Error retrying API get customer info:', retryError)
            }
        }
        console.log('Error calling API get customer info:', error)
        isLoading.value = false
    }
})
const customer = ref<Customer | null>(null)
const customerEdit = ref<Customer>({
    _id: '',
    customer_name: '',
    phone_number: '',
    birthday: '',
    gender: 0,
    email: '',
    password: '',
    address: '',
    is_change_password: false,
    new_password: ''
})
const isLoading = ref<boolean>(false)
const authStore = useAuthStore()
const tabs = [
    { id: 1, label: 'Thông tin chung' },
    { id: 2, label: 'Chi tiết tài khoản' },
    { id: 3, label: 'Lịch sử' }
]
const selectedTab = ref(tabs[0])
const selectTab = (tab: { id: number, label: string }) => {
    selectedTab.value = tab;
}
const updateCustomerInfo = async () => {
    if (validateUpdateCustomer()) {
        // call api
        try {
            isLoading.value = true
            const response = await axios.put(`http://localhost:8003/api/v1/user/customer/${customerEdit.value._id}`, customerEdit.value, {
                headers: {
                    Authorization: `${authStore.accessToken}`
                },
            })
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thông tin thành công',
                    showConfirmButton: true,
                    confirmButtonText: 'Đóng'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload()
                    }
                });
            }
            isLoading.value = false
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error,
                    showConfirmButton: true,
                    confirmButtonText: 'Đóng'
                });
            }
            if (error.response && error.response.status === 403) {
                try {
                    await authStore.refreshAccessToken()
                    const retryResponse = await axios.put(`http://localhost:8003/api/v1/user/customer/${customerEdit.value._id}`, customerEdit.value, {
                        headers: {
                            Authorization: `${authStore.accessToken}`
                        },
                    })
                    if (retryResponse.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cập nhật thông tin thành công',
                            showConfirmButton: true,
                            confirmButtonText: 'Đóng'
                        }).then((result) => {
                            if (result.isConfirmed) {

                            }
                        });
                    }
                } catch (retryError: any) {
                    console.log('Error retrying API update customer info:', retryError)
                }
            }
            console.log('Error calling API update customer info:', error)
            isLoading.value = false
        }
    }
}

const validateUpdateCustomer = () => {
    // Kiểm tra trường tên không được để trống
    if (!customerEdit.value.customer_name) {
        Swal.fire({
            icon: 'error',
            title: 'Tên không được để trống',
            showConfirmButton: true,
            confirmButtonText: 'Đóng'
        });
        return false
    }
    // Kiểm tra trường email không được để trống
    if (!customerEdit.value.email) {
        Swal.fire({
            icon: 'error',
            title: 'Email không được để trống',
            showConfirmButton: true,
            confirmButtonText: 'Đóng'
        });
        return false
    }
    // Kiểm tra trường số điện thoại
    const phoneRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/
    if (!customerEdit.value.phone_number.match(phoneRegex) && customerEdit.value.phone_number != '') {
        Swal.fire({
            icon: 'error',
            title: 'Số điện thoại không hợp lệ',
            showConfirmButton: true,
            confirmButtonText: 'Đóng'
        });
        return false
    }
    // Kiểm tra trường email không được để trống và phải là chuẩn email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!customerEdit.value.email || !customerEdit.value.email.match(emailRegex)) {
        Swal.fire({
            icon: 'error',
            title: 'Email không hợp lệ',
            showConfirmButton: true,
            confirmButtonText: 'Đóng'
        });
        return false
    }
    // Kiểm tra mật khẩu mới không được để trống
    if (customerEdit.value.is_change_password && customerEdit.value.new_password == '') {
        Swal.fire({
            icon: 'error',
            title: 'Mật khẩu mới không được để trống',
            showConfirmButton: true,
            confirmButtonText: 'Đóng'
        });
        return false
    }
    // Hợp lệ
    return true
}

const calculateTotalPrice = (seats: any) => {
    const totalPrice = seats.reduce((total: number, seat: any) => total + seat.price, 0);
    return totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

</script>

<template>
    <LoadingComponent :loading="isLoading"></LoadingComponent>
    <div id="customer-tab">
        <div class="main container is-fullhd">
            <div class="wrapper">
                <div class="col-left">
                    <div class="item title">Tài khoản</div>
                    <div v-for="tab in tabs" :key="tab.id" class="item tab"
                        :class="{ 'selected': selectedTab.id === tab.id }" @click="selectTab(tab)">
                        {{ tab.label }}
                    </div>
                </div>
                <div class="col-right">
                    <!-- tab main info -->
                    <div class="main-info-tab" v-if="selectedTab.id === 1">
                        <div class="item title">Thông tin chung</div>
                        <div class="welcome-msg">
                            <strong>Xin chào {{ customer?.customer_name }},</strong>
                            <span>Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của mình.</span>
                        </div>
                        <div class="account-info">
                            <strong class="main-title">Thông tin tài khoản</strong>
                            <div class="box-info">
                                <span class="main-info">Tên: {{ customer?.customer_name }}</span>
                                <span class="main-info">Email: {{ customer?.email }}</span>
                                <span class="main-info">Điện thoại: {{ customer?.phone_number }}</span>
                            </div>
                            <button class="change-info-btn"
                                @click="selectTab({ id: 2, label: 'Chi tiết tài khoản' })">Thay
                                đổi</button>
                        </div>
                    </div>
                    <div class="detail-info-tab" v-else-if="selectedTab.id === 2">
                        <div class="item title">Thay đổi thông tin</div>
                        <div class="form-info pl-3 pr-3">
                            <div class="columns">
                                <div class="column p-2">
                                    <div class="field">
                                        <label class="label required">Tên</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="customerEdit.customer_name" />
                                        </div>
                                    </div>
                                </div>
                                <div class="column p-2">
                                    <div class="field">
                                        <label class="label">Số điện thoại</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="customerEdit.phone_number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column p-2">
                                    <div class="field">
                                        <label class="label required">Email</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="customerEdit.email" />
                                        </div>
                                    </div>
                                </div>
                                <div class="column p-2 is-one-quarter">
                                    <div class="field">
                                        <label class="label">Ngày sinh</label>
                                        <div class="control">
                                            <span>{{ formatDateToDisplay(customerEdit.birthday) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column p-2 is-one-quarter">
                                    <div class="field">
                                        <label class="label">Giới tính</label>
                                        <div class="control">
                                            <span v-if="customerEdit.gender == 0">Nam</span>
                                            <span v-else-if="customerEdit.gender == 1">Nữ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column p-2">
                                    <div class="field">
                                        <label class="label">Địa chỉ</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="customerEdit.address" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column p-2 is-two-fifths">
                                    <div class="field">
                                        <label class="label">&nbsp;</label>
                                        <label class="checkbox">
                                            <input type="checkbox" v-model="customerEdit.is_change_password" />
                                            Tôi muốn thay đổi mật khẩu
                                        </label>
                                    </div>
                                </div>
                                <div class="column p-2">
                                    <div class="field">
                                        <label class="label required">Mật khẩu mới</label>
                                        <div class="control">
                                            <input class="input" type="password"
                                                :disabled="!customerEdit.is_change_password"
                                                v-model="customerEdit.new_password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="is-flex">
                                <button class="button is-danger has-text-white" @click="updateCustomerInfo">Lưu
                                    lại</button>
                            </div>
                        </div>
                    </div>
                    <div class="history-tab" v-else-if="selectedTab.id === 3">
                        <div class="item title">Lịch sử giao dịch</div>
                        <div>
                            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th class="has-text-centered">Rạp</th>
                                        <th class="has-text-centered">Phòng</th>
                                        <th class="has-text-centered">Phim</th>
                                        <th class="has-text-centered">Thời gian<br>bắt đầu</th>
                                        <th class="has-text-centered">Thời gian<br>kết thúc</th>
                                        <th class="has-text-centered">Ngày<br>đặt vé</th>
                                        <th class="has-text-centered">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="customer?.booking_history" v-for="(booking) in customer.booking_history">
                                        <td>{{ booking.cinema_name ?? '' }}</td>
                                        <td>{{ booking.room_name ?? '' }}</td>
                                        <td>{{ booking.movie_name ?? '' }}</td>
                                        <td>{{ formatDatetimeToDisplay(booking.opening_start_time) ?? '' }}</td>
                                        <td>{{ formatDatetimeToDisplay(booking.opening_end_time) ?? '' }}</td>
                                        <td>{{ formatDatetimeToDisplay(booking.booking_date) ?? '' }}</td>
                                        <td>{{ calculateTotalPrice(booking.seats) }}</td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="7">Không có dữ liệu</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main.container {
    height: calc(100vh - 202px);
}

.wrapper {
    position: absolute;
    top: 0;
    display: flex;
    width: 100%;
    padding-top: 25px;
}

/* css left */
.col-left {
    /* height: 350px; */
    padding-right: 5px;
}

.col-left .item {
    margin-bottom: 5px;
    width: 235px;
}

.col-left .title {
    font-size: 24px;
    color: #e71a0f;
    text-transform: uppercase;
    font-weight: 600;
    padding: 5px 0px;
}

.col-left .tab {
    background: url(../assets/ribon_left-ccc.png) no-repeat scroll left center #ccc;
    color: #666;
    padding: 5px 10px 5px 20px;
    cursor: pointer;
}

.col-left .tab.selected {
    background: url(../assets/ribon_left.png) no-repeat scroll left center #e71a0f;
    color: #fff;
}

/* css right */
.col-right {
    width: calc(100% - 235px);
    /* height: 350px; */
    padding: 0 10px;
}

.col-right .title {
    background-color: #222;
    color: #fff;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    margin-bottom: 5px;
    padding: 5px 0px;
}

/* css tab main-info */
.main-info-tab .welcome-msg {
    display: flex;
    flex-direction: column;
}

.main-info-tab .account-info {
    padding: 10px 0;
}

.main-info-tab .account-info .main-title {
    border-bottom: 1px solid #ccc;
    width: 100%;
    display: block;
    padding-bottom: 10px;
}

.main-info-tab .account-info .box-info {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
}

.main-info-tab .account-info .main-info {
    color: gray;
}

.main-info-tab .account-info .change-info-btn {
    font-size: 12px;
    background-color: #9d9b9b;
    color: white;
    padding: 3px 5px;
    margin-top: 5px;
    min-width: 85px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* end css tab main-info */

.form-info label.required {
    position: relative;
}

.form-info label.required::after {
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

.has-text-centered {
    vertical-align: middle;
}
</style>
