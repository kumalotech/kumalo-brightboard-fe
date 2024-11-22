<script setup>
import { ref } from 'vue'
import StatsCard from '../../components/dashboard/StatsCard.vue'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp,
  Building,
  Book,
  User,
} from 'lucide-vue-next'
import RevenueChart from '../../components/dashboard/RevenueChart.vue'
import RecentActivities from '../../components/dashboard/RecentActivities.vue'

const stats = ref([
  {
    title: 'Total Institutions',
    value: '24,500',
    change: 12,
    icon: Building
  },
  {
    title: 'Total Teachers',
    value: '1,245',
    change: 8,
    icon: Users
  },
  {
    title: 'Total Students',
    value: '1,245',
    change: 15,
    icon: Users
  },
  {
    title: 'Active Courses',
    value: '18%',
    change: 5,
    icon: Book
  }
])
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        v-bind="stat"
      />
    </div>

    <!-- Charts and Recent Activities -->
    <div class="mt-8 grid grid-cols-12 gap-6">
      <div class="col-span-8">
        <RevenueChart />
      </div>
      <div class="col-span-4">
        <div class="p-4 bg-white rounded-lg shadow mb-4 flex items-center">
          <DollarSign class="h-6 w-6 mr-4" />
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Revenue Balance</h2>
            <p class="text-2xl font-bold">UGX 3,000,000</p>
          </div>
        </div>
        <div class="mt-8">
          <RecentActivities />
        </div>
      </div>
    </div>
  </div>
</template>