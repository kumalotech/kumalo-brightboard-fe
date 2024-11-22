<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '../components/BaseButton.vue'
import RoleSelector from '../components/register/RoleSelector.vue'
import RegisterForm from '../components/register/RegisterForm.vue'
import { BookOpen } from 'lucide-vue-next'

const router = useRouter()
const selectedRole = ref('')

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  nationalIdentificationNumber: yup.string().required('National ID is required'),
  address: yup.string().required('Address is required'),
  districts: yup.string().required('District is required'),
  userRole: yup.string().required('Please select a role')
})

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  router.push('/login')
})

const roles = [
  {
    id: 'STUDENT',
    title: 'Student',
    description: 'Access courses and learn at your own pace',
    icon: '👨‍🎓'
  },
  {
    id: 'TEACHER',
    title: 'Teacher',
    description: 'Create and manage your own courses',
    icon: '👩‍🏫'
  },
  {
    id: 'INSTITUTION',
    title: 'Institution',
    description: 'Manage multiple courses and teachers',
    icon: '🏫'
  }
]

const updateRole = (role) => {
  selectedRole.value = role
  values.userRole = role
}
</script>

<template>
  <div class="min-h-screen bg-cream flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Logo and Brand -->
    <div class="flex items-center justify-center mb-8">
      <BookOpen class="h-10 w-10 text-primary-500" />
      <span class="ml-2 text-2xl font-bold text-teal">BrightBoard</span>
    </div>

    <!-- Main Content -->
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-teal">
          Create Your Account
        </h1>
        <p class="mt-3 text-base text-teal/80">
          Join BrightBoard and start your learning journey
        </p>
      </div>

      <!-- Registration Form -->
      <form @submit="onSubmit" class="space-y-8">
        <!-- Role Selection -->
        <div class="bg-cream/50 rounded-xl p-6">
          <RoleSelector
            :selected-role="selectedRole"
            :error="errors.userRole"
            :roles="roles"
            @update:selected-role="updateRole"
          />
        </div>

        <!-- Personal Information -->
        <div class="bg-cream/50 rounded-xl p-6">
          <h2 class="text-lg font-semibold text-teal mb-6">Personal Information</h2>
          <RegisterForm
            :values="values"
            :errors="errors"
          />
        </div>

        <!-- Submit Section -->
        <div class="pt-6">
          <BaseButton type="submit" class="w-full py-3 text-base font-medium">
            Create Account
          </BaseButton>
          
          <!-- Sign In Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-teal/80">
              Already have an account?
              <router-link 
                to="/login" 
                class="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Sign in
              </router-link>
            </p>
          </div>

          <!-- Terms and Privacy -->
          <p class="mt-4 text-xs text-center text-teal/60">
            By creating an account, you agree to our
            <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
            and
            <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>