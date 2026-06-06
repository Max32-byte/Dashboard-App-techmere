import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { authService } from '@/services/auth'

describe('AuthService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset auth state
    authService.logout()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('login', () => {
    it('should successfully login with valid credentials', () => {
      const result = authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(true)
      expect(result.message).toBe('Login successful')
      expect(result.user).toBeDefined()
      expect(result.user?.email).toBe('user@example.com')
      expect(result.user?.name).toBe('John Doe')
    })

    it('should fail with invalid email', () => {
      const result = authService.login({
        email: 'nonexistent@example.com',
        password: 'password123',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Email not found')
      expect(result.user).toBeUndefined()
    })

    it('should fail with incorrect password', () => {
      const result = authService.login({
        email: 'user@example.com',
        password: 'wrongpassword',
      })

      expect(result.success).toBe(false)
      expect(result.message).toBe('Incorrect password')
      expect(result.user).toBeUndefined()
    })

    it('should store user in localStorage on successful login', () => {
      authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      const storedUser = localStorage.getItem('currentUser')
      expect(storedUser).toBeDefined()

      const user = JSON.parse(storedUser!)
      expect(user.email).toBe('user@example.com')
      expect(user.name).toBe('John Doe')
    })

    it('should login with demo credentials', () => {
      const result = authService.login({
        email: 'demo@techmere.com',
        password: 'demo123',
      })

      expect(result.success).toBe(true)
      expect(result.user?.email).toBe('demo@techmere.com')
      expect(result.user?.name).toBe('Demo User')
    })
  })

  describe('logout', () => {
    it('should clear current user and localStorage on logout', () => {
      // First login
      authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      expect(authService.isAuthenticated()).toBe(true)

      // Then logout
      authService.logout()

      expect(authService.isAuthenticated()).toBe(false)
      expect(authService.getCurrentUser()).toBeNull()
      expect(localStorage.getItem('currentUser')).toBeNull()
    })
  })

  describe('getCurrentUser', () => {
    it('should return null when not authenticated', () => {
      expect(authService.getCurrentUser()).toBeNull()
    })

    it('should return current user after login', () => {
      authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      const user = authService.getCurrentUser()
      expect(user).toBeDefined()
      expect(user?.email).toBe('user@example.com')
    })
  })

  describe('isAuthenticated', () => {
    it('should return false when not authenticated', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('should return true after login', () => {
      authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      expect(authService.isAuthenticated()).toBe(true)
    })

    it('should return false after logout', () => {
      authService.login({
        email: 'user@example.com',
        password: 'password123',
      })

      expect(authService.isAuthenticated()).toBe(true)

      authService.logout()

      expect(authService.isAuthenticated()).toBe(false)
    })
  })
})
