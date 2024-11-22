<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { format } from 'date-fns'
import BaseInput from '../../components/BaseInput.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Revenue Chart Data
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 45000, 42000, 50000, 75000, 84000],
      borderColor: '#CD4B4B',
      backgroundColor: 'rgba(205, 75, 75, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)'
      },
      ticks: {
        callback: (value) => `$${value.toLocaleString()}`
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
})

// Transactions
const transactions = ref([
  {
    id: 1,
    date: '2024-02-15',
    user: 'John Doe',
    course: 'Web Development Bootcamp',
    amount: 299,
    status: 'COMPLETED'
  },
  {
    id: 2,
    date: '2024-02-14',
    user: 'Sarah Smith',
    course: 'Data Science Fundamentals',
    amount: 399,
    status: 'COMPLETED'
  },
  {
    id: 3,
    date: '2024-02-14',
    user: 'Michael Johnson',
    course: 'Digital Marketing',
    amount: 199,
    status: 'PENDING'
  },
  {
    id: 4,
    date: '2024-02-13',
    user: 'Emily Brown',
    course: 'UI/UX Design',
    amount: 249,
    status: 'COMPLETED'
  },
  {
    id: 5,
    date: '2024-02-13',
    user: 'David Wilson',
    course: 'Python Programming',
    amount: 299,
    status: 'REFUNDED'
  }
])

// Filters
const searchQuery = ref('')
const selectedStatus = ref('ALL')
const dateRange = ref('ALL')

const statuses = ['ALL', 'COMPLETED', 'PENDING', 'REFUNDED']
const dateRanges = ['ALL', 'TODAY', 'LAST_7_DAYS', 'LAST_30_DAYS', 'THIS_MONTH']

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const matchesSearch = 
      transaction.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      transaction.course.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'ALL' || transaction.status === selectedStatus.value
    
    // Date filtering logic can be expanded based on dateRange.value
    
    return matchesSearch && matchesStatus
  })
})

const totalRevenue = computed(() => {
  return filteredTransactions.value
    .filter(t => t.status === 'COMPLETED')
    .reduce((sum, t) => sum + t.amount, 0)
})

const formatDate = (dateString) => {
  return format(new Date(dateString), 'MMM dd, yyyy')
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
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Revenue Management</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Track and analyze platform revenue and transactions
      </p>
    </div>

    <!-- Revenue Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
        <div class="h-80">
          <Line
            :data="revenueData"
            :options="chartOptions"
          />
        </div>
      </div>

      <!-- Revenue Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Revenue Statistics</h2>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p class="text-3xl font-bold text-primary-600">${{ totalRevenue.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Average Transaction</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              ${{ Math.round(totalRevenue / filteredTransactions.length).toLocaleString() }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Transaction Count</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ filteredTransactions.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <!-- Filters -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BaseInput
            label="Search transactions"
            v-model="searchQuery"
            placeholder="Search by user or course..."
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
              Date Range
            </label>
            <select
              v-model="dateRange"
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
                v-for="header in ['Date', 'User', 'Course', 'Amount', 'Status']"
                :key="header"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ transaction.user }}
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
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
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
  </div>
</template>