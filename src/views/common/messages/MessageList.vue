<script setup>
import BaseButton from '../../../components/BaseButton.vue'

const props = defineProps({
  conversations: {
    type: Array,
    required: true
  },
  selectedConversation: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['select', 'newMessage'])

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
      <BaseButton @click="$emit('newMessage')" class="w-full">
        New Message
      </BaseButton>
    </div>

    <!-- Conversation List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="conversation in conversations"
        :key="conversation.id"
        class="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
        :class="{
          'bg-gray-50 dark:bg-gray-750': selectedConversation?.id === conversation.id
        }"
        @click="$emit('select', conversation)"
      >
        <div class="flex items-start space-x-3">
          <div class="relative flex-shrink-0">
            <img
              :src="conversation.user.avatar"
              :alt="conversation.user.name"
              class="h-10 w-10 rounded-full"
            />
            <span
              v-if="conversation.user.online"
              class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800"
            ></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ conversation.user.name }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatTimestamp(conversation.lastMessage.timestamp) }}
              </p>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ conversation.course }}
            </p>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
              {{ conversation.lastMessage.content }}
            </p>
          </div>
          <div v-if="conversation.lastMessage.unread" class="flex-shrink-0">
            <span class="inline-block h-2 w-2 rounded-full bg-primary-500"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>