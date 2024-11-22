<script setup>
import { ref } from 'vue'
import MessageList from './messages/MessageList.vue'
import MessageDetail from './messages/MessageDetail.vue'
import NewMessage from './messages/NewMessage.vue'

const conversations = ref([
  {
    id: 1,
    user: {
      name: 'Dr. Sarah Thompson',
      role: 'Teacher',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true
    },
    lastMessage: {
      content: 'Thank you for your question about CSS Grid layouts...',
      timestamp: '2024-02-15T14:30:00',
      unread: true
    },
    course: 'Web Development Bootcamp'
  },
  {
    id: 2,
    user: {
      name: 'Prof. Michael Chen',
      role: 'Teacher',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: false
    },
    lastMessage: {
      content: 'The next JavaScript session will cover advanced topics...',
      timestamp: '2024-02-14T16:45:00',
      unread: false
    },
    course: 'JavaScript Masterclass'
  }
])

const selectedConversation = ref(null)
const showNewMessage = ref(false)

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  // Mark messages as read when conversation is selected
  if (conversation.lastMessage.unread) {
    conversation.lastMessage.unread = false
  }
}

const startNewMessage = () => {
  showNewMessage.value = true
  selectedConversation.value = null
}

const closeNewMessage = () => {
  showNewMessage.value = false
}

const sendMessage = (message) => {
  // In a real application, this would make an API call to send the message
  console.log('Sending message:', message)
  showNewMessage.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-3">
          <!-- Message List -->
          <div class="border-r border-gray-200 dark:border-gray-700">
            <MessageList
              :conversations="conversations"
              :selected-conversation="selectedConversation"
              @select="selectConversation"
              @new-message="startNewMessage"
            />
          </div>

          <!-- Message Content -->
          <div class="md:col-span-2">
            <NewMessage
              v-if="showNewMessage"
              @send="sendMessage"
              @close="closeNewMessage"
            />
            <MessageDetail
              v-else-if="selectedConversation"
              :conversation="selectedConversation"
              @send="sendMessage"
            />
            <div
              v-else
              class="h-full flex items-center justify-center text-gray-500 dark:text-gray-400"
            >
              Select a conversation or start a new message
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>