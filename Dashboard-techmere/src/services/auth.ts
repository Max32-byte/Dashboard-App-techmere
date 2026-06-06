interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    email: string
    name: string
  }
}

interface User {
  id: string
  email: string
  name: string
}

// Simple in-memory user storage for demo purposes
// In a real application, this would communicate with a backend API
const users: { [key: string]: { password: string; name: string } } = {
  'user@example.com': {
    password: 'password123',
    name: 'John Doe',
  },
  'demo@techmere.com': {
    password: 'demo123',
    name: 'Demo User',
  },
}

class AuthService {
  private currentUser: User | null = null

  constructor() {
    // Try to restore user from localStorage on initialization
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser)
    }
  }

  login(credentials: LoginCredentials): LoginResponse {
    const user = users[credentials.email]

    if (!user) {
      return {
        success: false,
        message: 'Email not found',
      }
    }

    if (user.password !== credentials.password) {
      return {
        success: false,
        message: 'Incorrect password',
      }
    }

    this.currentUser = {
      id: credentials.email,
      email: credentials.email,
      name: user.name,
    }

    // Store user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))

    return {
      success: true,
      message: 'Login successful',
      user: this.currentUser,
    }
  }

  logout(): void {
    this.currentUser = null
    localStorage.removeItem('currentUser')
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }
}

export const authService = new AuthService()
export type { LoginCredentials, LoginResponse, User }
