<script setup>
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube, X } from 'lucide-vue-next'

const statsSection = [
  { id: 1, name: 'Active Students', value: '10,000+' },
  { id: 2, name: 'Qualified Teachers', value: '500+' },
  { id: 3, name: 'Partner Institutions', value: '50+' },
  { id: 4, name: 'Live Sessions Daily', value: '200+' },
];

const footerSections = [
  {
    title: 'Product',
    links: [
      { text: 'Features', href: '#features' },
      { text: 'Pricing', href: '#pricing' },
      { text: 'Demo', href: '#demo' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', href: '#about' },
      { text: 'Careers', href: '#careers' },
      { text: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy', href: '#privacy' },
      { text: 'Terms', href: '#terms' },
    ],
  },
];

const socialIcons = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
};
</script>

<template>
  <!-- Footer -->
  <footer class="bg-cream">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1">
          <div class="flex items-center">
            <BookOpen class="h-8 w-8 text-primary-500" />
            <span class="ml-2 text-xl font-bold text-teal">BrightBoard</span>
          </div>
          <p class="mt-4 text-teal/70 text-sm">
            Transforming education through technology and innovation.
          </p>
        </div>
        <div v-for="(section, index) in footerSections" :key="index">
          <h3 class="text-sm font-semibold text-teal/50 tracking-wider uppercase">{{ section.title }}</h3>
          <ul class="mt-4 space-y-4">
            <li v-for="link in section.links" :key="link.text">
              <a :href="link.href" class="text-base text-teal/70 hover:text-primary-500">{{ link.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-8 border-t border-teal/10 pt-8 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          <a v-for="(icon, name) in socialIcons" :key="name" href="#" class="text-teal/50 hover:text-primary-500">
            <component :is="icon" class="h-6 w-6" />
          </a>
        </div>
        <p class="mt-8 text-base text-teal/50 md:mt-0 md:order-1">
          &copy; {{ new Date().getFullYear() }} BrightBoard. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>