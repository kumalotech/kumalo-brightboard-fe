<script setup>
import { computed } from 'vue'

const props = defineProps({
  package: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'publish'])

const statusColor = computed(() => {
  switch (props.package.status) {
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800'
    case 'DRAFT':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
    <!-- Package Image -->
    <div class="relative h-48">
      <img 
        :src="package.image" 
        :alt="package.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-4 right-4">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="statusColor"
        >
          {{ package.status }}
        </span>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ package.title }}</h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{{ package.description }}</p>
      
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Price</p>
          <p class="font-medium text-gray-900 dark:text-white">${{ package.price }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Duration</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ package.duration }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Students</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ package.students }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Rating</p>
          <div class="flex items-center">
            <span class="font-medium text-gray-900 dark:text-white">{{ package.rating }}</span>
            <svg class="h-4 w-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {{ formatDate(package.lastUpdated) }}
        </p>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          v-if="package.status === 'DRAFT'"
          @click="$emit('publish', package.id)"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Publish
        </button>
        <button
          @click="$emit('edit', package.id)"
          class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Edit
        </button>
        <button
          @click="$emit('delete', package.id)"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>