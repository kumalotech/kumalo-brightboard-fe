<script setup>

const props = defineProps({
  selectedRole: String,
  error: String,
  roles: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:selectedRole'])

const selectRole = (roleId) => {
  emit('update:selectedRole', roleId)
}
</script>

<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium text-teal">
      Select your role
    </label>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="role in roles"
        :key="role.id"
        @click="selectRole(role.id)"
        class="relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 hover:shadow-md text-center"
        :class="[
          selectedRole === role.id
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-200 hover:border-primary-200'
        ]"
      >
        <div class="flex flex-col items-center">
          <div class="flex-shrink-0 mb-3">
            <span class="text-4xl">{{ role.icon }}</span>
          </div>
          <div>
            <h3 class="text-lg font-medium text-teal">
              {{ role.title }}
            </h3>
            <p class="mt-2 text-sm text-teal/70">
              {{ role.description }}
            </p>
          </div>
          <div 
            v-if="selectedRole === role.id" 
            class="absolute top-3 right-3 h-5 w-5 text-primary-500"
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>