<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../../components/BaseButton.vue'
import { 
  Video,
  Play,
  Clock,
  Calendar,
  User,
  ArrowRight
} from 'lucide-vue-next'

const router = useRouter()

const liveSessions = ref([
  {
    id: 1,
    title: 'Advanced CSS Layouts',
    instructor: 'Dr. Sarah Thompson',
    course: 'Web Development Bootcamp',
    startTime: '2024-02-20T10:00:00',
    duration: '60 minutes',
    status: 'UPCOMING',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    id: 2,
    title: 'JavaScript Promises & Async/Await',
    instructor: 'Prof. Michael Chen',
    course: 'JavaScript Masterclass',
    startTime: '2024-02-20T14:00:00',
    duration: '90 minutes',
    status: 'UPCOMING',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-yz',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a'
  },
  {
    id: 3,
    title: 'React Components',
    instructor: 'Emily Rodriguez',
    course: 'React Fundamentals',
    startTime: '2024-02-21T11:00:00',
    duration: '75 minutes',
    status: 'UPCOMING',
    meetingUrl: 'https://meet.google.com/xyz-uvwx-yz',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
  }
])

const recordedSessions = ref([
  {
    id: 1,
    title: 'HTML Fundamentals',
    instructor: 'Dr. Sarah Thompson',
    course: 'Web Development Bootcamp',
    date: '2024-02-15',
    duration: '45 minutes',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    id: 2,
    title: 'CSS Box Model',
    instructor: 'Dr. Sarah Thompson',
    course: 'Web Development Bootcamp',
    date: '2024-02-14',
    duration: '50 minutes',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a'
  },
  {
    id: 3,
    title: 'JavaScript Basics',
    instructor: 'Prof. Michael Chen',
    course: 'JavaScript Masterclass',
    date: '2024-02-13',
    duration: '60 minutes',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
  }
])

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString)
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const joinLiveSession = (sessionId) => {
  router.push(`/student/learn/live/${sessionId}`)
}

const watchRecordedSession = (sessionId) => {
  router.push(`/student/learn/recorded/${sessionId}`)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-teal">Learning Sessions</h1>
      <p class="mt-2 text-sm text-teal/70">
        Access your live and recorded learning sessions
      </p>
    </div>

    <!-- Live Sessions -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-teal">Live Sessions</h2>
        <span class="text-sm text-primary-600 font-medium">{{ liveSessions.length }} Upcoming</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="session in liveSessions"
          :key="session.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 group"
        >
          <!-- Session Thumbnail -->
          <div class="relative h-48">
            <img
              :src="session.thumbnail"
              :alt="session.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500 text-white">
                LIVE
              </span>
              <h3 class="mt-2 text-lg font-medium text-white line-clamp-2">
                {{ session.title }}
              </h3>
            </div>
          </div>

          <!-- Session Info -->
          <div class="p-4">
            <div class="flex items-center text-sm text-teal/70 mb-3">
              <User class="h-4 w-4 mr-2" />
              {{ session.instructor }}
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-teal/70">
                <Calendar class="h-4 w-4 mr-2" />
                {{ formatDateTime(session.startTime) }}
              </div>
              <div class="flex items-center text-sm text-teal/70">
                <Clock class="h-4 w-4 mr-2" />
                {{ session.duration }}
              </div>
            </div>

            <BaseButton
              @click="joinLiveSession(session.id)"
              class="w-full group-hover:bg-primary-700"
            >
              <span class="flex items-center justify-center">
                Join Session
                <ArrowRight class="ml-2 h-4 w-4" />
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Recorded Sessions -->
    <div>
      <h2 class="text-lg font-medium text-teal mb-4">Previous Sessions</h2>
      <div class="space-y-4">
        <div
          v-for="session in recordedSessions"
          :key="session.id"
          class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          @click="watchRecordedSession(session.id)"
        >
          <div class="p-6 flex items-center">
            <div class="flex-shrink-0 w-48 h-32 relative rounded-lg overflow-hidden mr-6">
              <img
                :src="session.thumbnail"
                :alt="session.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <Play class="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-medium text-teal">{{ session.title }}</h3>
              <p class="text-sm text-teal/70">{{ session.course }}</p>
              
              <div class="mt-4 flex items-center space-x-6">
                <div class="flex items-center text-sm text-teal/70">
                  <User class="h-4 w-4 mr-2" />
                  {{ session.instructor }}
                </div>
                <div class="flex items-center text-sm text-teal/70">
                  <Calendar class="h-4 w-4 mr-2" />
                  {{ formatDate(session.date) }}
                </div>
                <div class="flex items-center text-sm text-teal/70">
                  <Clock class="h-4 w-4 mr-2" />
                  {{ session.duration }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>