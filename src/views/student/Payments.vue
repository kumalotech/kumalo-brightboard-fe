<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import { 
  CreditCard, 
  Download,
  ExternalLink
} from 'lucide-vue-next'

const payments = ref([
  {
    id: 1,
    course: 'Web Development Bootcamp',
    amount: 299,
    date: '2024-02-15',
    status: 'COMPLETED',
    paymentMethod: 'Credit Card (**** 4242)',
    transactionId: 'TXN123456789',
    invoiceUrl: '#'
  },
  {
    id: 2,
    course: 'JavaScript Masterclass',
    amount: 199,
    date: '2024-02-01',
    status: 'COMPLETED',
    paymentMethod: 'PayPal',
    transactionId: 'TXN987654321',
    invoiceUrl: '#'
  },
  {
    id: 3,
    course: 'React for Beginners',
    amount: 249,
    date: '2024-01-15',
    status: 'REFUNDED',
    paymentMethod: 'Credit Card (**** 5555)',
    transactionId: 'TXN456789123',
    invoiceUrl: '#'
  }
])

const paymentMethods = ref([
  {
    id: 1,
    type: 'VISA',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '2025',
    isDefault: true
  },
  {
    id: 2,
    type: 'MASTERCARD',
    last4: '5555',
    expiryMonth: '08',
    expiryYear: '2024',
    isDefault: false
  }
])

const searchQuery = ref('')
const selectedStatus = ref('ALL')
const dateRange = ref('ALL')

const statuses = ['ALL', 'COMPLETED', 'PENDING', 'REFUNDED']
const dateRanges = ['ALL', 'LAST_30_DAYS', 'LAST_3_MONTHS', 'LAST_6_MONTHS', 'THIS_YEAR']

const filteredPayments = computed(() => {
  return payments.value.filter(payment => {
    const matchesSearch = 
      payment.course.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'ALL' || payment.status === selectedStatus.value
    
    // Date filtering logic can be expanded based on dateRange.value
    let matchesDate = true
    const paymentDate = new Date(payment.date)
    const today = new Date()
    
    if (dateRange.value === 'LAST_30_DAYS') {
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
      matchesDate = paymentDate >= thirtyDaysAgo
    }
    // Add more date filtering logic as needed
    
    return matchesSearch && matchesStatus && matchesDate
  })
})

const totalSpent = computed(() => {
  return payments.value
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0)
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
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

const showAddPaymentMethod = ref(false)
const newPaymentMethod = ref({
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: ''
})

const addPaymentMethod = () => {
  // In a real application, this would make an API call to add the payment method
  showAddPaymentMethod.value = false
  newPaymentMethod.value = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  }
}

const setDefaultPaymentMethod = (methodId) => {
  paymentMethods.value = paymentMethods.value.map(method => ({
    ...method,
    isDefault: method.id === methodId
  }))
}

const removePaymentMethod = (methodId) => {
  paymentMethods.value = paymentMethods.value.filter(method => method.id !== methodId)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Payments & Billing</h1>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Manage your payment methods and view transaction history
      </p>
    </div>

    <!-- Payment Methods -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h2>
        <button
          @click="showAddPaymentMethod = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Add Payment Method
        </button>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="method in paymentMethods"
          :key="method.id"
          class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center">
              <CreditCard class="h-5 w-5 text-gray-400 mr-2" />
              <span class="font-medium text-gray-900 dark:text-white">
                {{ method.type }}
              </span>
            </div>
            <span
              v-if="method.isDefault"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              Default
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            **** {{ method.last4 }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Expires {{ method.expiryMonth }}/{{ method.expiryYear }}
          </p>
          <div class="mt-4 flex justify-end space-x-3">
            <button
              v-if="!method.isDefault"
              @click="setDefaultPaymentMethod(method.id)"
              class="text-sm text-primary-600 hover:text-primary-500"
            >
              Set as Default
            </button>
            <button
              @click="removePaymentMethod(method.id)"
              class="text-sm text-red-600 hover:text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Transaction History</h2>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Total Spent: <span class="font-medium text-gray-900 dark:text-white">${{ totalSpent }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BaseInput
            label="Search transactions"
            v-model="searchQuery"
            placeholder="Search by course or transaction ID..."
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

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                v-for="header in ['Date', 'Course', 'Amount', 'Payment Method', 'Status', 'Actions']"
                :key="header"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="payment in filteredPayments" :key="payment.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(payment.date) }}
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ payment.course }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ payment.transactionId }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  ${{ payment.amount }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ payment.paymentMethod }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusColor(payment.status)"
                >
                  {{ payment.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div class="flex space-x-3">
                  <a
                    :href="payment.invoiceUrl"
                    class="text-primary-600 hover:text-primary-900 flex items-center"
                    target="_blank"
                  >
                    <Download class="h-4 w-4 mr-1" />
                    Invoice
                  </a>
                  <button
                    class="text-primary-600 hover:text-primary-900 flex items-center"
                  >
                    <ExternalLink class="h-4 w-4 mr-1" />
                    Details
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Payment Method Modal -->
    <div v-if="showAddPaymentMethod" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Add Payment Method</h2>
        
        <form @submit.prevent="addPaymentMethod" class="space-y-6">
          <BaseInput
            label="Card Number"
            v-model="newPaymentMethod.cardNumber"
            placeholder="**** **** **** ****"
            required
          />

          <div class="grid grid-cols-3 gap-4">
            <BaseInput
              label="Month"
              v-model="newPaymentMethod.expiryMonth"
              placeholder="MM"
              required
            />
            <BaseInput
              label="Year"
              v-model="newPaymentMethod.expiryYear"
              placeholder="YY"
              required
            />
            <BaseInput
              label="CVV"
              v-model="newPaymentMethod.cvv"
              type="password"
              placeholder="***"
              required
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddPaymentMethod = false"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>