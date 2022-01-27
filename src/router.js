import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Activities from './views/Activities.vue'
import Activity from './views/Activity.vue'
import Announcements from './views/Announcements.vue'
import Announcement from './views/Announcement.vue'
import Calendar from './views/Calendar.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
	{
		path: '/activities',
		component: Activities,
	},
	{
		path: '/activities/tag/:tag',
		component: Activities,
        props: true
	},
	{
		path: '/activity/:id',
		component: Activity,
        props: true
	},
    {
        path: '/announcements',
        component: Announcements
    },
    {
        path: '/announcements/tag/:tag',
        component: Announcements,
        props: true
    },
    {
        path: '/announcement/:id',
        component: Announcement,
        props: true
    },
    {
        path: '/calendar',
        component: Calendar
    },
]

export default createRouter({
    routes,
	history: createWebHistory(),
})