<script setup>
import { ref } from 'vue'

const activities = ref([
  {
    id: 1,
    user: 'John Doe',
    action: 'enrolled in',
    target: 'Web Development Bootcamp',
    time: '5 minutes ago',
    icon: '👨‍💻'
  },
  {
    id: 2,
    user: 'Sarah Smith',
    action: 'completed',
    target: 'Python Basics',
    time: '15 minutes ago',
    icon: '🎓'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'started teaching',
    target: 'Data Science Fundamentals',
    time: '1 hour ago',
    icon: '👨‍🏫'
  },
])
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activities</h2>
    <div class="flow-root">
      <ul role="list" class="-mb-8">
        <li v-for="(activity, index) in activities" :key="activity.id">
          <div class="relative pb-8">
            <span
              v-if="index !== activities.length - 1"
              class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
              aria-hidden="true"
            />
            <div class="relative flex space-x-3">
              <div>
                <span class="h-8 w-8 rounded-full flex items-center justify-center text-2xl">
                  {{ activity.icon }}
                </span>
              </div>
              <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                <div>
                  <p class="text-sm text-gray-700 dark:text-gray-300">
                    <span class="font-medium text-gray-900 dark:text-white">{{ activity.user }}</span>
                    {{ activity.action }}
                    <span class="font-medium text-gray-900 dark:text-white">{{ activity.target }}</span>
                  </p>
                </div>
                <div class="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {{ activity.time }}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>