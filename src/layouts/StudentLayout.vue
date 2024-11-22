<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { Menu } from '@headlessui/vue'
import { 
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu as MenuIcon,
  GraduationCap,
  X
} from 'lucide-vue-next'

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
    <div 
      v-show="sidebarOpen" 
      class="fixed inset-0 z-40 lg:hidden"
      @click="sidebarOpen = false"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
      
      <div class="fixed inset-y-0 left-0 flex max-w-xs w-full bg-white">
        <div class="flex-1 flex flex-col min-h-0">
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between h-16 px-4 bg-primary-600">
            <span class="text-xl font-bold text-white">BrightBoard</span>
            <button 
              class="text-white"
              @click="sidebarOpen = false"
            >
              <X class="h-6 w-6" />
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
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-teal hover:bg-primary-50'
                ]"
                @click="sidebarOpen = false"
              >
                <component
                  :is="item.icon"
                  class="mr-3 h-6 w-6"
                  :class="[
                    $route.path === item.href
                      ? 'text-primary-600'
                      : 'text-teal/70 group-hover:text-teal'
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
      <div class="flex flex-col flex-grow bg-white shadow">
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
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-teal hover:bg-primary-50'
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 h-6 w-6"
                :class="[
                  $route.path === item.href
                    ? 'text-primary-600'
                    : 'text-teal/70 group-hover:text-teal'
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
      <header class="bg-white shadow">
        <div class="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <button
            class="lg:hidden"
            @click="sidebarOpen = true"
          >
            <MenuIcon class="h-6 w-6 text-teal" />
          </button>

          <div class="flex items-center space-x-4">
            <Menu as="div" class="relative">
              <Menu.Button class="flex items-center">
                <User class="h-8 w-8 text-teal" />
              </Menu.Button>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <Menu.Items class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div class="py-1">
                    <Menu.Item v-slot="{ active }">
                      <router-link
                        to="/student/profile"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex items-center px-4 py-2 text-sm text-teal'
                        ]"
                      >
                        <User class="mr-3 h-5 w-5" />
                        Profile
                      </router-link>
                    </Menu.Item>
                    <Menu.Item v-slot="{ active }">
                      <button
                        @click="logout"
                        class="w-full text-left"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'flex items-center px-4 py-2 text-sm text-teal'
                        ]"
                      >
                        <LogOut class="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </transition>
            </Menu>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-cream">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>