<script setup>
import { ref } from 'vue'
import { 
  Bell,
  BookOpen,
  Award,
  AlertCircle,
  Check,
  X,
  Trash2
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
  { value: 'ACHIEVEMENT', label: 'Achievements' },
  { value: 'SYSTEM', label: 'System Notifications' }
]

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
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-teal">Notifications</h1>
        <p class="mt-1 text-sm text-teal/70">
          Stay updated with your course and achievement notifications
        </p>
      </div>
      <div class="flex space-x-3">
        <BaseButton
          variant="primary"
          @click="markAllAsRead"
          class="flex items-center gap-2 bg-teal text-teal-700 hover:bg-teal/80 
                 transition-colors border-none shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <Check class="w-4 h-4 flex-shrink-0" />
          <span>Mark all as read</span>
        </BaseButton>
        <BaseButton
          variant="secondary"
          @click="clearAllNotifications"
          class="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-200 
                 transition-colors border-none shadow-sm whitespace-nowrap"
        >
          <Trash2 class="w-4 h-4 flex-shrink-0" />
          <span>Clear all</span>
        </BaseButton>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
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
            <span class="ml-2 text-sm text-teal/70">Show unread only</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="space-y-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden"
        :class="{ 'border-l-4 border-primary-500': !notification.read }"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component
                :is="notification.icon"
                class="h-6 w-6 text-teal/70"
              />
            </div>
            <div class="ml-3 flex-1">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-teal">
                  {{ notification.title }}
                </p>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-teal/70">
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
                    class="text-teal/50 hover:text-teal/70"
                    title="Delete notification"
                  >
                    <X class="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p class="mt-1 text-sm text-teal/70">
                {{ notification.message }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="notifications.length === 0"
        class="bg-white rounded-lg shadow-sm p-8 text-center"
      >
        <Bell class="mx-auto h-12 w-12 text-teal/50" />
        <h3 class="mt-2 text-sm font-medium text-teal">No notifications</h3>
        <p class="mt-1 text-sm text-teal/70">
          {{ showUnreadOnly ? "No unread notifications" : "You're all caught up!" }}
        </p>
      </div>
    </div>
  </div>
</template>