<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StatsCard from '../../components/dashboard/StatsCard.vue'
import { 
  BookOpen, 
  Wallet
} from 'lucide-vue-next'
import BaseButton from '../../components/BaseButton.vue'

const router = useRouter()

const stats = ref([
  {
    title: 'Enrolled Courses',
    value: '4',
    change: 1,
    icon: BookOpen
  },
  {
    title: 'Wallet Balance',
    value: '$1,250.00',
    change: 12,
    icon: Wallet
  }
])

const activeCourses = ref([
  {
    id: 1,
    title: 'Web Development Bootcamp',
    progress: 75,
    nextLesson: 'Advanced CSS Layouts',
    instructor: 'Dr. Sarah Thompson',
    lastAccessed: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    title: 'JavaScript Masterclass',
    progress: 45,
    nextLesson: 'Promises and Async/Await',
    instructor: 'Prof. Michael Chen',
    lastAccessed: '2024-02-14',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'React for Beginners',
    progress: 20,
    nextLesson: 'Components and Props',
    instructor: 'Emily Rodriguez',
    lastAccessed: '2024-02-13',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  }
])

const upcomingSessions = ref([
  {
    id: 1,
    title: 'Advanced CSS Workshop',
    date: '2024-02-20',
    time: '10:00 AM',
    instructor: 'Dr. Sarah Thompson',
    duration: '60 min'
  },
  {
    id: 2,
    title: 'JavaScript Q&A Session',
    date: '2024-02-21',
    time: '2:00 PM',
    instructor: 'Prof. Michael Chen',
    duration: '90 min'
  }
])

const achievements = ref([
  {
    id: 1,
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    icon: '🚀',
    date: '2024-02-15'
  },
  {
    id: 2,
    title: 'Perfect Score',
    description: 'Scored 100% in JavaScript Quiz',
    icon: '🎯',
    date: '2024-02-14'
  },
  {
    id: 3,
    title: 'Team Player',
    description: 'Helped 10 students in discussions',
    icon: '🤝',
    date: '2024-02-13'
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getProgressColor = (progress) => {
  if (progress >= 75) return 'bg-green-500'
  if (progress >= 50) return 'bg-yellow-500'
  if (progress >= 25) return 'bg-orange-500'
  return 'bg-red-500'
}

const continueCourse = (courseId) => {
  router.push(`/student/learn/${courseId}`)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-teal">Student Dashboard</h1>
      <p class="mt-2 text-sm text-teal/70">
        Track your learning progress and manage your courses
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Active Courses -->
      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-lg font-medium text-teal">Active Courses</h2>
        <div class="space-y-6">
          <div
            v-for="course in activeCourses"
            :key="course.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div class="flex">
              <div class="flex-shrink-0 w-48">
                <img
                  :src="course.image"
                  :alt="course.title"
                  class="h-full w-full object-cover"
                />
              </div>
              <div class="flex-1 p-6">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-medium text-teal">
                      {{ course.title }}
                    </h3>
                    <p class="mt-1 text-sm text-teal/70">
                      Instructor: {{ course.instructor }}
                    </p>
                  </div>
                  <span class="text-sm text-teal/70">
                    Last accessed: {{ formatDate(course.lastAccessed) }}
                  </span>
                </div>

                <div class="mt-4">
                  <div class="flex justify-between text-sm text-teal/70 mb-1">
                    <span>Progress</span>
                    <span>{{ course.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      class="h-2.5 rounded-full"
                      :class="getProgressColor(course.progress)"
                      :style="{ width: `${course.progress}%` }"
                    ></div>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <div>
                    <p class="text-sm text-teal/70">
                      Next: {{ course.nextLesson }}
                    </p>
                  </div>
                  <div>
                    <BaseButton @click="continueCourse(course.id)">
                      Continue Learning
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Upcoming Sessions -->
        <div class="bg-white rounded-lg shadow-sm p-6 mt-[50px]">
          <h2 class="text-lg font-medium text-teal mb-4">Upcoming Sessions</h2>
          <div class="space-y-4">
            <div
              v-for="session in upcomingSessions"
              :key="session.id"
              class="border-l-4 border-primary-500 pl-4"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-teal">{{ session.title }}</h3>
                  <p class="text-sm text-teal/70">{{ session.instructor }}</p>
                </div>
                <span class="text-sm text-primary-600">{{ session.duration }}</span>
              </div>
              <p class="mt-1 text-sm text-teal/70">
                {{ session.date }} at {{ session.time }}
              </p>
            </div>
          </div>
        </div>

        <!-- Recent Achievements -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-lg font-medium text-teal mb-4">Recent Achievements</h2>
          <div class="space-y-4">
            <div
              v-for="achievement in achievements"
              :key="achievement.id"
              class="flex items-start space-x-3"
            >
              <div class="flex-shrink-0 text-2xl">{{ achievement.icon }}</div>
              <div>
                <h3 class="font-medium text-teal">{{ achievement.title }}</h3>
                <p class="text-sm text-teal/70">{{ achievement.description }}</p>
                <p class="mt-1 text-xs text-teal/50">
                  {{ formatDate(achievement.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>