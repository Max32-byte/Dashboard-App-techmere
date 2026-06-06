export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user: {
    id: number
    name: string
    email: string
  }
  token: string
}

export interface ApiError {
  message?: string
  errors?: Record<string, string>
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function register(data: RegisterData): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      if (response.status === 422) {
        throw {
          errors: error.errors || { general: 'Validation failed' },
        } as ApiError
      }
      throw {
        message: error.message || 'Registration failed',
      } as ApiError
    }

    return await response.json()
  } catch (error: any) {
    if (error.errors || error.message) {
      throw error
    }
    throw {
      message: 'Network error. Please try again.',
    } as ApiError
  }
}
