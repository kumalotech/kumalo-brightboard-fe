<script setup>
import { ref } from 'vue'
import BaseInput from '../../../components/BaseInput.vue'
import BaseButton from '../../../components/BaseButton.vue'

const emit = defineEmits(['send', 'close'])

const recipients = ref([
  {
    id: 1,
    name: 'Dr. Sarah Thompson',
    role: 'Teacher',
    course: 'Web Development Bootcamp'
  },
  {
    id: 2,
    name: 'Prof. Michael Chen',
    role: 'Teacher',
    course: 'JavaScript Masterclass'
  }
])

const selectedRecipient = ref(null)
const subject = ref('')
const message = ref('')

const sendMessage = () => {
  if (selectedRecipient.value && message.value.trim()) {
    emit('send', {
      recipientId: selectedRecipient.value.id,
      subject: subject.value,
      content: message.value
    })
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
          New Message
        </h3>
        <button
          class="text-gray-400 hover:text-gray-500"
          @click="$emit('close')"
        >
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Message Form -->
    <div class="flex-1 p-4 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          To
        </label>
        <select
          v-model="selectedRecipient"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select recipient</option>
          <option
            v-for="recipient in recipients"
            :key="recipient.id"
            :value="recipient"
          >
            {{ recipient.name }} ({{ recipient.course }})
          </option>
        </select>
      </div>

      <BaseInput
        label="Subject"
        v-model="subject"
        placeholder="Enter message subject..."
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Message
        </label>
        <textarea
          v-model="message"
          rows="8"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Type your message..."
        ></textarea>
      </div>
    </div>

    <!-- Actions -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex justify-end space-x-3">
        <BaseButton
          variant="secondary"
          @click="$emit('close')"
        >
          Cancel
        </BaseButton>
        <BaseButton
          @click="sendMessage"
          :disabled="!selectedRecipient || !message.trim()"
        >
          Send Message
        </BaseButton>
      </div>
    </div>
  </div>
</template>