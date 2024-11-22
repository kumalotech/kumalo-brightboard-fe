<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { 
  Bars3Icon, 
  BellIcon, 
  XMarkIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const router = useRouter()
const sidebarOpen = ref(false)

const navigation = computed(() => {
  const role = authStore.userRole
  
  const commonItems = [
    { name: 'Messages', href: '/messages', icon: 'MessageSquare' },
    { name: 'Notifications', href: '/notifications', icon: 'Bell' },
    { name: 'Profile', href: '/profile', icon: 'User' }
  ]

  const roleSpecificItems = {
    ADMIN: [
      { name: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
      { name: 'Users', href: '/admin/users', icon: 'Users' },
      { name: 'Revenue', href: '/admin/revenue', icon: 'DollarSign' },
      { name: 'Settings', href: '/admin/settings', icon: 'Settings' }
    ],
    INSTITUTION: [
      { name: 'Dashboard', href: '/institution', icon: 'LayoutDashboard' },
      { name: 'Teachers', href: '/institution/teachers', icon: 'GraduationCap' },
      { name: 'Students', href: '/institution/students', icon: 'Users' },
      { name: 'Settings', href: '/institution/settings', icon: 'Settings' }
    ],
    TEACHER: [
      { name: 'Dashboard', href: '/teacher', icon: 'LayoutDashboard' },
      { name: 'Packages', href: '/teacher/packages', icon: 'Package' },
      { name: 'Sessions', href: '/teacher/sessions', icon: 'Calendar' },
      { name: 'Revenue', href: '/teacher/revenue', icon: 'DollarSign' }
    ],
    STUDENT: [
      { name: 'Dashboard', href: '/student', icon: 'LayoutDashboard' },
      { name: 'Learn', href: '/student/learn', icon: 'BookOpen' },
      { name: 'Payments', href: '/student/payments', icon: 'CreditCard' }
    ]
  }

  return [...(roleSpecificItems[role] || []), ...commonItems]
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Mobile Sidebar -->
    <div 
      v-show="sidebarOpen" 
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
      
      <div class="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white dark:bg-gray-800">
        <div class="flex-1 flex flex-col min-h-0">
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between h-16 px-4 bg-primary-600">
            <span class="text-xl font-bold text-white">BrightBoard</span>
            <button 
              class="text-white"
              @click="sidebarOpen = false"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Sidebar Navigation -->
          <nav class="flex-1 overflow-y-auto">
            <div class="px-2 py-4 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                :class="[
                  $route.path === item.href
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                ]"
                @click="sidebarOpen = false"
              >
                <component
                  :is="item.icon"
                  class="mr-3 h-6 w-6"
                  :class="[
                    $route.path === item.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
                  ]"
                />
                {{ item.name }}
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Static Sidebar -->
    <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
      <div class="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow">
        <!-- Sidebar Header -->
        <div class="flex items-center h-16 px-4 bg-primary-600">
          <span class="text-xl font-bold text-white">BrightBoard</span>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex-1 overflow-y-auto">
          <div class="px-2 py-4 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              :class="[
                $route.path === item.href
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6"
                :class="[
                  $route.path === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400'
                ]"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Top Navigation -->
      <header class="bg-white dark:bg-gray-800 shadow">
        <div class="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <button
            class="lg:hidden"
            @click="sidebarOpen = true"
          >
            <Bars3Icon class="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          <div class="flex items-center space-x-4">
            <button class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <BellIcon class="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>

            <Menu as="div" class="relative">
              <MenuButton class="flex items-center">
                <UserCircleIcon class="h-8 w-8 text-gray-600 dark:text-gray-300" />
              </MenuButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <router-link
                        to="/profile"
                        :class="[
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        ]"
                      >
                        <UserCircleIcon class="mr-3 h-5 w-5" />
                        Profile
                      </router-link>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <router-link
                        to="/settings"
                        :class="[
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        ]"
                      >
                        <CogIcon class="mr-3 h-5 w-5" />
                        Settings
                      </router-link>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="logout"
                        class="w-full text-left"
                        :class="[
                          active ? 'bg-gray-100 dark:bg-gray-600' : '',
                          'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                        ]"
                      >
                        <ArrowRightOnRectangleIcon class="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>