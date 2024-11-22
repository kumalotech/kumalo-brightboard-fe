<template>
  <div class="min-h-screen bg-cream">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-cream to-secondary-50 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-16">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="text-center lg:text-left">
                <div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 mb-8">
                  <GraduationCap class="h-5 w-5 text-primary-500" />
                  <span class="ml-2 text-sm font-medium text-primary-500">
                    Next-Gen Learning Platform
                  </span>
                </div>
                
                <h1 class="text-4xl tracking-tight font-extrabold text-teal sm:text-5xl md:text-6xl">
                  <span class="block animate-fade-in-up">Transform Education with</span>
                  <span class="block text-primary-500 animate-fade-in-up-delay">
                    Interactive Learning
                  </span>
                </h1>

                <p class="mt-6 text-lg text-teal/80 sm:text-xl max-w-2xl animate-fade-in-up-delay-2">
                  Connect teachers and students through live sessions, recorded content, and interactive learning materials. Empower your institution with modern educational tools.
                </p>

                <div class="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up-delay-3">
                  <a
                    href="#get-started"
                    class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-cream bg-primary-500 hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                    <ArrowRight class="ml-2 h-5 w-5" />
                  </a>
                  <a
                    href="#demo"
                    class="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-500 text-base font-medium rounded-lg text-primary-500 bg-transparent hover:bg-primary-50 transition-all duration-200"
                  >
                    Watch Demo
                    <Video class="ml-2 h-5 w-5" />
                  </a>
                </div>

                <div class="mt-12 grid grid-cols-3 gap-8 items-center justify-center lg:justify-start">
                  <div
                    v-for="(stat, index) in stats"
                    :key="index"
                    class="flex flex-col items-center lg:items-start animate-fade-in-up-delay-4"
                  >
                    <component :is="stat.icon" class="h-6 w-6 text-secondary-500 mb-2" />
                    <span class="text-sm text-teal/80">{{ stat.text }}</span>
                  </div>
                </div>
              </div>

              <div class="relative lg:block animate-fade-in">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-2xl transform rotate-3"></div>
                  <img
                    class="relative rounded-2xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.02]"
                    src="https://images.unsplash.com/photo-1613905780946-26b73b6f6e11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                    alt="Students engaged in interactive learning"
                  />
                  <div class="absolute -top-4 -right-4 overflow-hidden rounded-2xl shadow-xl w-32 h-32 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                    <img
                      class="w-full h-full object-cover"
                      src="https://images.unsplash.com/photo-1544717684-1243da23b545?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Teacher explaining concept"
                    />
                  </div>
                  <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-cream font-bold text-lg transform rotate-12">
                    New!
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="pb-24 bg-gradient-to-b from-secondary-50 to-cream">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-500 font-semibold tracking-wide uppercase">
            Powerful Features
          </h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-teal sm:text-4xl">
            Everything you need to excel in online education
          </p>
          <p class="mt-4 max-w-2xl text-xl text-teal/80 lg:mx-auto">
            A comprehensive platform designed for modern education delivery, packed with features that make teaching and learning easier.
          </p>
        </div>

        <div class="mt-20">
          <div class="grid lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 grid md:grid-cols-2 gap-8">
              <div
                v-for="(feature, index) in features"
                :key="feature.name"
                class="relative p-6 bg-cream rounded-xl shadow-md transition-all duration-300 cursor-pointer hover:shadow-xl border-2"
                :class="{ 'border-primary-500 shadow-xl': activeFeature === index, 'border-transparent': activeFeature !== index }"
                @mouseenter="activeFeature = index"
              >
                <div class="flex items-center">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-cream">
                    <component :is="feature.icon" class="h-6 w-6" />
                  </div>
                  <h3 class="ml-4 text-xl font-semibold text-teal">{{ feature.name }}</h3>
                </div>
                <p class="mt-4 text-teal/80">{{ feature.description }}</p>
                
                <div class="mt-4 space-y-2">
                  <div
                    v-for="benefit in feature.benefits"
                    :key="benefit"
                    class="flex items-center text-sm text-teal/70"
                  >
                    <CheckCircle class="h-4 w-4 text-secondary-500 mr-2" />
                    {{ benefit }}
                  </div>
                </div>

                <div class="mt-6">
                  <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600"
                  >
                    Learn more
                    <ArrowRight class="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div class="hidden lg:block" v-if="features[activeFeature]">
              <div class="sticky top-24 bg-primary-500 rounded-xl p-8 text-cream">
                <component :is="features[activeFeature].icon" class="h-12 w-12 mb-6" />
                <h3 class="text-2xl font-bold mb-4">
                  {{ features[activeFeature].name }}
                </h3>
                <p class="text-primary-100 mb-6">
                  {{ features[activeFeature].description }}
                </p>
                <div class="space-y-4">
                  <div
                    v-for="benefit in features[activeFeature].benefits"
                    :key="benefit"
                    class="flex items-center"
                  >
                    <CheckCircle class="h-5 w-5 text-primary-300 mr-3" />
                    <span class="text-primary-100">{{ benefit }}</span>
                  </div>
                </div>
                <button class="mt-8 w-full bg-cream text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-teal">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-cream sm:text-4xl">
            Trusted by leading institutions
          </h2>
          <p class="mt-3 text-xl text-secondary-200 sm:mt-4">
            Join thousands of students and teachers already using BrightBoard
          </p>
        </div>
        <dl class="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          <div v-for="stat in statsSection" :key="stat.id" class="flex flex-col">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-secondary-200">
              {{ stat.name }}
            </dt>
            <dd class="order-1 text-5xl font-extrabold text-cream">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  BookOpen,
  Users,
  Video,
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  LogIn,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-vue-next';

const isMenuOpen = ref(false);
const activeFeature = ref(0);

const stats = [
  { icon: Users, text: '10,000+ Students' },
  { icon: BookOpen, text: '500+ Courses' },
  { icon: GraduationCap, text: '50+ Institutions' },
];

const features = [
  {
    name: 'Live Sessions',
    description: 'Connect with students in real-time through high-quality video conferencing with interactive whiteboards and screen sharing.',
    icon: Video,
    benefits: [
      'HD video quality',
      'Interactive whiteboard',
      'Screen sharing',
      'Real-time chat',
    ],
  },
  {
    name: 'Recorded Content',
    description: 'Access a comprehensive library of recorded sessions and educational materials anytime, anywhere.',
    icon: BookOpen,
    benefits: [
      'Unlimited storage',
      'Smart search',
      'Categorized content',
      'Download options',
    ],
  },
  {
    name: 'Institution Management',
    description: 'Powerful tools for schools to efficiently manage teachers, students, and educational content.',
    icon: Users,
    benefits: [
      'User management',
      'Role-based access',
      'Analytics dashboard',
      'Progress tracking',
    ],
  },
  {
    name: 'Flexible Scheduling',
    description: 'Plan and organize sessions according to your institution\'s needs with smart scheduling tools.',
    icon: Clock,
    benefits: [
      'Calendar integration',
      'Automated reminders',
      'Conflict detection',
      'Batch scheduling',
    ],
  },
  {
    name: 'Enterprise Security',
    description: 'Enterprise-grade security ensuring your educational content and user data stays protected.',
    icon: Shield,
    benefits: [
      'End-to-end encryption',
      'GDPR compliance',
      'Regular backups',
      'Access controls',
    ],
  },
  {
    name: 'Smart Payments',
    description: 'Streamlined payment system for easy package enrollment and revenue management.',
    icon: CreditCard,
    benefits: [
      'Multiple payment methods',
      'Automated billing',
      'Revenue splitting',
      'Transaction history',
    ],
  },
];

const statsSection = [
  { id: 1, name: 'Active Students', value: '10,000+' },
  { id: 2, name: 'Qualified Teachers', value: '500+' },
  { id: 3, name: 'Partner Institutions', value: '50+' },
  { id: 4, name: 'Live Sessions Daily', value: '200+' },
];
</script>