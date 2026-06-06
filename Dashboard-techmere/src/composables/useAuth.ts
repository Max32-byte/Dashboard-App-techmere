import { ref, computed } from 'vue'

const isAuthenticated = ref(false)
const user = ref<{ id: number; name: string; email: string } | null>(null)

export function useAuth() {
  const setAuthenticated = (authenticated: boolean) => {
    isAuthenticated.value = authenticated
  }

  const setUser = (userData: { id: number; name: string; email: string } | null) => {
    user.value = userData
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    setAuthenticated,
    setUser,
    logout,
  }
}
