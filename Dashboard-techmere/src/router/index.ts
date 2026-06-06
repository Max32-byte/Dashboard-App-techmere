import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import { authService } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return authService.isAuthenticated() ? '/dashboard' : '/login'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { requiresAuth: true },
    },
  ],
})

// Route guard to protect authenticated routes
router.beforeEach(
  (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const isAuthenticated = authService.isAuthenticated()
    const requiresAuth = to.meta.requiresAuth

    if (requiresAuth && !isAuthenticated) {
      // Redirect to login if trying to access protected route without auth
      next('/login')
    } else if (to.path === '/login' && isAuthenticated) {
      // Redirect to dashboard if trying to access login while authenticated
      next('/dashboard')
    } else {
      next()
    }
  }
)

export default router

