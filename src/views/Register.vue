<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'
import { BookOpen } from 'lucide-vue-next'

const router = useRouter()

const schools = [
  'St. Mary\'s College Kisubi',
  'Kings College Budo',
  'Nabisunsa Girls School',
  'Gayaza High School',
  'Mengo Senior School'
]

const classrooms = [
  'Senior 1',
  'Senior 2',
  'Senior 3',
  'Senior 4',
  'Senior 5',
  'Senior 6'
]

const form = ref({
  school: '',
  classroom: '',
  firstName: '',
  lastName: '',
  phone: '',
  password: ''
})

const schema = yup.object({
  school: yup.string().required('School is required'),
  classroom: yup.string().required('Class is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
})

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  router.push('/login')
})
</script>

<template>
  <div class="min-h-screen bg-cream flex">
    <!-- Left Panel - Image -->
    <div class="hidden lg:block relative w-1/2">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt="Students studying"
      />
      <div class="absolute inset-0 bg-primary-700 mix-blend-multiply opacity-50"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
        <h2 class="text-4xl font-bold text-white max-w-md">
          Join BrightBoard Today
        </h2>
        <p class="mt-4 text-xl text-gray-200 max-w-md">
          Start your learning journey with us
        </p>
      </div>
    </div>

    <!-- Right Panel - Registration Form -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-cream">
      <div>

        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-teal">
            Create Student Account
          </h1>
          <p class="mt-2 text-sm text-teal/80">
            Already have an account?
            <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </router-link>
          </p>
        </div>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- School Selection -->
          <div>
            <label class="block text-sm font-medium text-teal/70 mb-1">
              School
            </label>
            <select
              v-model="form.school"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select your school</option>
              <option v-for="school in schools" :key="school" :value="school">
                {{ school }}
              </option>
            </select>
            <p v-if="errors.school" class="mt-1 text-sm text-red-600">{{ errors.school }}</p>
          </div>

          <!-- Classroom Selection -->
          <div>
            <label class="block text-sm font-medium text-teal/70 mb-1">
              Class
            </label>
            <select
              v-model="form.classroom"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Select your class</option>
              <option v-for="classroom in classrooms" :key="classroom" :value="classroom">
                {{ classroom }}
              </option>
            </select>
            <p v-if="errors.classroom" class="mt-1 text-sm text-red-600">{{ errors.classroom }}</p>
          </div>

          <!-- Personal Information -->
          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-1/2">
              <BaseInput
                label="First Name"
                v-model="form.firstName"
                :error="errors.firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div class="w-full md:w-1/2">
              <BaseInput
              label="Last Name"
              v-model="form.lastName"
              :error="errors.lastName"
              placeholder="Enter your last name"
            />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="w-full md:w-1/2">
              <BaseInput
                label="Phone Number"
                v-model="form.phone"
                :error="errors.phone"
                placeholder="Enter your phone number"
              />
            </div>

            <div class="w-full md:w-1/2">
              <BaseInput
                label="Password"
                type="password"
                v-model="form.password"
                :error="errors.password"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <BaseButton type="submit" class="w-full">
            Create Account
          </BaseButton>

          <!-- Terms and Privacy -->
          <p class="mt-4 text-xs text-center text-teal/60">
            By creating an account, you agree to our
            <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
            and
            <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>