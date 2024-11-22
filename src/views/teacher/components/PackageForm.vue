<script setup>
import { ref } from 'vue'
import BaseInput from '../../../components/BaseInput.vue'
import { useNumberInput } from '../../../composables/useNumberInput'

const emit = defineEmits(['submit', 'cancel'])

const { preventInvalidNumberInput } = useNumberInput()

const formData = ref({
  title: '',
  description: '',
  price: '',
  duration: '',
  level: 'Beginner',
  image: ''
})

const levels = ['Beginner', 'Intermediate', 'Advanced']

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full p-8 shadow-xl">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Create New Package</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          label="Title"
          v-model="formData.title"
          required
        />

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <BaseInput
            label="Price"
            type="number"
            v-model="formData.price"
            min="0"
            @keydown="preventInvalidNumberInput"
            required
          />

          <BaseInput
            label="Duration"
            v-model="formData.duration"
            placeholder="e.g., 12 weeks"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Level
          </label>
          <select
            v-model="formData.level"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option v-for="level in levels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>

        <BaseInput
          label="Image URL"
          v-model="formData.image"
          required
        />

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create Package
          </button>
        </div>
      </form>
    </div>
  </div>
</template>