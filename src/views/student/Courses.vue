<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { Search, Filter } from 'lucide-vue-next'

const router = useRouter()

const courses = ref([
  {
    id: 1,
    title: 'Web Development Bootcamp',
    instructor: 'Dr. Sarah Thompson',
    description: 'Master modern web development with hands-on projects and real-world applications.',
    price: 299,
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Programming',
    rating: 4.8,
    students: 15420,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    instructor: 'Prof. Michael Chen',
    description: 'Learn data analysis and machine learning basics with practical examples.',
    price: 399,
    duration: '16 weeks',
    level: 'Intermediate',
    category: 'Data Science',
    rating: 4.9,
    students: 12350,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    id: 3,
    title: 'Digital Marketing Masterclass',
    instructor: 'Emily Rodriguez',
    description: 'Comprehensive guide to modern marketing strategies and techniques.',
    price: 199,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Marketing',
    rating: 4.7,
    students: 18760,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
  }
])

// Filters
const searchQuery = ref('')
const selectedLevel = ref('All')
const selectedCategory = ref('All')
const selectedDuration = ref('All')
const selectedPriceRange = ref('All')
const sortBy = ref('popularity')

const categories = computed(() => {
  const cats = new Set(courses.value.map(p => p.category))
  return ['All', ...Array.from(cats)]
})

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

const durations = [
  'All',
  '8-10 weeks',
  '11-14 weeks',
  '15+ weeks'
]

const priceRanges = [
  'All',
  'Under $200',
  '$200 - $300',
  '$300 - $400',
  'Over $400'
]

const isInPriceRange = (price, range) => {
  switch (range) {
    case 'Under $200': return price < 200
    case '$200 - $300': return price >= 200 && price <= 300
    case '$300 - $400': return price > 300 && price <= 400
    case 'Over $400': return price > 400
    default: return true
  }
}

const isInDurationRange = (duration, range) => {
  const weeks = parseInt(duration)
  switch (range) {
    case '8-10 weeks': return weeks >= 8 && weeks <= 10
    case '11-14 weeks': return weeks >= 11 && weeks <= 14
    case '15+ weeks': return weeks >= 15
    default: return true
  }
}

const filteredCourses = computed(() => {
  let filtered = courses.value.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = selectedLevel.value === 'All' || course.level === selectedLevel.value
    const matchesCategory = selectedCategory.value === 'All' || course.category === selectedCategory.value
    const matchesDuration = selectedDuration.value === 'All' || isInDurationRange(course.duration, selectedDuration.value)
    const matchesPrice = selectedPriceRange.value === 'All' || isInPriceRange(course.price, selectedPriceRange.value)
    
    return matchesSearch && matchesLevel && matchesCategory && matchesDuration && matchesPrice
  })

  // Sort the filtered results
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'popularity':
      filtered.sort((a, b) => b.students - a.students)
      break
  }

  return filtered
})

const viewCourseDetails = (courseId) => {
  router.push(`/course/${courseId}`)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-teal">Available Courses</h1>
      <p class="mt-2 text-sm text-teal/70">
        Browse and enroll in our wide range of courses
      </p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Search -->
        <div class="col-span-full">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-teal/50" />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search courses..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <!-- Filter Options -->
        <select
          v-model="selectedCategory"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        >
          <option v-for="category in categories" :key="category" :value="category">
            {{ category === 'All' ? 'All Categories' : category }}
          </option>
        </select>

        <select
          v-model="selectedLevel"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        >
          <option v-for="level in levels" :key="level" :value="level">
            {{ level === 'All' ? 'All Levels' : level }}
          </option>
        </select>

        <select
          v-model="selectedDuration"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        >
          <option v-for="duration in durations" :key="duration" :value="duration">
            {{ duration === 'All' ? 'All Durations' : duration }}
          </option>
        </select>

        <select
          v-model="selectedPriceRange"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        >
          <option v-for="range in priceRanges" :key="range" :value="range">
            {{ range === 'All' ? 'All Prices' : range }}
          </option>
        </select>

        <select
          v-model="sortBy"
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="popularity">Sort by Popularity</option>
          <option value="rating">Sort by Rating</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Course Grid -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex h-48 md:h-64">
          <div class="w-1/3">
            <img
              :src="course.image"
              :alt="course.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-2/3 p-6 flex flex-col">
            <div>
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {{ course.category }}
                </span>
                <span class="inline-flex items-center text-sm text-teal/70">
                  <span class="mr-1">{{ course.rating }}</span>
                  <svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </div>
              
              <h3 class="mt-2 text-lg font-medium text-teal">{{ course.title }}</h3>
              <p class="mt-1 text-sm text-teal/70">{{ course.description }}</p>
            </div>

            <div class="mt-auto">
              <div class="flex items-center justify-between mb-4">
                <div class="text-sm text-teal/70">
                  <div>{{ course.duration }}</div>
                  <div>{{ course.level }}</div>
                </div>
                <div class="text-xl font-bold text-primary-600">${{ course.price }}</div>
              </div>

              <BaseButton
                @click="viewCourseDetails(course.id)"
                class="w-full"
              >
                View Course
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredCourses.length === 0"
      class="text-center py-12"
    >
      <Filter class="mx-auto h-12 w-12 text-teal/50" />
      <h3 class="mt-2 text-sm font-medium text-teal">No courses found</h3>
      <p class="mt-1 text-sm text-teal/70">
        Try adjusting your filters or search query
      </p>
    </div>
  </div>
</template>