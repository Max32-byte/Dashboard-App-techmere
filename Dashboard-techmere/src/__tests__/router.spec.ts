import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import { authService } from '@/services/auth'

describe('Router Guards', () => {
  beforeEach(() => {
    localStorage.clear()
    authService.logout()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should redirect unauthenticated users from /dashboard to /login', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
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

    router.beforeEach((to) => {
      const isAuthenticated = authService.isAuthenticated()
      const requiresAuth = to.meta.requiresAuth

      if (requiresAuth && !isAuthenticated) {
        return '/login'
      } else if (to.path === '/login' && isAuthenticated) {
        return '/dashboard'
      }
    })

    await router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('should allow authenticated users to access /dashboard', async () => {
    authService.login({
      email: 'user@example.com',
      password: 'password123',
    })

    const router = createRouter({
      history: createMemoryHistory(),
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

    router.beforeEach((to) => {
      const isAuthenticated = authService.isAuthenticated()
      const requiresAuth = to.meta.requiresAuth

      if (requiresAuth && !isAuthenticated) {
        return '/login'
      } else if (to.path === '/login' && isAuthenticated) {
        return '/dashboard'
      }
    })

    await router.push('/dashboard')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('should redirect authenticated users from /login to /dashboard', async () => {
    authService.login({
      email: 'user@example.com',
      password: 'password123',
    })

    const router = createRouter({
      history: createMemoryHistory(),
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

    router.beforeEach((to) => {
      const isAuthenticated = authService.isAuthenticated()
      const requiresAuth = to.meta.requiresAuth

      if (requiresAuth && !isAuthenticated) {
        return '/login'
      } else if (to.path === '/login' && isAuthenticated) {
        return '/dashboard'
      }
    })

    await router.push('/login')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })

  it('should redirect / to /login when not authenticated', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
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

    await router.push('/')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/login')
  })

  it('should redirect / to /dashboard when authenticated', async () => {
    authService.login({
      email: 'user@example.com',
      password: 'password123',
    })

    const router = createRouter({
      history: createMemoryHistory(),
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

    await router.push('/')
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/dashboard')
  })
})
