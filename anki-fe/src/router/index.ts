import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import GroupsView from '@/views/GroupsView.vue'
import AddView from '@/views/AddView.vue'
import StudyView from '@/views/StudyView.vue'
import EditCardView from '@/views/EditCardView.vue'
import AuthAdminView from '@/views/AuthAdminView.vue'
import UserAccountView from '@/views/UserAccountView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Groups',
        component: GroupsView
      },
      {
        path: '/add',
        name: 'Add',
        component: AddView
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
      },
      {
        path: 'register-admin',
        name: 'RegisterAdmin',
        component: AuthAdminView
      },
      {
        path: 'account',
        name: 'Account',
        component: UserAccountView
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
