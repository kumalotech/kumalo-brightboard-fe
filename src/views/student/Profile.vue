<script setup>
import { ref } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Camera,
  Lock,
  XIcon
} from 'lucide-vue-next'

const userProfile = ref({
  firstName: 'Fred',
  lastName: 'Oketa',
  email: 'oketafred@gmail.com',
  phone: '0787584128',
  dateOfBirth: '1992-09-28',
  address: 'Koch Goma',
  districts: 'Kampala',
  nationalIdentificationNumber: 'CM9305105H8RF',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bio: 'Passionate learner and technology enthusiast. Always eager to explore new technologies and share knowledge with others.',
  socialLinks: {
    twitter: '@fredoketa',
    linkedin: 'fredoketa',
    github: 'oketafred'
  }
})

const showChangePassword = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changePassword = () => {
  showChangePassword.value = false
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const updateProfile = () => {
  // Handle profile update
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userProfile.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div>
    <!-- Profile Header -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div class="relative h-32 bg-primary-600">
        <div class="absolute -bottom-12 left-8">
          <div class="relative">
            <img
              :src="userProfile.avatar"
              :alt="userProfile.firstName"
              class="h-24 w-24 rounded-full border-4 border-white"
            />
            <label
              class="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-sm"
            >
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleAvatarUpload"
              />
              <Camera class="h-4 w-4 text-teal/70" />
            </label>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between">
        <div class="pt-16 pb-6 px-8">
          <h1 class="text-2xl font-bold text-teal">
            {{ userProfile.firstName }} {{ userProfile.lastName }}
          </h1>
          <p class="mt-1 text-sm text-teal/70">
            {{ userProfile.bio }}
          </p>
        </div>
        <div class="px-8 pb-6 md:pb-0 md:flex md:items-center">
          <BaseButton
            variant="secondary"
            @click="showChangePassword = true"
          >
            <Lock class="h-4 w-4 mr-2" />
            Change Password
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 class="text-lg font-medium text-teal mb-6">Personal Information</h2>
      <form @submit.prevent="updateProfile" class="space-y-6" autocomplete="off">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <BaseInput
            label="First Name"
            v-model="userProfile.firstName"
            :icon="User"
          />
          <BaseInput
            label="Last Name"
            v-model="userProfile.lastName"
            :icon="User"
          />
          <BaseInput
            label="Email"
            type="email"
            v-model="userProfile.email"
            :icon="Mail"
          />
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <BaseInput
            label="Phone"
            type="tel"
            v-model="userProfile.phone"
            :icon="Phone"
          />
          <BaseInput
            label="Date of Birth"
            type="date"
            v-model="userProfile.dateOfBirth"
            :icon="Calendar"
          />
          <BaseInput
            label="National ID"
            v-model="userProfile.nationalIdentificationNumber"
            :icon="Shield"
          />
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <BaseInput
            label="Address"
            v-model="userProfile.address"
            :icon="MapPin"
          />
          <BaseInput
            label="District"
            v-model="userProfile.districts"
            :icon="MapPin"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-teal mb-1">
            Bio
          </label>
          <textarea
            v-model="userProfile.bio"
            rows="4"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <BaseButton type="submit">
            Save Changes
          </BaseButton>
        </div>
      </form>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Change Password</h2>
          <button
            @click="showChangePassword = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Close</span>
            <XIcon class="h-6 w-6" />
          </button>
        </div>
        
        <form @submit.prevent="changePassword" class="space-y-4">
          <BaseInput
            label="Current Password"
            type="password"
            v-model="passwordForm.currentPassword"
            required
          />

          <BaseInput
            label="New Password"
            type="password"
            v-model="passwordForm.newPassword"
            required
          />

          <BaseInput
            label="Confirm New Password"
            type="password"
            v-model="passwordForm.confirmPassword"
            required
          />

          <div class="flex justify-end space-x-3 mt-6">
            <BaseButton
              type="button"
              variant="secondary"
              @click="showChangePassword = false"
            >
              Cancel
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
            >
              Change Password
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>