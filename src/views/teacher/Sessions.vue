<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { Calendar, Clock, Users, Video } from 'lucide-vue-next'

const sessions = ref([
  {
    id: 1,
    title: 'Web Development Fundamentals',
    course: 'Web Development Bootcamp',
    date: '2024-02-20',
    time: '10:00',
    duration: 60,
    students: 15,
    type: 'LIVE',
    status: 'SCHEDULED',
    description: 'Introduction to HTML, CSS, and JavaScript basics',
    meetingUrl: 'https://zoom.us/j/123456789'
  },
  {
    id: 2,
    title: 'Advanced JavaScript Concepts',
    course: 'JavaScript Masterclass',
    date: '2024-02-21',
    time: '14:00',
    duration: 90,
    students: 12,
    type: 'LIVE',
    status: 'SCHEDULED',
    description: 'Deep dive into closures, promises, and async/await',
    meetingUrl: 'https://zoom.us/j/987654321'
  },
  {
    id: 3,
    title: 'React Components & Props',
    course: 'React for Beginners',
    date: '2024-02-19',
    time: '15:30',
    duration: 60,
    students: 18,
    type: 'RECORDED',
    status: 'COMPLETED',
    description: 'Understanding React components and props system',
    recordingUrl: 'https://example.com/recording/123'
  }
])

const searchQuery = ref('')
const selectedType = ref('ALL')
const selectedStatus = ref('ALL')
const dateFilter = ref('ALL')

const types = ['ALL', 'LIVE', 'RECORDED']
const statuses = ['ALL', 'SCHEDULED', 'COMPLETED', 'CANCELLED']
const dateFilters = ['ALL', 'TODAY', 'TOMORROW', 'THIS_WEEK', 'NEXT_WEEK']

const showCreateModal = ref(false)
const newSession = ref({
  title: '',
  course: '',
  date: '',
  time: '',
  duration: 60,
  type: 'LIVE',
  description: '',
  meetingUrl: ''
})

const filteredSessions = computed(() => {
  return sessions.value.filter(session => {
    const matchesSearch = 
      session.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      session.course.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = selectedType.value === 'ALL' || session.type === selectedType.value
    const matchesStatus = selectedStatus.value === 'ALL' || session.status === selectedStatus.value
    
    // Date filtering logic can be expanded based on dateFilter.value
    let matchesDate = true
    const sessionDate = new Date(session.date)
    const today = new Date()
    
    if (dateFilter.value === 'TODAY') {
      matchesDate = sessionDate.toDateString() === today.toDateString()
    } else if (dateFilter.value === 'TOMORROW') {
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      matchesDate = sessionDate.toDateString() === tomorrow.toDateString()
    }
    // Add more date filtering logic as needed
    
    return matchesSearch && matchesType && matchesStatus && matchesDate
  })
})

const formatDateTime = (date, time) => {
  const datetime = new Date(`${date}T${time}`)
  return datetime.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'SCHEDULED':
      return 'bg-green-100 text-green-800'
    case 'COMPLETED':
      return 'bg-blue-100 text-blue-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const createSession = () => {
  const session = {
    id: sessions.value.length + 1,
    ...newSession.value,
    students: 0,
    status: 'SCHEDULED'
  }
  sessions.value.push(session)
  showCreateModal.value = false
  newSession.value = {
    title: '',
    course: '',
    date: '',
    time: '',
    duration: 60,
    type: 'LIVE',
    description: '',
    meetingUrl: ''
  }
}

const cancelSession = (sessionId) => {
  const session = sessions.value.find(s => s.id === sessionId)
  if (session) {
    session.status = 'CANCELLED'
  }
}

const startSession = (sessionId) => {
  const session = sessions.value.find(s => s.id === sessionId)
  if (session && session.meetingUrl) {
    window.open(session.meetingUrl, '_blank')
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Teaching Sessions</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your upcoming and past teaching sessions
          </p>
        </div>
        <BaseButton @click="showCreateModal = true">
          Create New Session
        </BaseButton>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <BaseInput
          label="Search sessions"
          v-model="searchQuery"
          placeholder="Search by title or course..."
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            v-model="selectedType"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="type in types" :key="type" :value="type">
              {{ type === 'ALL' ? 'All Types' : type }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            v-model="selectedStatus"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status === 'ALL' ? 'All Statuses' : status }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <select
            v-model="dateFilter"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="filter in dateFilters" :key="filter" :value="filter">
              {{ filter.replace('_', ' ').toLowerCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Sessions Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="session in filteredSessions"
        :key="session.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getStatusColor(session.status)"
            >
              {{ session.status }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              {{ session.type }}
            </span>
          </div>

          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ session.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ session.course }}
          </p>

          <div class="mt-4 space-y-2">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar class="h-5 w-5 mr-2" />
              {{ formatDateTime(session.date, session.time) }}
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock class="h-5 w-5 mr-2" />
              {{ session.duration }} minutes
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users class="h-5 w-5 mr-2" />
              {{ session.students }} students enrolled
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Video class="h-5 w-5 mr-2" />
              {{ session.type === 'LIVE' ? 'Live Session' : 'Recorded Session' }}
            </div>
          </div>

          <p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {{ session.description }}
          </p>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              v-if="session.status === 'SCHEDULED'"
              @click="startSession(session.id)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Start Session
            </button>
            <button
              v-if="session.status === 'SCHEDULED'"
              @click="cancelSession(session.id)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Session Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Create New Session</h2>
        
        <form @submit.prevent="createSession" class="space-y-6">
          <BaseInput
            label="Session Title"
            v-model="newSession.title"
            required
          />

          <BaseInput
            label="Course"
            v-model="newSession.course"
            required
          />

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="Date"
              type="date"
              v-model="newSession.date"
              required
            />

            <BaseInput
              label="Time"
              type="time"
              v-model="newSession.time"
              required
            />
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BaseInput
              label="Duration (minutes)"
              type="number"
              v-model="newSession.duration"
              required
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Session Type
              </label>
              <select
                v-model="newSession.type"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              >
                <option value="LIVE">Live Session</option>
                <option value="RECORDED">Recorded Session</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              v-model="newSession.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            ></textarea>
          </div>

          <BaseInput
            v-if="newSession.type === 'LIVE'"
            label="Meeting URL"
            v-model="newSession.meetingUrl"
            required
          />

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create Session
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>