<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'

const students = ref([
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    enrolledCourses: 3,
    progress: 75,
    status: 'ACTIVE',
    joinedDate: '2024-01-15',
    lastActive: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    enrolledCourses: 2,
    progress: 45,
    status: 'ACTIVE',
    joinedDate: '2024-01-20',
    lastActive: '2024-02-14',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Carol Martinez',
    email: 'carol@example.com',
    enrolledCourses: 4,
    progress: 90,
    status: 'ACTIVE',
    joinedDate: '2024-02-01',
    lastActive: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    enrolledCourses: 1,
    progress: 15,
    status: 'INACTIVE',
    joinedDate: '2024-01-25',
    lastActive: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

const searchQuery = ref('')
const selectedStatus = ref('ALL')
const progressFilter = ref('ALL')
const sortBy = ref('name')
const sortOrder = ref('asc')

const statuses = ['ALL', 'ACTIVE', 'INACTIVE']
const progressRanges = ['ALL', '0-25', '26-50', '51-75', '76-100']

const filteredStudents = computed(() => {
  let filtered = students.value.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'ALL' || student.status === selectedStatus.value
    
    let matchesProgress = true
    if (progressFilter.value !== 'ALL') {
      const [min, max] = progressFilter.value.split('-').map(Number)
      matchesProgress = student.progress >= min && student.progress <= max
    }
    
    return matchesSearch && matchesStatus && matchesProgress
  })

  // Sort students
  filtered.sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })

  return filtered
})

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

const deactivateStudent = (studentId) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    student.status = 'INACTIVE'
  }
}

const activateStudent = (studentId) => {
  const student = students.value.find(s => s.id === studentId)
  if (student) {
    student.status = 'ACTIVE'
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Student Management</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage and monitor student enrollments and progress
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <BaseInput
          label="Search students"
          v-model="searchQuery"
          placeholder="Search by name or email..."
        />
        
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
            Progress
          </label>
          <select
            v-model="progressFilter"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="range in progressRanges" :key="range" :value="range">
              {{ range === 'ALL' ? 'All Progress' : `${range}%` }}
            </option>
          </select>
        </div>

        <div class="flex items-end">
          <BaseButton>
            Add New Student
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Students Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <!-- Student Header -->
          <div class="flex items-center">
            <img
              :src="student.image"
              :alt="student.name"
              class="h-16 w-16 rounded-full object-cover"
            />
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ student.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ student.email }}
              </p>
            </div>
          </div>

          <!-- Student Stats -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {{ student.enrolledCourses }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Overall Progress</p>
              <div class="mt-1">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      class="h-2.5 rounded-full"
                      :class="getProgressColor(student.progress)"
                      :style="{ width: `${student.progress}%` }"
                    ></div>
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {{ student.progress }}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Joined</p>
              <p class="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(student.joinedDate) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
              <p class="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(student.lastActive) }}
              </p>
            </div>
          </div>

          <!-- Status and Actions -->
          <div class="mt-6">
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': student.status === 'ACTIVE',
                  'bg-red-100 text-red-800': student.status === 'INACTIVE'
                }"
              >
                {{ student.status }}
              </span>
              <div class="flex space-x-2">
                <button
                  v-if="student.status === 'INACTIVE'"
                  @click="activateStudent(student.id)"
                  class="text-sm text-green-600 hover:text-green-900"
                >
                  Activate
                </button>
                <button
                  v-if="student.status === 'ACTIVE'"
                  @click="deactivateStudent(student.id)"
                  class="text-sm text-red-600 hover:text-red-900"
                >
                  Deactivate
                </button>
                <button
                  class="text-sm text-primary-600 hover:text-primary-900"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>