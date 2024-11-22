<script setup>
import { ref } from 'vue'
import BaseInput from '../../../components/BaseInput.vue'
import { Send } from 'lucide-vue-next'

const props = defineProps({
  conversation: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['send'])

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    emit('send', {
      content: newMessage.value,
      recipientId: props.conversation.id
    })
    newMessage.value = ''
  }
}

const messages = ref([
  {
    id: 1,
    sender: 'teacher',
    content: 'Hello! How can I help you with the course material?',
    timestamp: '2024-02-15T14:30:00'
  },
  {
    id: 2,
    sender: 'student',
    content: 'I have a question about CSS Grid layouts. Could you explain the difference between grid-template-columns and grid-auto-columns?',
    timestamp: '2024-02-15T14:31:00'
  },
  {
    id: 3,
    sender: 'teacher',
    content: 'Of course! grid-template-columns defines the size of columns explicitly, while grid-auto-columns sets the size of automatically generated columns. Let me show you an example...',
    timestamp: '2024-02-15T14:32:00'
  }
])

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <img
          :src="conversation.user.avatar"
          :alt="conversation.user.name"
          class="h-10 w-10 rounded-full"
        />
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">
            {{ conversation.user.name }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ conversation.course }}
          </p>
        </div>
      </div>
    </div>

    <!-- Message List -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="message in messages"
        :key="message.id"
        class="flex"
        :class="message.sender === 'student' ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-lg rounded-lg px-4 py-2"
          :class="[
            message.sender === 'student'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
          ]"
        >
          <p class="text-sm">{{ message.content }}</p>
          <p
            class="text-xs mt-1"
            :class="message.sender === 'student' ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'"
          >
            {{ formatTimestamp(message.timestamp) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-end space-x-3">
        <div class="flex-1">
          <BaseInput
            v-model="newMessage"
            placeholder="Type your message..."
            @keyup.enter="sendMessage"
          />
        </div>
        <button
          class="inline-flex items-center justify-center p-2 rounded-full text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900"
          @click="sendMessage"
        >
          <Send class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>