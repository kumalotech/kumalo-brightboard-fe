<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'

const teachers = ref([
  {
    id: 1,
    name: 'Dr. Sarah Thompson',
    email: 'sarah.thompson@example.com',
    specialization: 'Web Development',
    courses: 5,
    students: 245,
    rating: 4.8,
    status: 'ACTIVE',
    joinedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    email: 'michael.chen@example.com',
    specialization: 'Data Science',
    courses: 3,
    students: 189,
    rating: 4.9,
    status: 'ACTIVE',
    joinedDate: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    specialization: 'Digital Marketing',
    courses: 4,
    students: 167,
    rating: 4.7,
    status: 'PENDING',
    joinedDate: '2024-02-01',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

const searchQuery = ref('')
const selectedStatus = ref('ALL')
const selectedSpecialization = ref('ALL')
const sortBy = ref('name')
const sortOrder = ref('asc')

const specializations = computed(() => {
  const specs = new Set(teachers.value.map(t => t.specialization))
  return ['ALL', ...Array.from(specs)]
})

const statuses = ['ALL', 'ACTIVE', 'PENDING', 'SUSPENDED']

const filteredTeachers = computed(() => {
  let filtered = teachers.value.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'ALL' || teacher.status === selectedStatus.value
    const matchesSpecialization = selectedSpecialization.value === 'ALL' || 
      teacher.specialization === selectedSpecialization.value
    
    return matchesSearch && matchesStatus && matchesSpecialization
  })

  // Sort teachers
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

const toggleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

const approveTeacher = (teacherId) => {
  const teacher = teachers.value.find(t => t.id === teacherId)
  if (teacher) {
    teacher.status = 'ACTIVE'
  }
}

const suspendTeacher = (teacherId) => {
  const teacher = teachers.value.find(t => t.id === teacherId)
  if (teacher) {
    teacher.status = 'SUSPENDED'
  }
}

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
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Teacher Management</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage and monitor your teaching staff
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <BaseInput
          label="Search teachers"
          v-model="searchQuery"
          placeholder="Search by name or email..."
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Specialization
          </label>
          <select
            v-model="selectedSpecialization"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="spec in specializations" :key="spec" :value="spec">
              {{ spec === 'ALL' ? 'All Specializations' : spec }}
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

        <div class="flex items-end">
          <BaseButton>
            Add New Teacher
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Teachers Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="teacher in filteredTeachers"
        :key="teacher.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center">
            <img
              :src="teacher.image"
              :alt="teacher.name"
              class="h-16 w-16 rounded-full object-cover"
            />
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {{ teacher.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ teacher.specialization }}
              </p>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Courses</p>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {{ teacher.courses }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Students</p>
              <p class="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                {{ teacher.students }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Rating</p>
              <div class="mt-1 flex items-center">
                <span class="text-lg font-medium text-gray-900 dark:text-white mr-1">
                  {{ teacher.rating }}
                </span>
                <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Joined</p>
              <p class="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {{ formatDate(teacher.joinedDate) }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': teacher.status === 'ACTIVE',
                  'bg-yellow-100 text-yellow-800': teacher.status === 'PENDING',
                  'bg-red-100 text-red-800': teacher.status === 'SUSPENDED'
                }"
              >
                {{ teacher.status }}
              </span>
              <div class="flex space-x-2">
                <button
                  v-if="teacher.status === 'PENDING'"
                  @click="approveTeacher(teacher.id)"
                  class="text-sm text-green-600 hover:text-green-900"
                >
                  Approve
                </button>
                <button
                  v-if="teacher.status === 'ACTIVE'"
                  @click="suspendTeacher(teacher.id)"
                  class="text-sm text-red-600 hover:text-red-900"
                >
                  Suspend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>