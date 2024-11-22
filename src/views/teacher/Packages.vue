<script setup>
import { ref } from 'vue'
import PackageCard from './components/PackageCard.vue'
import PackageForm from './components/PackageForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showCreateForm = ref(false)

const packages = ref([
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Comprehensive guide to modern web development',
    price: 299,
    duration: '12 weeks',
    level: 'Beginner',
    students: 245,
    rating: 4.8,
    status: 'PUBLISHED',
    lastUpdated: '2024-02-15',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    title: 'JavaScript Masterclass',
    description: 'Advanced JavaScript concepts and patterns',
    price: 199,
    duration: '8 weeks',
    level: 'Advanced',
    students: 156,
    rating: 4.9,
    status: 'PUBLISHED',
    lastUpdated: '2024-02-10',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'React for Beginners',
    description: 'Start building modern web applications with React',
    price: 249,
    duration: '10 weeks',
    level: 'Beginner',
    students: 178,
    rating: 4.7,
    status: 'DRAFT',
    lastUpdated: '2024-02-14',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
  }
])

const handleCreatePackage = (packageData) => {
  const newPackage = {
    id: packages.value.length + 1,
    ...packageData,
    students: 0,
    rating: 0,
    status: 'DRAFT',
    lastUpdated: new Date().toISOString().split('T')[0]
  }
  packages.value.unshift(newPackage)
  showCreateForm.value = false
}

const handleEditPackage = (packageId) => {
  router.push(`/teacher/packages/${packageId}/edit`)
}

const handleDeletePackage = (packageId) => {
  packages.value = packages.value.filter(pkg => pkg.id !== packageId)
}

const handlePublishPackage = (packageId) => {
  const pkg = packages.value.find(p => p.id === packageId)
  if (pkg) {
    pkg.status = 'PUBLISHED'
    pkg.lastUpdated = new Date().toISOString().split('T')[0]
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Course Packages</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your course packages and materials
          </p>
        </div>
        <button
          @click="showCreateForm = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create New Package
        </button>
      </div>
    </div>

    <!-- Create Package Form Modal -->
    <PackageForm
      v-if="showCreateForm"
      @submit="handleCreatePackage"
      @cancel="showCreateForm = false"
    />

    <!-- Packages Grid -->
    <div class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <PackageCard
        v-for="pkg in packages"
        :key="pkg.id"
        :package="pkg"
        @edit="handleEditPackage"
        @delete="handleDeletePackage"
        @publish="handlePublishPackage"
      />
    </div>
  </div>
</template>