import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UpcomingMoviePage from '../views/UpcomingMoviePage.vue'
import ShowingMoviePage from '../views/ShowingMoviePage.vue'
// import NewsAndOffersPage from '../views/NewsAndOffersPage.vue'
import DetailMoviePage from '../views/DetailMoviePage.vue'
import BookingPage from '../views/BookingPage.vue'
import BookingSeatsPage from '../views/BookingSeatsPage.vue'
import PaymentPage from '../views/PaymentPage.vue'
import AuthPage from '../views/AuthPage.vue'
import CustomerPage from '../views/CustomerPage.vue'
import Authentication from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomePage
    // },
    {
      path: '/',
      name: 'home',
      component: ShowingMoviePage
    },
    {
      path: '/showing-movie',
      name: 'showingMovie',
      component: ShowingMoviePage
    },
    // {
    //   path: '/showing-movie/:movieName',
    //   name: 'showingMovieDetail',
    //   component: MovieDetailPage
    // },
    {
      path: '/upcoming-movie',
      name: 'upcomingMovie',
      component: UpcomingMoviePage
    },
    // {
    //   path: '/upcoming-movie/:movieName',
    //   name: 'upcomingMovieDetail',
    //   component: MovieDetailPage
    // },
    {
      path: '/detail-movie',
      name: 'detailMovie',
      component: DetailMoviePage
    },
    // {
    //   path: '/tin-tuc-va-uu-dai',
    //   name: 'newsAndOffers',
    //   component: NewsAndOffersPage
    // },
    {
      path: '/booking',
      name: 'bookingTicket',
      component: BookingPage,
      beforeEnter: Authentication
    },
    {
      path: '/booking/seats',
      name: 'bookingSeats',
      component: BookingSeatsPage,
      beforeEnter: Authentication
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentPage,
      beforeEnter: Authentication
    },
    {
      path: '/login',
      name: 'login',
      component: AuthPage
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerPage,
      beforeEnter: Authentication
    }
  ]
})

export default router
