<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import Navbar from '@/components/Navbar.vue'

const { user } = useAuth()
</script>

<template>
  <div style="min-height: 100vh; background-color: #f9f9f9">
    <Navbar />
    <main style="padding: 2rem; max-width: 1200px; margin: 0 auto">
      <h2>Welcome to Dashboard</h2>
      <div
        v-if="user"
        style="
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        "
      >
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <p style="color: #666; margin-top: 2rem">
        You are successfully logged in. Click the logout button in the navbar to log out.
      </p>
    </main>
  </div>
</template>

<style scoped>
main {
  color: #333;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}
</style>
