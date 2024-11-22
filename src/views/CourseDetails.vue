<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const course = ref(null)

const curriculum = ref([
  {
    title: 'Getting Started',
    lessons: [
      { title: 'Course Introduction', duration: '10 min' },
      { title: 'Setting Up Your Environment', duration: '15 min' },
      { title: 'Basic Concepts', duration: '20 min' }
    ]
  },
  {
    title: 'Core Concepts',
    lessons: [
      { title: 'Understanding the Fundamentals', duration: '30 min' },
      { title: 'Best Practices', duration: '25 min' },
      { title: 'Hands-on Exercise', duration: '45 min' }
    ]
  },
  {
    title: 'Advanced Topics',
    lessons: [
      { title: 'Advanced Techniques', duration: '40 min' },
      { title: 'Real-world Applications', duration: '35 min' },
      { title: 'Final Project', duration: '60 min' }
    ]
  }
])

const instructor = ref({
  name: 'Dr. Sarah Thompson',
  role: 'Senior Instructor',
  experience: '10+ years',
  students: '15,000+',
  rating: 4.9,
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bio: 'Dr. Thompson is a renowned expert with over a decade of experience in teaching and industry practice. She has helped thousands of students master complex concepts through her practical teaching approach.'
})

onMounted(() => {
  // In a real application, this would fetch course data from an API
  course.value = {
    id: props.id,
    title: 'Web Development Bootcamp',
    description: 'Master modern web development with hands-on projects and real-world applications. This comprehensive course covers everything from basic HTML to advanced JavaScript frameworks.',
    price: '$299',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8,
    students: 15420,
    category: 'Programming',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  }
})

const enrollNow = () => {
  router.push('/register')
}
</script>

<template>
  <div v-if="course" class="min-h-screen bg-cream">
    <!-- Course Header -->
    <div class="relative bg-teal">
      <div class="absolute inset-0">
        <img
          :src="course.image"
          :alt="course.title"
          class="w-full h-[400px] object-cover mix-blend-multiply filter brightness-50"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            {{ course.category }}
          </span>
          <h1 class="mt-4 text-4xl font-extrabold text-cream tracking-tight">
            {{ course.title }}
          </h1>
          <p class="mt-4 text-xl text-cream/80 max-w-3xl">
            {{ course.description }}
          </p>
          <div class="mt-6 flex items-center space-x-6">
            <div class="flex items-center">
              <svg class="text-yellow-400 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="ml-1 text-cream">{{ course.rating }}</span>
            </div>
            <span class="text-cream">{{ course.students.toLocaleString() }} students</span>
            <span class="text-cream">{{ course.duration }}</span>
            <span class="text-cream">{{ course.level }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <!-- Curriculum -->
        <div class="lg:col-span-2">
          <h2 class="text-3xl font-bold text-teal mb-8">
            Course Curriculum
          </h2>
          <div class="space-y-6">
            <div v-for="(section, index) in curriculum" :key="index" class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-medium text-teal">
                  {{ section.title }}
                </h3>
                <div class="mt-4 space-y-4">
                  <div v-for="(lesson, lessonIndex) in section.lessons" :key="lessonIndex" class="flex items-center justify-between">
                    <div class="flex items-center">
                      <svg class="h-5 w-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-teal/80">{{ lesson.title }}</span>
                    </div>
                    <span class="text-teal/60">{{ lesson.duration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div>
          <!-- Pricing Card -->
          <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div class="text-center">
              <div class="text-5xl font-bold text-primary-600">{{ course.price }}</div>
              <div class="mt-4 space-y-4">
                <BaseButton @click="enrollNow" class="w-full text-lg py-3">
                  Enroll Now
                </BaseButton>
                <p class="text-sm text-teal/60">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>

          <!-- Instructor -->
          <h2 class="text-3xl font-bold text-teal mb-8">
            Your Instructor
          </h2>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <img
                :src="instructor.image"
                :alt="instructor.name"
                class="h-16 w-16 rounded-full object-cover"
              />
              <div class="ml-4">
                <h3 class="text-lg font-medium text-teal">
                  {{ instructor.name }}
                </h3>
                <p class="text-primary-600">{{ instructor.role }}</p>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-teal/60">Experience</div>
                <div class="text-lg font-medium text-teal">{{ instructor.experience }}</div>
              </div>
              <div>
                <div class="text-sm text-teal/60">Students</div>
                <div class="text-lg font-medium text-teal">{{ instructor.students }}</div>
              </div>
              <div>
                <div class="text-sm text-teal/60">Rating</div>
                <div class="text-lg font-medium text-teal">{{ instructor.rating }}/5</div>
              </div>
            </div>
            <p class="mt-4 text-teal/80">
              {{ instructor.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>