<script setup>
import { ref } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'

const institutionSettings = ref({
  name: 'Tech Academy',
  email: 'admin@techacademy.com',
  phone: '+1 (555) 123-4567',
  address: '123 Education Street',
  city: 'San Francisco',
  country: 'United States',
  website: 'www.techacademy.com',
  description: 'Leading technology education institution providing cutting-edge courses in software development, data science, and digital marketing.'
})

const brandingSettings = ref({
  primaryColor: '#CD4B4B',
  secondaryColor: '#96C5B0',
  logo: null,
  favicon: null,
  customDomain: 'learn.techacademy.com'
})

const notificationSettings = ref({
  emailNotifications: true,
  studentEnrollmentAlerts: true,
  teacherApplicationAlerts: true,
  courseCompletionAlerts: true,
  weeklyReports: true,
  monthlyReports: true
})

const privacySettings = ref({
  showTeacherProfiles: true,
  showStudentCount: true,
  showCourseRatings: true,
  allowStudentReviews: true,
  publicInstitutionProfile: true
})

const saveSettings = (section) => {
  // In a real application, this would make an API call to save the settings
  console.log(`Saving ${section} settings:`, {
    institution: institutionSettings.value,
    branding: brandingSettings.value,
    notification: notificationSettings.value,
    privacy: privacySettings.value
  }[section])
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Handle logo upload
    brandingSettings.value.logo = URL.createObjectURL(file)
  }
}

const handleFaviconUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Handle favicon upload
    brandingSettings.value.favicon = URL.createObjectURL(file)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Institution Settings</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage your institution's profile, branding, and preferences
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- Institution Profile -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Institution Profile</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="Institution Name"
              v-model="institutionSettings.name"
            />
            <BaseInput
              label="Email Address"
              type="email"
              v-model="institutionSettings.email"
            />
            <BaseInput
              label="Phone Number"
              v-model="institutionSettings.phone"
            />
            <BaseInput
              label="Website"
              v-model="institutionSettings.website"
            />
            <BaseInput
              label="Address"
              v-model="institutionSettings.address"
            />
            <BaseInput
              label="City"
              v-model="institutionSettings.city"
            />
            <BaseInput
              label="Country"
              v-model="institutionSettings.country"
            />
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                v-model="institutionSettings.description"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('institution')">
              Save Profile Settings
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Branding Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Branding Settings</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Logo
              </label>
              <div class="mt-1 flex items-center">
                <div class="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <img
                    v-if="brandingSettings.logo"
                    :src="brandingSettings.logo"
                    alt="Institution Logo"
                    class="h-full w-full object-contain"
                  />
                  <div v-else class="text-gray-400 text-center">
                    <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="mt-1">Upload Logo</p>
                  </div>
                </div>
                <input
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleLogoUpload"
                  id="logo-upload"
                />
                <label
                  for="logo-upload"
                  class="ml-4 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Change Logo
                </label>
              </div>
            </div>

            <BaseInput
              label="Primary Color"
              type="color"
              v-model="brandingSettings.primaryColor"
            />
            <BaseInput
              label="Secondary Color"
              type="color"
              v-model="brandingSettings.secondaryColor"
            />
            <BaseInput
              label="Custom Domain"
              v-model="brandingSettings.customDomain"
            />
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('branding')">
              Save Branding Settings
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
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
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Student Enrollment Alerts</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when students enroll in courses</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.studentEnrollmentAlerts"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Teacher Application Alerts</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Get notified of new teacher applications</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.teacherApplicationAlerts"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Course Completion Alerts</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Get notified when students complete courses</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.courseCompletionAlerts"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('notification')">
              Save Notification Settings
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Privacy Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Show Teacher Profiles</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Make teacher profiles visible to the public</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="privacySettings.showTeacherProfiles"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Show Student Count</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Display the number of enrolled students</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="privacySettings.showStudentCount"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Show Course Ratings</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Display course ratings and reviews</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="privacySettings.showCourseRatings"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Allow Student Reviews</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Enable students to leave course reviews</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="privacySettings.allowStudentReviews"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('privacy')">
              Save Privacy Settings
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>