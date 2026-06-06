const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

async function handleResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`
    try {
      const errorData = await response.json()
      if (errorData.message) {
        errorMessage = errorData.message
      } else if (errorData.error) {
        errorMessage = errorData.error
      } else if (errorData.errors) {
        if (Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.join(', ')
        } else {
          errorMessage = Object.values(errorData.errors).flat().join(', ')
        }
      }
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage
    }
    throw new Error(errorMessage)
  }
  return response.json()
}

export const authAPI = {
  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })

    await handleResponse(response)
  },

  async login(email: string, password: string): Promise<{ user: { id: number; name: string; email: string } }> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })

    return handleResponse(response)
  },

  async getUser(): Promise<{ user: { id: number; name: string; email: string } }> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })

    return handleResponse(response)
  },
}

