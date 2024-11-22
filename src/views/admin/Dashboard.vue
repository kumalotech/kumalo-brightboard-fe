<script setup>
import { ref } from 'vue'
import StatsCard from '../../components/dashboard/StatsCard.vue'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp 
} from 'lucide-vue-next'
import RevenueChart from '../../components/dashboard/RevenueChart.vue'
import RecentActivities from '../../components/dashboard/RecentActivities.vue'

const stats = ref([
  {
    title: 'Total Users',
    value: '24,500',
    change: 12,
    icon: Users
  },
  {
    title: 'Active Courses',
    value: '1,245',
    change: 8,
    icon: BookOpen
  },
  {
    title: 'Monthly Revenue',
    value: '$84,320',
    change: 15,
    icon: DollarSign
  },
  {
    title: 'Student Growth',
    value: '18%',
    change: 5,
    icon: TrendingUp
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
    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <RevenueChart />
      <RecentActivities />
    </div>
  </div>
</template>