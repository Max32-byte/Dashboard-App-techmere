<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

const router = useRouter()

const LOGIN_SIMULATION_DELAY = 500

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async (e: Event) => {
  e.preventDefault()
  errorMessage.value = ''
  isLoading.value = true

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, LOGIN_SIMULATION_DELAY))

  const result = authService.login({
    email: email.value,
    password: password.value,
  })

  isLoading.value = false

  if (result.success) {
    // Reset form
    email.value = ''
    password.value = ''
    // Redirect to dashboard
    router.push('/dashboard')
  } else {
    errorMessage.value = result.message || 'Login failed'
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left side - Branding/Info -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white flex-col justify-center px-12">
      <div>
        <h1 class="text-5xl font-bold mb-4">Dashboard</h1>
        <p class="text-xl text-blue-100 mb-8">Welcome to Techmere Dashboard</p>
        <p class="text-blue-50 text-lg leading-relaxed">
          Access your personal dashboard with secure email and password authentication.
          Manage your data, view analytics, and stay on top of your workflow.
        </p>
      </div>
    </div>

    <!-- Right side - Login Form -->
    <div class="flex w-full lg:w-1/2 bg-white flex-col justify-center px-8 sm:px-12">
      <div class="max-w-md w-full mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
        <p class="text-gray-600 mb-8">Enter your credentials to access your dashboard</p>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p class="text-red-800 text-sm font-medium">{{ errorMessage }}</p>
        </div>

        <!-- Login Form -->
        <form @submit="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition mt-6"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else>Signing in...</span>
          </button>
        </form>

        <!-- Demo Credentials Info -->
        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
          <p class="text-xs text-blue-800">
            Email: <code class="font-mono">user@example.com</code> or <code class="font-mono">demo@techmere.com</code>
          </p>
          <p class="text-xs text-blue-800">
            Password: <code class="font-mono">password123</code> or <code class="font-mono">demo123</code>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
