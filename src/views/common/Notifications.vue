<script setup>
import { ref, computed } from 'vue'
import { 
  Bell,
  BookOpen,
  MessageSquare,
  Award,
  AlertCircle,
  Check,
  X
} from 'lucide-vue-next'
import BaseButton from '../../components/BaseButton.vue'

const notifications = ref([
  {
    id: 1,
    type: 'COURSE',
    title: 'New lesson available',
    message: 'Advanced CSS Layouts lesson is now available in Web Development Bootcamp',
    date: '2024-02-15T14:30:00',
    read: false,
    icon: BookOpen
  },
  {
    id: 2,
    type: 'MESSAGE',
    title: 'New message from instructor',
    message: 'Dr. Sarah Thompson replied to your question',
    date: '2024-02-15T12:45:00',
    read: false,
    icon: MessageSquare
  },
  {
    id: 3,
    type: 'ACHIEVEMENT',
    title: 'Achievement unlocked',
    message: 'Completed 5 lessons in one day',
    date: '2024-02-14T16:20:00',
    read: true,
    icon: Award
  },
  {
    id: 4,
    type: 'SYSTEM',
    title: 'System maintenance',
    message: 'Scheduled maintenance on February 20th, 2024',
    date: '2024-02-14T09:15:00',
    read: true,
    icon: AlertCircle
  }
])

const selectedType = ref('ALL')
const showUnreadOnly = ref(false)

const types = [
  { value: 'ALL', label: 'All Notifications' },
  { value: 'COURSE', label: 'Course Updates' },
  { value: 'MESSAGE', label: 'Messages' },
  { value: 'ACHIEVEMENT', label: 'Achievements' },
  { value: 'SYSTEM', label: 'System Notifications' }
]

const filteredNotifications = computed(() => {
  return notifications.value.filter(notification => {
    const matchesType = selectedType.value === 'ALL' || notification.type === selectedType.value
    const matchesReadStatus = !showUnreadOnly.value || !notification.read
    return matchesType && matchesReadStatus
  })
})

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const markAsRead = (notificationId) => {
  const notification = notifications.value.find(n => n.id === notificationId)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const deleteNotification = (notificationId) => {
  notifications.value = notifications.value.filter(n => n.id !== notificationId)
}

const clearAllNotifications = () => {
  notifications.value = []
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Notifications</h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ unreadCount }} unread notifications
          </p>
        </div>
        <div class="flex space-x-3">
          <BaseButton
            v-if="unreadCount > 0"
            variant="secondary"
            @click="markAllAsRead"
          >
            Mark all as read
          </BaseButton>
          <BaseButton
            variant="secondary"
            @click="clearAllNotifications"
          >
            Clear all
          </BaseButton>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <select
              v-model="selectedType"
              class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option
                v-for="type in types"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
          </div>
          <div class="flex items-center">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="showUnreadOnly"
                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Show unread only</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="space-y-4">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          :class="{ 'border-l-4 border-primary-500': !notification.read }"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="notification.icon"
                  class="h-6 w-6 text-gray-400"
                />
              </div>
              <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ notification.title }}
                  </p>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {{ formatDate(notification.date) }}
                    </span>
                    <button
                      v-if="!notification.read"
                      @click="markAsRead(notification.id)"
                      class="text-primary-600 hover:text-primary-500"
                      title="Mark as read"
                    >
                      <Check class="h-4 w-4" />
                    </button>
                    <button
                      @click="deleteNotification(notification.id)"
                      class="text-gray-400 hover:text-gray-500"
                      title="Delete notification"
                    >
                      <X class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {{ notification.message }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredNotifications.length === 0"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center"
        >
          <Bell class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No notifications</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ showUnreadOnly ? "No unread notifications" : "You're all caught up!" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>