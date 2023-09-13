import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createMetaManager } from 'vue-meta'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

createApp(App)
    .use(router)
    .use(store)
    .use(createMetaManager())
    .use(VCalendar, {})
    .mount('#app')