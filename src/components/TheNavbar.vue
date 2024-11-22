<script setup>
import { ref } from 'vue'
import { BookOpen, LogIn, Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)
</script>

<template>
  <!-- Navbar -->
  <nav class="fixed w-full bg-cream/95 backdrop-blur-sm z-50 border-b border-primary-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <BookOpen class="h-8 w-8 text-primary-500" />
            <span class="ml-2 text-xl font-bold text-teal">BrightBoard</span>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-teal hover:text-primary-500 transition-colors">Home</router-link>
            <router-link to="/packages" class="text-teal hover:text-primary-500 transition-colors">Packages</router-link>
            <router-link to="/about" class="text-teal hover:text-primary-500 transition-colors">About</router-link>
            <router-link to="/help" class="text-teal hover:text-primary-500 transition-colors">Help</router-link>
            <router-link to="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cream bg-primary-500 hover:bg-primary-600 transition-colors">
              <LogIn class="h-4 w-4 mr-2" />
              Sign In
            </router-link>
            <router-link to="/register" class="inline-flex items-center px-4 py-2 border border-primary-500 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors">
              Register
            </router-link>
          </div>

          <div class="md:hidden flex items-center">
            <button
              @click="isMenuOpen = !isMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-teal hover:text-primary-500 hover:bg-primary-50"
            >
              <X v-if="isMenuOpen" class="h-6 w-6" />
              <Menu v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMenuOpen" class="md:hidden bg-cream border-t border-primary-100">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#features" class="block px-3 py-2 text-teal hover:text-primary-500">Features</a>
          <a href="#institutions" class="block px-3 py-2 text-teal hover:text-primary-500">Institutions</a>
          <a href="#teachers" class="block px-3 py-2 text-teal hover:text-primary-500">Teachers</a>
          <a href="#pricing" class="block px-3 py-2 text-teal hover:text-primary-500">Pricing</a>
          <router-link to="/register" class="block w-full text-center px-4 py-2 mb-2 border border-primary-500 text-sm font-medium rounded-md text-primary-500 hover:bg-primary-50 transition-colors">
            Register
          </router-link>
          <router-link to="/login" class="block w-full text-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md text-cream bg-primary-500 hover:bg-primary-600 transition-colors">
            <LogIn class="h-4 w-4 mr-2" />
            Sign In
          </router-link>
        </div>
      </div>
    </nav>
</template>