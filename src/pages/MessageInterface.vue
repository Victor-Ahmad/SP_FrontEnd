<template>
  <div class="flex flex-col h-full">
    <div
      v-if="selectedChat && selectedChat.other_person"
      class="p-4 bg-white shadow-lg mb-1 flex justify-between items-center"
    >
      <div>
        <div class="font-bold text-lg">
          {{ selectedChat.other_person.first_name }}
          {{ selectedChat.other_person.last_name }}
        </div>
        <div class="text-sm text-gray-600">
          {{ selectedChat.other_person.email }}
        </div>
      </div>
      <button
        @click="goToProfile"
        class="p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
      >
        House
      </button>
    </div>
    <div
      ref="messageList"
      class="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-gray-50"
    >
      <div
        v-for="message in messages"
        :key="message.id"
        class="mb-4 flex flex-col"
      >
        <div
          :class="{
            'self-end bg-[#E8FDF6] text-right': message.type === 'sender',
            'self-start bg-white': message.type === 'receiver',
          }"
          class="p-4 rounded-lg shadow-md max-w-xs relative"
        >
          <div class="message-content mb-2">{{ message.message }}</div>
          <div class="text-xs text-gray-500 flex justify-end items-center">
            <span class="message-timestamp">{{
              formatTime(message.created_at)
            }}</span>
            <div class="relative ml-2">
              <i v-if="message.is_read" class="fas fa-check text-green-500"></i>
              <i v-else class="fas fa-check text-gray-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 border-t border-gray-300 bg-white flex items-center">
      <input
        type="text"
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
        class="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#154aa8]"
      />
      <button
        @click="sendMessage"
        class="ml-2 pl-3 pr-4 pt-2 pb-2 bg-[#154aa8] text-white rounded-full hover:bg-green-600 transition"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { getChatMessages, sendMessage } from "@/services/apiService";

export default {
  props: {
    selectedChat: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      messages: [],
      newMessage: "",
    };
  },
  watch: {
    selectedChat(newChat) {
      if (newChat && newChat.id) {
        this.fetchMessages(newChat.id);
      }
    },
  },
  methods: {
    async fetchMessages(chatId) {
      try {
        const response = await getChatMessages(chatId);
        if (response.success && response.result.length > 0) {
          this.messages = response.result[0].messages;
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        try {
          const response = await sendMessage(
            this.newMessage,
            this.selectedChat.other_person.id
          );
          if (response.success) {
            const newMsg = {
              id: this.messages.length + 1,
              chat_id: this.selectedChat.id,
              message: this.newMessage,
              type: "sender",
              created_at: new Date().toISOString(),
              is_read: false,
            };
            this.messages.unshift(newMsg);
            this.newMessage = "";
            this.scrollToBottom();
            this.simulateMessageStatus(newMsg);
          }
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageList;
        container.scrollTop = container.scrollHeight;
      });
    },
    simulateMessageStatus(message) {
      setTimeout(() => {
        message.is_read = true;
      }, 2000);
    },
    goToProfile() {
      if (this.selectedChat && this.selectedChat.other_person) {
        this.$router.push({
          name: "HouseDetail",
          params: { id: this.house.id },
        });
        // this.$router.push({
        //   name: "UserProfile",
        //   params: { userId: this.selectedChat.other_person.id },
        // });
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
};
</script>

<style scoped>
.message-content {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.bg-E8FDF6 {
  background-color: #e8fdf6;
}
</style>
