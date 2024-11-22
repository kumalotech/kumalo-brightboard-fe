<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  package: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const viewCourseDetails = () => {
  router.push(`/course/${props.package.id}`)
}
</script>

<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 transform hover:scale-105 transition-all duration-300">
    <!-- Course Image -->
    <div class="relative h-48 w-full">
      <img 
        :src="package.image" 
        :alt="package.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-4 right-4">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          :class="{
            'bg-green-100 text-green-800': package.level === 'Beginner',
            'bg-blue-100 text-blue-800': package.level === 'Intermediate',
            'bg-purple-100 text-purple-800': package.level === 'Advanced'
          }"
        >
          {{ package.level }}
        </span>
      </div>
    </div>
    
    <div class="flex-1 p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ package.title }}</h3>
      </div>
      
      <p class="mt-3 text-base text-gray-500 dark:text-gray-400">{{ package.description }}</p>
      
      <div class="mt-6 flex items-center justify-between">
        <div>
          <div class="text-2xl font-bold text-primary-600">{{ package.price }}</div>
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ package.duration }}</div>
        </div>
        <div class="flex items-center">
          <div class="flex items-center">
            <svg class="text-yellow-400 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="ml-1 text-sm text-gray-600 dark:text-gray-300">{{ package.rating }}</span>
          </div>
          <span class="mx-2 text-gray-300">•</span>
          <span class="text-sm text-gray-600 dark:text-gray-300">{{ package.students.toLocaleString() }} students</span>
        </div>
      </div>
    </div>
    
    <div class="p-6 bg-gray-50 dark:bg-gray-700">
      <button 
        @click="viewCourseDetails"
        class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
      >
        View Course
        <svg class="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>