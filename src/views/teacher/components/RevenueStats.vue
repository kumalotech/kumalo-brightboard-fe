<script setup>
import { DollarSign, TrendingUp, Users, Star } from 'lucide-vue-next'

defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Revenue -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <DollarSign class="h-6 w-6 text-gray-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total Revenue
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                ${{ stats.totalRevenue.toLocaleString() }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Revenue -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <TrendingUp class="h-6 w-6 text-gray-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Monthly Revenue
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                ${{ stats.monthlyRevenue.toLocaleString() }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Total Students -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Users class="h-6 w-6 text-gray-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Total Students
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                {{ stats.totalStudents }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Average Rating -->
    <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <Star class="h-6 w-6 text-gray-400" />
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                Average Rating
              </dt>
              <dd class="text-lg font-medium text-gray-900 dark:text-white">
                {{ stats.averageRating }}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>