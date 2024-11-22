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
  Camera
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

const securitySettings = ref({
  twoFactorEnabled: false,
  lastPasswordChange: '2024-01-15',
  loginNotifications: true,
  sessionTimeout: '30'
})

const notificationSettings = ref({
  emailNotifications: true,
  courseUpdates: true,
  messageNotifications: true,
  promotionalEmails: false
})

const showChangePassword = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const changePassword = () => {
  // In a real application, this would make an API call to change the password
  console.log('Changing password:', passwordForm.value)
  showChangePassword.value = false
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const updateProfile = () => {
  // In a real application, this would make an API call to update the profile
  console.log('Updating profile:', userProfile.value)
}

const updateSecuritySettings = () => {
  // In a real application, this would make an API call to update security settings
  console.log('Updating security settings:', securitySettings.value)
}

const updateNotificationSettings = () => {
  // In a real application, this would make an API call to update notification settings
  console.log('Updating notification settings:', notificationSettings.value)
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real application, this would upload the file to a server
    const reader = new FileReader()
    reader.onload = (e) => {
      userProfile.value.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
        <div class="relative h-32 bg-primary-600">
          <div class="absolute -bottom-12 left-8">
            <div class="relative">
              <img
                :src="userProfile.avatar"
                :alt="userProfile.firstName"
                class="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800"
              />
              <label
                class="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-1 cursor-pointer shadow-sm"
              >
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleAvatarUpload"
                />
                <Camera class="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </label>
            </div>
          </div>
        </div>
        <div class="pt-16 pb-6 px-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ userProfile.firstName }} {{ userProfile.lastName }}
          </h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ userProfile.bio }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Personal Information -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Personal Information</h2>
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <BaseInput
                  label="Email"
                  type="email"
                  v-model="userProfile.email"
                  :icon="Mail"
                />
                <BaseInput
                  label="Phone"
                  type="tel"
                  v-model="userProfile.phone"
                  :icon="Phone"
                />
              </div>

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

          <!-- Security Settings -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Security Settings</h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="securitySettings.twoFactorEnabled"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Password</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Last changed: {{ securitySettings.lastPasswordChange }}
                </p>
                <button
                  @click="showChangePassword = true"
                  class="mt-2 text-sm text-primary-600 hover:text-primary-500"
                >
                  Change Password
                </button>
              </div>

              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Session Timeout</h3>
                <select
                  v-model="securitySettings.sessionTimeout"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>

              <div class="flex justify-end">
                <BaseButton @click="updateSecuritySettings">
                  Save Security Settings
                </BaseButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Notification Settings</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notificationSettings.emailNotifications"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Course Updates</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Get notified about course updates</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notificationSettings.courseUpdates"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Messages</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Get notified about new messages</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notificationSettings.messageNotifications"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white">Promotional Emails</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Receive promotional offers and updates</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notificationSettings.promotionalEmails"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div class="mt-6">
              <BaseButton @click="updateNotificationSettings" class="w-full">
                Save Notification Settings
              </BaseButton>
            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Social Links</h2>
            <div class="space-y-4">
              <BaseInput
                label="Twitter"
                v-model="userProfile.socialLinks.twitter"
                placeholder="@username"
              />
              <BaseInput
                label="LinkedIn"
                v-model="userProfile.socialLinks.linkedin"
                placeholder="username"
              />
              <BaseInput
                label="GitHub"
                v-model="userProfile.socialLinks.github"
                placeholder="username"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div v-if="showChangePassword" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Change Password</h2>
        
        <form @submit.prevent="changePassword" class="space-y-6">
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

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showChangePassword = false"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>