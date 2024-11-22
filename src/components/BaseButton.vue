<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <button
    :type="type"
    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="{
      'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
      'text-primary-700 bg-primary-100 hover:bg-primary-200 focus:ring-primary-500': variant === 'secondary'
    }"
  >
    <slot></slot>
  </button>
</template>