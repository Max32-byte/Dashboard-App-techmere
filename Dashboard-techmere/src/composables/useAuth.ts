import { ref, computed } from 'vue'

const isAuthenticated = ref(false)
const user = ref<{ id: number; name: string; email: string } | null>(null)

// Initialize from localStorage
const initAuth = () => {
  try {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('user')
    
    if (storedAuth === 'true' && storedUser) {
      isAuthenticated.value = true
      user.value = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error('Failed to restore auth state from localStorage:', error)
  }
}

// Initialize on module load
initAuth()

export function useAuth() {
  const setAuthenticated = (authenticated: boolean) => {
    isAuthenticated.value = authenticated
    if (authenticated) {
      localStorage.setItem('isAuthenticated', 'true')
    } else {
      localStorage.removeItem('isAuthenticated')
    }
  }

  const setUser = (userData: { id: number; name: string; email: string } | null) => {
    user.value = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    setAuthenticated,
    setUser,
    logout,
  }
}
