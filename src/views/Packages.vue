<script setup>
import { ref, computed } from 'vue'
import PackageCard from '../components/PackageCard.vue'

const packages = ref([
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Master modern web development with hands-on projects',
    price: '$299',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8,
    students: 15420,
    category: 'Programming',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    description: 'Learn data analysis and machine learning basics',
    price: '$399',
    duration: '16 weeks',
    level: 'Intermediate',
    rating: 4.9,
    students: 12350,
    category: 'Data Science',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'Digital Marketing Masterclass',
    description: 'Comprehensive guide to modern marketing strategies',
    price: '$199',
    duration: '8 weeks',
    level: 'Beginner',
    rating: 4.7,
    students: 18760,
    category: 'Marketing',
    language: 'English',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  }
])

const searchQuery = ref('')
const selectedLevel = ref('All')
const selectedCategory = ref('All')
const selectedDuration = ref('All')
const selectedPriceRange = ref('All')
const sortBy = ref('popularity')

const categories = computed(() => {
  const cats = new Set(packages.value.map(p => p.category))
  return ['All', ...Array.from(cats)]
})

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

const getPriceValue = (price) => parseInt(price.replace('$', ''))

const isInPriceRange = (price, range) => {
  const value = getPriceValue(price)
  switch (range) {
    case 'Under $200': return value < 200
    case '$200 - $300': return value >= 200 && value <= 300
    case '$300 - $400': return value > 300 && value <= 400
    case 'Over $400': return value > 400
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

const filteredPackages = computed(() => {
  let filtered = packages.value.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = selectedLevel.value === 'All' || pkg.level === selectedLevel.value
    const matchesCategory = selectedCategory.value === 'All' || pkg.category === selectedCategory.value
    const matchesDuration = selectedDuration.value === 'All' || isInDurationRange(pkg.duration, selectedDuration.value)
    const matchesPrice = selectedPriceRange.value === 'All' || isInPriceRange(pkg.price, selectedPriceRange.value)
    
    return matchesSearch && matchesLevel && matchesCategory && matchesDuration && matchesPrice
  })

  // Sort the filtered results
  switch (sortBy.value) {
    case 'price-low':
      filtered.sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price))
      break
    case 'price-high':
      filtered.sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price))
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
</script>

<template>
  <div class="min-h-screen bg-cream">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-b from-cream to-secondary-50 overflow-hidden">
      <div class="absolute inset-0">
        <img
          class="w-full h-[300px] object-cover mix-blend-multiply filter brightness-50"
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
          alt="Courses Background"
        />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[300px] flex flex-col justify-center items-center text-center">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Browse Our Courses
        </h1>
        <p class="mt-4 max-w-3xl text-xl text-gray-300">
          Discover our wide range of courses and start your learning journey today
        </p>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <!-- Search -->
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div class="w-3/4">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search courses..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div class="w-1/4 mt-4 md:mt-0">
            <select
              v-model="sortBy"
              class="w-full md:w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <!-- Filter Options -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
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
        </div>
      </div>

      <!-- Results Count -->
      <div class="mt-6 text-teal">
        Showing {{ filteredPackages.length }} courses
      </div>
    </div>

    <!-- Course Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <PackageCard
          v-for="pkg in filteredPackages"
          :key="pkg.id"
          :package="pkg"
        />
      </div>
    </div>
  </div>
</template>