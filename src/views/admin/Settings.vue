<script setup>
import { ref } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'

const generalSettings = ref({
  platformName: 'BrightBoard',
  supportEmail: 'support@brightboard.com',
  contactPhone: '+1 (555) 123-4567',
  timezone: 'UTC',
  defaultLanguage: 'en',
  maintenanceMode: false
})

const emailSettings = ref({
  smtpHost: 'smtp.example.com',
  smtpPort: '587',
  smtpUsername: 'notifications@brightboard.com',
  smtpPassword: '********',
  senderName: 'BrightBoard Notifications',
  senderEmail: 'notifications@brightboard.com'
})

const integrationSettings = ref({
  stripePublicKey: 'pk_test_...',
  stripeSecretKey: 'sk_test_...',
  googleAnalyticsId: 'UA-XXXXXXXX-X',
  zoomApiKey: 'YOUR_ZOOM_API_KEY',
  zoomApiSecret: '********'
})

const notificationSettings = ref({
  enableEmailNotifications: true,
  enablePushNotifications: true,
  enableSmsNotifications: false,
  dailyDigest: true,
  weeklyReport: true
})

const saveSettings = (section) => {
  // In a real application, this would make an API call to save the settings
  console.log(`Saving ${section} settings:`, {
    general: generalSettings.value,
    email: emailSettings.value,
    integration: integrationSettings.value,
    notification: notificationSettings.value
  }[section])
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Platform Settings</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage platform configuration and integration settings
      </p>
    </div>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- General Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">General Settings</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="Platform Name"
              v-model="generalSettings.platformName"
            />
            <BaseInput
              label="Support Email"
              type="email"
              v-model="generalSettings.supportEmail"
            />
            <BaseInput
              label="Contact Phone"
              v-model="generalSettings.contactPhone"
            />
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Timezone
              </label>
              <select
                v-model="generalSettings.timezone"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Language
              </label>
              <select
                v-model="generalSettings.defaultLanguage"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div class="flex items-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="generalSettings.maintenanceMode"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Maintenance Mode</span>
              </label>
            </div>
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('general')">
              Save General Settings
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Email Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Email Settings</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="SMTP Host"
              v-model="emailSettings.smtpHost"
            />
            <BaseInput
              label="SMTP Port"
              v-model="emailSettings.smtpPort"
            />
            <BaseInput
              label="SMTP Username"
              v-model="emailSettings.smtpUsername"
            />
            <BaseInput
              label="SMTP Password"
              type="password"
              v-model="emailSettings.smtpPassword"
            />
            <BaseInput
              label="Sender Name"
              v-model="emailSettings.senderName"
            />
            <BaseInput
              label="Sender Email"
              type="email"
              v-model="emailSettings.senderEmail"
            />
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('email')">
              Save Email Settings
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Integration Settings -->
      <div class="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Integration Settings</h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="Stripe Public Key"
              v-model="integrationSettings.stripePublicKey"
            />
            <BaseInput
              label="Stripe Secret Key"
              type="password"
              v-model="integrationSettings.stripeSecretKey"
            />
            <BaseInput
              label="Google Analytics ID"
              v-model="integrationSettings.googleAnalyticsId"
            />
            <BaseInput
              label="Zoom API Key"
              v-model="integrationSettings.zoomApiKey"
            />
            <BaseInput
              label="Zoom API Secret"
              type="password"
              v-model="integrationSettings.zoomApiSecret"
            />
          </div>
          <div class="mt-6">
            <BaseButton @click="saveSettings('integration')">
              Save Integration Settings
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
                  v-model="notificationSettings.enableEmailNotifications"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive browser push notifications</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.enablePushNotifications"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive notifications via SMS</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.enableSmsNotifications"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Daily Digest</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive daily summary of activities</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.dailyDigest"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Weekly Report</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Receive weekly performance reports</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="notificationSettings.weeklyReport"
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
    </div>
  </div>
</template>