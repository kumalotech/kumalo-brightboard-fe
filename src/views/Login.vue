<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import * as yup from 'yup'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const { handleSubmit, values, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: ''
  }
})

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const user = await authStore.login({
      email: formValues.email,
      password: formValues.password
    })
    
    // Redirect based on user role
    switch (user.role) {
      case 'STUDENT':
        router.push('/student')
        break
      case 'TEACHER':
        router.push('/teacher')
        break
      case 'ADMIN':
        router.push('/admin')
        break
      case 'INSTITUTION':
        router.push('/institution')
        break
      default:
        router.push('/')
    }
  } catch (error) {
    console.error('Login error:', error)
  }
})

const updateField = (field, value) => {
  setFieldValue(field, value)
}
</script>

<template>
  <div class="min-h-screen bg-cream flex">
    <!-- Left Panel - Image -->
    <div class="hidden lg:block relative w-1/2">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505238680356-667803448bb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt="Learning"
      />
      <div class="absolute inset-0 bg-primary-700 mix-blend-multiply opacity-50"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
        <h2 class="text-4xl font-bold text-white max-w-md">
          Welcome Back to BrightBoard
        </h2>
        <p class="mt-4 text-xl text-gray-200 max-w-md">
          Continue your learning journey with us
        </p>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-cream">
      <div class="mx-auto w-full max-w-sm">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-teal">
            Sign in to your account
          </h1>
          <p class="mt-2 text-sm text-teal/80">
            Don't have an account?
            <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
              Sign up for free
            </router-link>
          </p>
        </div>

        <div class="mt-8">
          <form @submit.prevent="onSubmit" class="space-y-6">
            <BaseInput
              label="Email address"
              type="email"
              :modelValue="values.email"
              @update:modelValue="value => updateField('email', value)"
              :error="errors.email"
            />

            <BaseInput
              label="Password"
              type="password"
              :modelValue="values.password"
              @update:modelValue="value => updateField('password', value)"
              :error="errors.password"
            />

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-teal/80">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <BaseButton type="submit" class="w-full">
              Sign in
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>