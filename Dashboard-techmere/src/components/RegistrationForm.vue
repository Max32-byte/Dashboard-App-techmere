<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-xl p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 text-center">
          Registratie
        </h1>
        <p class="text-gray-600 text-center mb-8">
          Maak een account aan om toegang te krijgen tot het dashboard
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Naam
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Uw volledige naam"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              @blur="validateField('name')"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="uw.email@voorbeeld.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              @blur="validateField('email')"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Wachtwoord
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Minimaal 6 tekens"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              @blur="validateField('password')"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Account aanmaken</span>
            <span v-else>Bezig met registratie...</span>
          </button>

          <!-- Server Error -->
          <div
            v-if="serverError"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {{ serverError }}
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
          >
            {{ successMessage }}
          </div>
        </form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-gray-600">
          Heb je al een account?
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-medium">
            Log in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const serverError = ref('')
const successMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
})

function validateField(field: string) {
  errors[field as keyof typeof errors] = ''

  if (field === 'name') {
    if (!form.name.trim()) {
      errors.name = 'Naam is verplicht'
    }
  }

  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = 'Email is verplicht'
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Ongeldig e-mailadres'
    }
  }

  if (field === 'password') {
    if (!form.password) {
      errors.password = 'Wachtwoord is verplicht'
    } else if (form.password.length < 6) {
      errors.password = 'Wachtwoord moet minstens 6 tekens zijn'
    }
  }
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

async function handleSubmit() {
  // Validate all fields
  validateField('name')
  validateField('email')
  validateField('password')

  // Check if there are any errors
  if (errors.name || errors.email || errors.password) {
    return
  }

  isLoading.value = true
  serverError.value = ''
  successMessage.value = ''

  try {
    // Mock API call - replace with actual API endpoint
    const response = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    }) as { token?: string }

    successMessage.value = 'Account succesvol aangemaakt! U wordt automatisch ingelogd...'

    // Store token if provided
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } catch (error: any) {
    if (error.errors) {
      // Server validation errors
      Object.keys(error.errors).forEach((key) => {
        errors[key as keyof typeof errors] = error.errors[key]
      })
    } else {
      serverError.value = error.message || 'Registratie mislukt. Probeer het opnieuw.'
    }
  } finally {
    isLoading.value = false
  }
}

async function registerUser(userData: any) {
  // This simulates the API call that would be made to the Laravel backend
  // In a real application, this would be:
  // const response = await fetch('/api/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(userData)
  // })

  // For now, we simulate a successful registration with a mock
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API response
      resolve({
        message: 'User registered successfully',
        user: {
          id: 1,
          name: userData.name,
          email: userData.email,
        },
        token: '******',
      })
    }, 1000)
  })
}
</script>
