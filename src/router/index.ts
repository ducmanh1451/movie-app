import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UpcomingMoviePage from '../views/UpcomingMoviePage.vue'
import ShowingMoviePage from '../views/ShowingMoviePage.vue'
import NewsAndOffersPage from '../views/NewsAndOffersPage.vue'
import MovieDetailPage from '../views/MovieDetailPage.vue'
import BookingPage from '../views/BookingPage.vue'
import BookingSeatsPage from '../views/BookingSeatsPage.vue'
import PaymentPage from '../views/PaymentPage.vue'
import LoginRegisterPage from '../views/LoginRegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/showing-movie',
      name: 'showingMovie',
      component: ShowingMoviePage
    },
    {
      path: '/showing-movie/:movieName',
      name: 'showingMovieDetail',
      component: MovieDetailPage
    },
    {
      path: '/upcoming-movie',
      name: 'upcomingMovie',
      component: UpcomingMoviePage
    },
    {
      path: '/upcoming-movie/:movieName',
      name: 'upcomingMovieDetail',
      component: MovieDetailPage
    },
    {
      path: '/tin-tuc-va-uu-dai',
      name: 'newsAndOffers',
      component: NewsAndOffersPage
    },
    {
      path: '/booking',
      name: 'bookingTicket',
      component: BookingPage
    },
    {
      path: '/booking/seats',
      name: 'bookingSeats',
      component: BookingSeatsPage
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterPage
    }
  ]
})

export default router
