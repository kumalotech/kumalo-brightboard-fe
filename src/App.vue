<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Determine if the current route is a dashboard route
const isDashboardRoute = computed(() => {
  return route.path.startsWith('/admin') ||
         route.path.startsWith('/teacher') ||
         route.path.startsWith('/student') ||
         route.path.startsWith('/institution')
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Only show navbar for non-dashboard routes -->
    <TheNavbar v-if="!isDashboardRoute" />
    
    <!-- Main Content -->
    <main :class="{ 'pt-16': !isDashboardRoute }">
      <RouterView />
    </main>

    <!-- Only show footer for non-dashboard routes -->
    <TheFooter v-if="!isDashboardRoute" />
  </div>
</template>

<style>
#app {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}
</style>