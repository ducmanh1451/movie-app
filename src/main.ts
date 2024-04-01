// import bulma
import 'bulma/css/bulma.min.css'
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css'
// import common css
import './assets/common.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
