import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Mock users database
const mockUsers = [
  {
    id: 1,
    email: 'student@demo.com',
    password: 'Pa$$w0rd!',
    firstName: 'John',
    lastName: 'Doe',
    role: 'STUDENT',
    phone: '0787584128'
  },
  {
    id: 2,
    email: 'teacher@demo.com',
    password: 'Pa$$w0rd!',
    firstName: 'Sarah',
    lastName: 'Thompson',
    role: 'TEACHER',
    phone: '0787584129'
  },
  {
    id: 3,
    email: 'admin@demo.com',
    password: 'Pa$$w0rd!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    phone: '0787584130'
  },
  {
    id: 4,
    email: 'institution@demo.com',
    password: 'Pa$$w0rd!',
    firstName: 'Tech',
    lastName: 'Academy',
    role: 'INSTITUTION',
    phone: '0787584131'
  }
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || null)

  const login = async (credentials) => {
    try {
      // Find user by email and password
      const foundUser = mockUsers.find(u => 
        u.email === credentials.email && 
        u.password === credentials.password
      )

      if (!foundUser) {
        throw new Error('Invalid credentials')
      }

      // Set user and token
      user.value = foundUser
      token.value = 'mock-jwt-token'
      return foundUser
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  const checkAuth = () => {
    return isAuthenticated.value
  }

  return {
    user,
    token,
    isAuthenticated,
    userRole,
    login,
    logout,
    checkAuth
  }
})