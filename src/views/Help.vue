<script setup>
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'

const faqs = ref([
  {
    question: 'How do I get started?',
    answer: 'Sign up for an account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately after enrollment.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all our courses if you are not satisfied with your learning experience.'
  },
  {
    question: 'How do I access my courses?',
    answer: 'After enrolling, you can access your courses through your dashboard. All course content is available 24/7 from any device.'
  }
])

const categories = ref([
  { name: 'Getting Started', icon: '🚀' },
  { name: 'Account & Billing', icon: '💳' },
  { name: 'Course Access', icon: '📚' },
  { name: 'Technical Support', icon: '🔧' }
])
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-cream to-secondary-50">
      <div class="absolute inset-0">
        <img
          class="w-full h-[300px] object-cover mix-blend-multiply filter brightness-50"
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Support Background"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[300px] flex flex-col justify-center items-center text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          How can we help?
        </h1>
        <p class="mt-4 max-w-3xl text-xl text-white">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>
    </div>

    <!-- Help Categories -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div
          v-for="category in categories"
          :key="category.name"
          class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center cursor-pointer"
        >
          <div class="text-4xl mb-3">{{ category.icon }}</div>
          <h3 class="text-lg font-medium text-teal">
            {{ category.name }}
          </h3>
        </div>
      </div>
    </div>

    <!-- FAQs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-teal text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div class="max-w-3xl mx-auto">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="mb-8 bg-white rounded-lg shadow-sm p-6"
        >
          <h3 class="text-lg font-medium text-teal mb-2">
            {{ faq.question }}
          </h3>
          <p class="text-teal/80">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-secondary-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-teal">
            Still need help?
          </h2>
          <p class="mt-4 text-lg text-teal/80">
            Our support team is here to assist you
          </p>
          <div class="mt-8">
            <BaseButton class="mx-auto">Contact Support</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>