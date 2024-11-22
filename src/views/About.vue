<script setup>
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'

const team = ref([
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Education',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
])

const stats = ref([
  { label: 'Founded', value: '2020' },
  { label: 'Employees', value: '100+' },
  { label: 'Countries', value: '50+' },
  { label: 'Students', value: '100,000+' }
])
</script>

<template>
  <div class="bg-cream">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-cream to-secondary-50">
      <div class="absolute inset-0">
        <img
          class="w-full h-[300px] object-cover mix-blend-multiply filter brightness-50"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="About Background"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[300px] flex flex-col justify-center items-center text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          About BrightBoard
        </h1>
        <p class="mt-4 max-w-3xl text-xl text-white">
          Transforming education through technology and innovation
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-teal">Our Mission</h2>
        <p class="mt-4 text-lg text-teal/80 max-w-3xl mx-auto">
          At BrightBoard, we believe that quality education should be accessible to everyone. 
          Our mission is to break down barriers to education and create opportunities for 
          lifelong learning through innovative technology and expert-led instruction.
        </p>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-secondary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="text-center"
          >
            <div class="text-4xl font-bold text-primary-600">{{ stat.value }}</div>
            <div class="mt-2 text-sm font-medium text-teal/70">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-teal">Our Team</h2>
        <p class="mt-4 text-lg text-teal/80">
          Meet the people behind BrightBoard
        </p>
      </div>
      <div class="mt-12 grid gap-12 lg:grid-cols-3">
        <div
          v-for="member in team"
          :key="member.name"
          class="text-center"
        >
          <div class="space-y-4">
            <img
              :src="member.image"
              :alt="member.name"
              class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover"
            />
            <div class="space-y-2">
              <div class="text-lg leading-6 font-medium text-teal">
                {{ member.name }}
              </div>
              <div class="text-primary-600">{{ member.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-teal">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
          <span class="block">Ready to start learning?</span>
          <span class="block text-secondary-200">Join our community today.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <BaseButton>Get Started</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>