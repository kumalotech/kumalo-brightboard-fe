<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu as MenuIcon,
  GraduationCap,
  UserIcon,
  X
} from 'lucide-vue-next'
import brightboardLogo from '../assets/brightboardlogo.svg'

const authStore = useAuthStore()
const router = useRouter()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/student', icon: LayoutDashboard },
  { name: 'Learn', href: '/student/learn', icon: BookOpen },
  { name: 'Courses', href: '/student/courses', icon: GraduationCap },
  { name: 'Wallet', href: '/student/wallet', icon: CreditCard },
  { name: 'Notifications', href: '/student/notifications', icon: Bell },
  { name: 'Profile', href: '/student/profile', icon: User }
]

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Mobile Sidebar -->
    <div v-show="sidebarOpen" class="fixed inset-0 z-40 lg:hidden" @click="sidebarOpen = false">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>

      <div class="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white">
        <div class="flex-1 flex flex-col min-h-0">
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
            <router-link to="/student" class="flex items-center">
              <img :src="brightboardLogo" alt="BrightBoard Logo" class="h-32 w-auto -ml-8 -mt-10 -mb-9" />
            </router-link>
          </div>

          <!-- Sidebar Navigation -->
          <nav class="flex-1 overflow-y-auto">
            <div class="px-2 py-4 space-y-1">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[
                  $route.path === item.href
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-teal hover:bg-primary-50'
                ]" @click="sidebarOpen = false">
                <component :is="item.icon" class="mr-3 h-6 w-6" :class="[
                  $route.path === item.href
                    ? 'text-primary-600'
                    : 'text-teal/70 group-hover:text-teal'
                ]" />
                {{ item.name }}
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <!-- Static Sidebar -->
    <div class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
      <div class="flex flex-col flex-grow bg-white shadow">
        <!-- Sidebar Header -->
        <div class="flex items-center h-16 px-4 bg-white border-b border-gray-200">
          <router-link to="/student" class="flex items-center">
            <img :src="brightboardLogo" alt="BrightBoard Logo" class="h-32 w-auto -ml-8 -mt-10 -mb-9" />
          </router-link>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex-1 overflow-y-auto">
          <div class="px-2 py-4 space-y-1">
            <router-link v-for="item in navigation" :key="item.name" :to="item.href"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="[
                $route.path === item.href
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-teal hover:bg-primary-50'
              ]">
              <component :is="item.icon" class="mr-3 h-6 w-6" :class="[
                $route.path === item.href
                  ? 'text-primary-600'
                  : 'text-teal/70 group-hover:text-teal'
              ]" />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Top Navigation -->
      <header class="bg-white shadow fixed top-0 right-0 left-0 lg:left-64 z-30">
        <div class="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <button class="lg:hidden" @click="sidebarOpen = true">
            <MenuIcon class="h-6 w-6 text-teal" />
          </button>

          <div class="flex items-center space-x-4 ml-auto">
            <router-link to="/student/notifications" class="flex items-center text-teal hover:text-primary-600">
              <Bell class="h-6 w-6" />
            </router-link>
            <div class="relative inline-block text-left">
              <Menu as="div" class="relative inline-block text-left">
                <MenuButton>
                  <div class="h-8 w-8 rounded-full bg-teal text-white flex items-center justify-center">
                    <UserIcon class="h-6 w-6" />
                  </div>
                </MenuButton>
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-56 mc-8 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="px-4 py-3">
                    <p class="text-sm">You signed in as</p>
                    <p class="mt-2 text-sm font-medium text-gray-900">{{ authStore.user.email }}</p>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <router-link 
                        to="/student/profile" 
                        :class="[
                          active ? 'bg-gray-50' : '',
                          'text-sm font-medium text-gray-900 hover:bg-gray-50 block px-4 py-2'
                        ]"
                      >
                        Profile
                      </router-link>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="logout"
                        :class="[
                          active ? 'bg-gray-50' : '',
                          'w-full text-left text-sm font-medium text-gray-900 hover:bg-gray-50 block px-4 py-2'
                        ]"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-cream pt-16">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>