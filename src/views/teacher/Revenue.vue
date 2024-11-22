<script setup>
import { ref, computed } from 'vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { useNumberInput } from '../../composables/useNumberInput'
import { 
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ExternalLink,
  Banknote,
} from 'lucide-vue-next'

const wallet = ref({
  balance: 1250.00,
  currency: 'USD'
  })

const { preventInvalidNumberInput } = useNumberInput()

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
    currency: 'UGX',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const showWithdrawModal = ref(false)
const withdrawAmount = ref('')

const handleWithdraw = () => {
  if (withdrawAmount.value && !isNaN(withdrawAmount.value)) {
    const amount = parseFloat(withdrawAmount.value)
    if (amount <= wallet.value.balance) {
      wallet.value.balance -= amount
      
      transactions.value.unshift({
        id: Date.now(),
        type: 'PAYMENT',
        amount: -amount,
        date: new Date().toISOString().split('T')[0],
        status: 'COMPLETED',
        description: 'Wallet withdrawal',
        reference: `TXN${Date.now()}`
      })
      
      showWithdrawModal.value = false
      withdrawAmount.value = ''
    }
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
            <p class="text-3xl font-bold text-teal">{{ formatAmount(wallet.balance) }}</p>
          </div>
        </div>
        <div>
          <BaseButton class="bg-teal hover:bg-teal/80" @click="showWithdrawModal = true">
            <Banknote class="h-5 w-5 mr-2" />
            Withdraw from Wallet
          </BaseButton>
        </div>
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
              class="mt-1 block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
              class="mt-1 block w-full rounded-md border-gray-300 py-1.5 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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

    <!-- Withdraw Modal -->
    <div v-if="showWithdrawModal" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay with blur -->
      <div class="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"></div>
      
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all w-full max-w-md p-8">
          <!-- Header -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-teal">Withdraw from Wallet</h2>
            <p class="mt-2 text-sm text-teal/60">Enter the amount you want to withdraw from your wallet</p>
          </div>
          
          <form @submit.prevent="handleWithdraw" class="space-y-8">
            <BaseInput
              label="Amount"
              type="number"
              v-model="withdrawAmount"
              class=" border-teal focus:border-teal focus:ring-teal"
              min="0"
              :max="wallet.balance"
              @keydown="preventInvalidNumberInput"
              required
            />

            <!-- Action Buttons -->
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="showWithdrawModal = false"
                class="px-5 py-2.5 border border-gray-200 text-sm font-medium rounded-lg text-teal hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-teal hover:bg-teal/80 transition-colors shadow-sm"
              >
                Confirm Withdraw
              </button>
            </div>
          </form>

          <!-- Close button -->
          <button 
            @click="showWithdrawModal = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <span class="sr-only">Close</span>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>