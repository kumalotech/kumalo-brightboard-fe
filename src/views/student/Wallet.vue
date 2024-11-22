<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { 
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ExternalLink
} from 'lucide-vue-next'

const wallet = ref({
  balance: 1250.00,
  currency: 'USD'
})

const transactions = ref([
  {
    id: 1,
    type: 'DEPOSIT',
    amount: 500,
    date: '2024-02-15',
    status: 'COMPLETED',
    description: 'Wallet top-up',
    reference: 'TXN123456789'
  },
  {
    id: 2,
    type: 'PAYMENT',
    amount: -199,
    date: '2024-02-01',
    status: 'COMPLETED',
    description: 'JavaScript Masterclass Course',
    reference: 'TXN987654321'
  },
  {
    id: 3,
    type: 'DEPOSIT',
    amount: 1000,
    date: '2024-01-15',
    status: 'COMPLETED',
    description: 'Wallet top-up',
    reference: 'TXN456789123'
  }
])

const searchQuery = ref('')
const selectedType = ref('ALL')
const dateRange = ref('ALL')

const types = ['ALL', 'DEPOSIT', 'PAYMENT']
const dateRanges = ['ALL', 'LAST_30_DAYS', 'LAST_3_MONTHS', 'LAST_6_MONTHS', 'THIS_YEAR']

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = selectedType.value === 'ALL' || transaction.type === selectedType.value
    
    let matchesDate = true
    const transactionDate = new Date(transaction.date)
    const today = new Date()
    
    if (dateRange.value === 'LAST_30_DAYS') {
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
      matchesDate = transactionDate >= thirtyDaysAgo
    }
    
    return matchesSearch && matchesType && matchesDate
  })
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: wallet.value.currency,
    signDisplay: 'always'
  }).format(amount)
}

const showTopUpModal = ref(false)
const topUpAmount = ref('')

const handleTopUp = () => {
  if (topUpAmount.value && !isNaN(topUpAmount.value)) {
    const amount = parseFloat(topUpAmount.value)
    wallet.value.balance += amount
    
    transactions.value.unshift({
      id: Date.now(),
      type: 'DEPOSIT',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'COMPLETED',
      description: 'Wallet top-up',
      reference: `TXN${Date.now()}`
    })
    
    showTopUpModal.value = false
    topUpAmount.value = ''
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-teal">Wallet</h1>
      <p class="mt-2 text-sm text-teal/70">
        Manage your wallet balance and view transaction history
      </p>
    </div>

    <!-- Wallet Card -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-primary-100 rounded-lg">
            <Wallet class="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p class="text-sm text-teal/70">Available Balance</p>
            <p class="text-2xl font-bold text-teal">{{ formatAmount(wallet.balance) }}</p>
          </div>
        </div>
        <BaseButton @click="showTopUpModal = true">
          <Plus class="h-4 w-4 mr-2" />
          Top Up Wallet
        </BaseButton>
      </div>
    </div>

    <!-- Transaction History -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-medium text-teal mb-4">Transaction History</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BaseInput
            label="Search transactions"
            v-model="searchQuery"
            placeholder="Search by description or reference..."
          />
          
          <div>
            <label class="block text-sm font-medium text-teal/70 mb-1">
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
            <label class="block text-sm font-medium text-teal/70 mb-1">
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
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in ['Date', 'Description', 'Reference', 'Amount', 'Status']"
                :key="header"
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-teal/70 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in filteredTransactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-teal/70">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <component
                    :is="transaction.type === 'DEPOSIT' ? ArrowUpRight : ArrowDownRight"
                    class="h-4 w-4 mr-2"
                    :class="transaction.type === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'"
                  />
                  <span class="text-sm text-teal">{{ transaction.description }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-teal/70">
                {{ transaction.reference }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="text-sm font-medium"
                  :class="transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'"
                >
                  {{ formatAmount(transaction.amount) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {{ transaction.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Top Up Modal -->
    <div v-if="showTopUpModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h2 class="text-lg font-medium text-teal mb-6">Top Up Wallet</h2>
        
        <form @submit.prevent="handleTopUp" class="space-y-6">
          <BaseInput
            label="Amount"
            type="number"
            v-model="topUpAmount"
            placeholder="Enter amount to top up"
            required
          />

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showTopUpModal = false"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-teal bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Top Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>