<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionId = route.params.id

const session = ref({
  id: sessionId,
  title: 'Advanced CSS Layouts',
  instructor: 'Dr. Sarah Thompson',
  course: 'Web Development Bootcamp',
  meetingUrl: 'https://meet.google.com/abc-defg-hij'
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

    <!-- Meeting Frame -->
    <div class="bg-white rounded-lg shadow-sm h-[calc(100%-5rem)] overflow-hidden">
      <iframe
        :src="session.meetingUrl"
        class="w-full h-full border-0"
        allow="camera; microphone; fullscreen; display-capture"
      ></iframe>
    </div>
  </div>
</template>