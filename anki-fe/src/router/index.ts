import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import StudyView from '@/views/StudyView.vue'
import EditCardView from '@/views/EditCardView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/about',
        name: 'About',
        component: AboutView
      },
      {
        path: '/study/:id',
        name: 'Study',
        component: StudyView
      },
      {
        path: '/edit/:id',
        name: 'Edit',
        component: EditCardView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
