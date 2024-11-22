<script setup>
import BaseInput from '../../../components/BaseInput.vue'

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
  searchQuery: String,
  selectedStatus: String,
  dateRange: String,
  dateRanges: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:searchQuery', 'update:selectedStatus', 'update:dateRange'])

const statuses = ['ALL', 'COMPLETED', 'PENDING', 'REFUNDED']

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'REFUNDED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
    <!-- Filters -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BaseInput
          label="Search transactions"
          :model-value="searchQuery"
          @update:model-value="emit('update:searchQuery', $event)"
          placeholder="Search by student or course..."
        />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            :value="selectedStatus"
            @input="emit('update:selectedStatus', $event.target.value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status === 'ALL' ? 'All Statuses' : status }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <select
            :value="dateRange"
            @input="emit('update:dateRange', $event.target.value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="range in dateRanges" :key="range" :value="range">
              {{ range.replace('_', ' ').toLowerCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="header in ['Date', 'Student', 'Course', 'Amount', 'Status']"
              :key="header"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(transaction.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ transaction.student }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ transaction.course }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                ${{ transaction.amount }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="getStatusColor(transaction.status)"
              >
                {{ transaction.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>