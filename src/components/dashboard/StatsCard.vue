<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <component
            :is="icon"
            class="h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {{ title }}
            </dt>
            <dd>
              <div class="text-lg font-medium text-gray-900 dark:text-white">
                {{ value }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 dark:bg-gray-700 px-5 py-3">
      <div class="text-sm">
        <span
          :class="[
            change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
            'font-medium'
          ]"
        >
          {{ change > 0 ? '+' : '' }}{{ change }}%
        </span>
        <span class="text-gray-500 dark:text-gray-400 ml-2">from previous period</span>
      </div>
    </div>
  </div>
</template>