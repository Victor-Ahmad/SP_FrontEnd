<template>
  <div class="flex" style="height: 83vh;">
    <div class="w-1/4 border-r border-gray-300 bg-gray-100">
      <ChatList @chatSelected="selectChat" />
    </div>
    <div class="w-3/4 flex flex-col">
      <MessageInterface :selectedChat="selectedChat" />
    </div>
  </div>
</template>

<script>
import ChatList from './ChatList.vue';
import MessageInterface from './MessageInterface.vue';
import { getChatMessages } from '@/services/apiService';

export default {
  components: {
    ChatList,
    MessageInterface,
  },
  data() {
    return {
      selectedChat: null,
    };
  },
  methods: {
    async selectChat(chat) {
      this.selectedChat = chat;
      try {
        const response = await getChatMessages(chat.id);
        if (response.success) {
          this.selectedChat.messages = response.result;
        } else {
          console.error('Failed to fetch chat messages:', response.message);
        }
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    },
  },
  async mounted() {
    const chatId = this.$route.query.chatId;
    if (chatId) {
      const chat = { id: chatId, other_person: {}, messages: [] }; // Initialize with empty user and messages
      this.selectedChat = chat;
      await this.selectChat(chat);
    }
  },
};
</script>
