<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { authAPI } from '@/services/authAPI'
import { ref } from 'vue'

const router = useRouter()
const { user, logout: clearAuth } = useAuth()
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleLogout = async () => {
  isLoading.value = true
  error.value = null
  try {
    await authAPI.logout()
    clearAuth()
    await router.push({ name: 'login' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Logout failed'
    console.error('Logout error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <nav style="background-color: #f5f5f5; padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd;">
    <div>
      <h2 style="margin: 0;">Dashboard</h2>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <span v-if="user" style="font-weight: 500;">{{ user.name }}</span>
      <button
        @click="handleLogout"
        :disabled="isLoading"
        style="padding: 0.5rem 1rem; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;"
      >
        {{ isLoading ? 'Logging out...' : 'Logout' }}
      </button>
      <span v-if="error" style="color: red; font-size: 12px;">{{ error }}</span>
    </div>
  </nav>
</template>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #c82333;
}
</style>
