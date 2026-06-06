<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welkom op het Dashboard
        </h1>
        <p class="text-gray-600 text-lg mb-8">
          U bent succesvol ingelogd!
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-600">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              Dashboard
            </h2>
            <p class="text-gray-600">
              Bekijk uw statistieken en activiteiten op één plek.
            </p>
          </div>

          <div class="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              Instellingen
            </h2>
            <p class="text-gray-600">
              Bewerk uw profiel en accountinstellingen.
            </p>
          </div>

          <div class="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">
              Ondersteuning
            </h2>
            <p class="text-gray-600">
              Neem contact met ons op voor hulp en ondersteuning.
            </p>
          </div>
        </div>

        <div class="mt-8">
          <button
            @click="logout"
            class="bg-red-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-700 transition"
          >
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('authToken')
  router.push('/register')
}
</script>
