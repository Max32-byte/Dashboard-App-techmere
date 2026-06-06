<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

const router = useRouter()
const user = computed(() => authService.getCurrentUser())

const handleLogout = () => {
  authService.logout()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          @click="handleLogout"
          class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="bg-white rounded-lg shadow p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome, {{ user?.name }}!</h2>
        <p class="text-gray-600">You are logged in as <strong>{{ user?.email }}</strong></p>
      </div>

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Total Users</h3>
          <p class="text-4xl font-bold text-blue-600">1,234</p>
          <p class="text-sm text-gray-600 mt-2">+12% from last month</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue</h3>
          <p class="text-4xl font-bold text-green-600">$45,231</p>
          <p class="text-sm text-gray-600 mt-2">+8% from last month</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
          <p class="text-4xl font-bold text-purple-600">573</p>
          <p class="text-sm text-gray-600 mt-2">Currently active</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow p-8 mt-8">
        <h3 class="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p class="font-medium text-gray-900">Login successful</p>
              <p class="text-sm text-gray-600">You logged in to your dashboard</p>
            </div>
            <time class="text-sm text-gray-500">Just now</time>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p class="font-medium text-gray-900">Profile updated</p>
              <p class="text-sm text-gray-600">Your profile information was updated</p>
            </div>
            <time class="text-sm text-gray-500">2 hours ago</time>
          </div>
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium text-gray-900">New message</p>
              <p class="text-sm text-gray-600">You received a new message from admin</p>
            </div>
            <time class="text-sm text-gray-500">5 hours ago</time>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
