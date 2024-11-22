<script setup>
import { ref } from 'vue'
import StatsCard from '../../components/dashboard/StatsCard.vue'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star 
} from 'lucide-vue-next'

const stats = ref([
  {
    title: 'Total Students',
    value: '245',
    change: 12,
    icon: Users
  },
  {
    title: 'Active Courses',
    value: '5',
    change: 8,
    icon: BookOpen
  },
  {
    title: 'Monthly Revenue',
    value: '$4,320',
    change: 15,
    icon: DollarSign
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: 5,
    icon: Star
  }
])

const upcomingSessions = ref([
  {
    id: 1,
    title: 'Web Development Basics',
    date: '2024-02-16',
    time: '10:00 AM',
    students: 15,
    status: 'SCHEDULED'
  },
  {
    id: 2,
    title: 'JavaScript Advanced Concepts',
    date: '2024-02-16',
    time: '2:00 PM',
    students: 12,
    status: 'SCHEDULED'
  },
  {
    id: 3,
    title: 'React Fundamentals',
    date: '2024-02-17',
    time: '11:00 AM',
    students: 18,
    status: 'SCHEDULED'
  }
])

const recentReviews = ref([
  {
    id: 1,
    student: 'John Smith',
    course: 'Web Development Bootcamp',
    rating: 5,
    comment: 'Excellent course! The instructor was very knowledgeable and helpful.',
    date: '2024-02-15'
  },
  {
    id: 2,
    student: 'Sarah Johnson',
    course: 'JavaScript Masterclass',
    rating: 4,
    comment: 'Great content and well-structured lessons.',
    date: '2024-02-14'
  },
  {
    id: 3,
    student: 'Michael Brown',
    course: 'React for Beginners',
    rating: 5,
    comment: 'Very clear explanations and practical examples.',
    date: '2024-02-14'
  }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Teacher Dashboard</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Overview of your teaching activities and performance
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Upcoming Sessions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Sessions</h2>
          <div class="flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="session in upcomingSessions" :key="session.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ session.title }}
                    </p>
                    <div class="flex items-center mt-1">
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ formatDate(session.date) }} at {{ session.time }}
                      </p>
                      <span class="mx-2 text-gray-300">•</span>
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ session.students }} students
                      </p>
                    </div>
                  </div>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ session.status }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-6">
            <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all sessions
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Recent Reviews -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Reviews</h2>
          <div class="flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="review in recentReviews" :key="review.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ review.student }}
                      </p>
                      <div class="flex items-center">
                        <div class="flex items-center">
                          <svg
                            v-for="i in 5"
                            :key="i"
                            class="h-4 w-4"
                            :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {{ review.course }}
                    </p>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {{ review.comment }}
                    </p>
                  </div>
                </div>
                <div class="mt-2 text-right">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(review.date) }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-6">
            <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all reviews
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>