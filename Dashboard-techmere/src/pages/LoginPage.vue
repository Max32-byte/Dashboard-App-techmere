<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { authAPI } from '@/services/authAPI'

const router = useRouter()
const { setAuthenticated, setUser } = useAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  isLoading.value = true
  error.value = null

  try {
    const response = await authAPI.login(email.value, password.value)
    setAuthenticated(true)
    setUser(response.user)
    await router.push({ name: 'dashboard' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed'
    console.error('Login error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
    "
  >
    <div
      style="
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      "
    >
      <h1 style="text-align: center; margin-bottom: 2rem">Login</h1>

      <form @submit.prevent="handleLogin">
        <div style="margin-bottom: 1rem">
          <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 500"
            >Email</label
          >
          <input
            id="email"
            v-model="email"
            type="email"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 14px;
              box-sizing: border-box;
            "
            placeholder="Enter your email"
          />
        </div>

        <div style="margin-bottom: 1.5rem">
          <label for="password" style="display: block; margin-bottom: 0.5rem; font-weight: 500"
            >Password</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            style="
              width: 100%;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 14px;
              box-sizing: border-box;
            "
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          style="
            width: 100%;
            padding: 0.75rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          "
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div
        v-if="error"
        style="
          margin-top: 1rem;
          padding: 0.75rem;
          background-color: #f8d7da;
          color: #721c24;
          border-radius: 4px;
          border: 1px solid #f5c6cb;
        "
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
</style>
