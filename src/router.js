import { createRouter, createWebHistory } from 'vue-router'
import CommunityTemplate from './views/CommunityTemplate.vue'
import Home from './views/Home.vue'
import Activities from './views/Activities.vue'
import Activity from './views/Activity.vue'
import Announcements from './views/Announcements.vue'
import Announcement from './views/Announcement.vue'
import Calendar from './views/Calendar.vue'

const routes = [
    {
        path: '/:communityId',
        component: CommunityTemplate,
        props: true,
        children: [
            {
                path: '',
                component: Home,
                props: true,
            },
            {
                path: 'activities',
                component: Activities,
                props: true,
            },
            {
                path: 'activities/tag/:tag',
                component: Activities,
                props: true
            },
            {
                path: 'activity/:id',
                component: Activity,
                props: true
            },
            {
                path: 'announcements',
                component: Announcements,
                props: true
            },
            {
                path: 'announcements/tag/:tag',
                component: Announcements,
                props: true
            },
            {
                path: 'announcement/:id',
                component: Announcement,
                props: true
            },
            {
                path: 'calendar',
                component: Calendar,
                props: true
            },
        ],
    },
]

export default createRouter({
    routes,
	history: createWebHistory(),
})