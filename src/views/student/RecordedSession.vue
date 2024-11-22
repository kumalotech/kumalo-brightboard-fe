<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = route.params.id

const session = ref({
  id: sessionId,
  title: 'HTML Fundamentals',
  instructor: 'Dr. Sarah Thompson',
  course: 'Web Development Bootcamp',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
  description: 'Learn the fundamentals of HTML including semantic elements, forms, and best practices for modern web development.',
  resources: [
    { name: 'Slides', url: '#' },
    { name: 'Exercise Files', url: '#' },
    { name: 'Additional Reading', url: '#' }
  ]
})
</script>

<template>
  <div class="h-[calc(100vh-6rem)]">
    <!-- Session Header -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h1 class="text-lg font-medium text-teal">{{ session.title }}</h1>
      <p class="text-sm text-teal/70">
        {{ session.course }} with {{ session.instructor }}
      </p>
    </div>

    <!-- Video Player and Info -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
      <!-- Video Player -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="relative w-full h-0 pb-[56.25%]">
          <iframe
            :src="session.videoUrl"
            class="absolute top-0 left-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Session Info -->
      <div class="bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
        <div class="space-y-6">
          <div>
            <h2 class="text-lg font-medium text-teal mb-2">Description</h2>
            <p class="text-sm text-teal/70">{{ session.description }}</p>
          </div>

          <div>
            <h2 class="text-lg font-medium text-teal mb-2">Resources</h2>
            <ul class="space-y-2">
              <li v-for="resource in session.resources" :key="resource.name">
                <a
                  :href="resource.url"
                  class="text-sm text-primary-600 hover:text-primary-700"
                >
                  {{ resource.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>