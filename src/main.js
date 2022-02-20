import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

createApp(App)
    .use(router)
    .use(store)
    .use(VCalendar, {})
    .mount('#app')