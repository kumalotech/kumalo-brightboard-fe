<script setup>
import { ref } from 'vue'
import StatsCard from '../../components/dashboard/StatsCard.vue'
import { 
  Users, 
  GraduationCap, 
  BookOpen,
  TrendingUp 
} from 'lucide-vue-next'

const stats = ref([
  {
    title: 'Total Students',
    value: '1,245',
    change: 8,
    icon: Users
  },
  {
    title: 'Active Teachers',
    value: '48',
    change: 12,
    icon: GraduationCap
  },
  {
    title: 'Active Courses',
    value: '156',
    change: 5,
    icon: BookOpen
  },
  {
    title: 'Completion Rate',
    value: '92%',
    change: 3,
    icon: TrendingUp
  }
])

const recentEnrollments = ref([
  {
    id: 1,
    student: 'John Smith',
    course: 'Web Development Bootcamp',
    date: '2024-02-15',
    status: 'Active'
  },
  {
    id: 2,
    student: 'Emily Johnson',
    course: 'Data Science Fundamentals',
    date: '2024-02-14',
    status: 'Active'
  },
  {
    id: 3,
    student: 'Michael Brown',
    course: 'Digital Marketing',
    date: '2024-02-14',
    status: 'Pending'
  }
])

const topCourses = ref([
  {
    id: 1,
    title: 'Web Development Bootcamp',
    students: 245,
    rating: 4.8,
    completion: 88
  },
  {
    id: 2,
    title: 'Data Science Fundamentals',
    students: 189,
    rating: 4.9,
    completion: 92
  },
  {
    id: 3,
    title: 'Digital Marketing',
    students: 167,
    rating: 4.7,
    completion: 85
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
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Institution Dashboard</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Overview of your institution's performance and activities
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
      <!-- Recent Enrollments -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Enrollments</h2>
          <div class="flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="enrollment in recentEnrollments" :key="enrollment.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ enrollment.student }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ enrollment.course }}
                    </p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ formatDate(enrollment.date) }}
                    </p>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
                      :class="{
                        'bg-green-100 text-green-800': enrollment.status === 'Active',
                        'bg-yellow-100 text-yellow-800': enrollment.status === 'Pending'
                      }"
                    >
                      {{ enrollment.status }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-6">
            <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all enrollments
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Top Performing Courses -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div class="p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Performing Courses</h2>
          <div class="flow-root">
            <ul role="list" class="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="course in topCourses" :key="course.id" class="py-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {{ course.title }}
                    </p>
                    <div class="flex items-center mt-1">
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {{ course.students }} students
                      </span>
                      <span class="mx-2 text-gray-300">•</span>
                      <div class="flex items-center">
                        <svg class="text-yellow-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="ml-1 text-sm text-gray-500 dark:text-gray-400">{{ course.rating }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ course.completion }}%
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      completion
                    </div>
                  </div>
                </div>
                <!-- Progress Bar -->
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    class="bg-primary-600 h-2.5 rounded-full"
                    :style="{ width: `${course.completion}%` }"
                  ></div>
                </div>
              </li>
            </ul>
          </div>
          <div class="mt-6">
            <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all courses
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>