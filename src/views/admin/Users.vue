<script setup>
import { ref, computed } from 'vue'
import BaseButton from '../../components/BaseButton.vue'
import BaseInput from '../../components/BaseInput.vue'
import { 
  PencilIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from '@heroicons/vue/24/outline'

const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    joinedDate: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'TEACHER',
    status: 'PENDING',
    joinedDate: '2024-02-01',
    verified: false
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    role: 'INSTITUTION',
    status: 'ACTIVE',
    joinedDate: '2024-01-20',
    verified: true
  },
  // Add more mock users as needed
])

const searchQuery = ref('')
const selectedRole = ref('ALL')
const selectedStatus = ref('ALL')
const sortBy = ref('name')
const sortOrder = ref('asc')

const roles = ['ALL', 'STUDENT', 'TEACHER', 'INSTITUTION', 'ADMIN']
const statuses = ['ALL', 'ACTIVE', 'PENDING', 'SUSPENDED']

const filteredUsers = computed(() => {
  let filtered = users.value.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesRole = selectedRole.value === 'ALL' || user.role === selectedRole.value
    const matchesStatus = selectedStatus.value === 'ALL' || user.status === selectedStatus.value
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Sort users
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

const verifyUser = (userId) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.verified = true
    user.status = 'ACTIVE'
  }
}

const suspendUser = (userId) => {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    user.status = 'SUSPENDED'
  }
}

const deleteUser = (userId) => {
  const index = users.value.findIndex(u => u.id === userId)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage and monitor user accounts across the platform
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <BaseInput
          label="Search users"
          v-model="searchQuery"
          placeholder="Search by name or email..."
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role
          </label>
          <select
            v-model="selectedRole"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="role in roles" :key="role" :value="role">
              {{ role === 'ALL' ? 'All Roles' : role }}
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
            Add New User
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                v-for="header in ['Name', 'Email', 'Role', 'Status', 'Joined Date', 'Verified', 'Actions']"
                :key="header"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                @click="toggleSort(header.toLowerCase())"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ user.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ user.email }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': user.role === 'TEACHER',
                    'bg-green-100 text-green-800': user.role === 'STUDENT',
                    'bg-purple-100 text-purple-800': user.role === 'INSTITUTION',
                    'bg-red-100 text-red-800': user.role === 'ADMIN'
                  }"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': user.status === 'ACTIVE',
                    'bg-yellow-100 text-yellow-800': user.status === 'PENDING',
                    'bg-red-100 text-red-800': user.status === 'SUSPENDED'
                  }"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ new Date(user.joinedDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="flex items-center">
                  <CheckCircleIcon
                    v-if="user.verified"
                    class="h-5 w-5 text-green-500"
                  />
                  <XCircleIcon
                    v-else
                    class="h-5 w-5 text-red-500"
                  />
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    v-if="!user.verified"
                    @click="verifyUser(user.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Verify
                  </button>
                  <button
                    v-if="user.status !== 'SUSPENDED'"
                    @click="suspendUser(user.id)"
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Suspend
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>