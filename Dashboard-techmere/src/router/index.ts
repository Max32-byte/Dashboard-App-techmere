import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        const { isAuthenticated } = useAuth()
        if (isAuthenticated.value) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      beforeEnter: (to, from, next) => {
        const { isAuthenticated } = useAuth()
        if (!isAuthenticated.value) {
          next({ name: 'login' })
        } else {
          next()
        }
      },
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
  ],
})

export default router
