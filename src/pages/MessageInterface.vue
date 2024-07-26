<template>
  <div class="flex flex-col h-full">
    <div
      v-if="localSelectedChat && localSelectedChat.other_persons?.length > 0"
      class="p-4 bg-white shadow-lg mb-1 flex justify-between items-center"
    >
      <div>
        <div class="font-bold text-lg">
          {{ localSelectedChat.other_persons[0].first_name }}
          {{ localSelectedChat.other_persons[0].last_name }}
        </div>
        <div class="text-sm text-gray-600">
          {{ localSelectedChat.other_persons[0].email }}
        </div>
        <div class="text-xs text-gray-500">
          {{ localSelectedChat.other_persons[0].street }},
          {{ localSelectedChat.other_persons[0].location }}
        </div>
      </div>
      <button
        @click="goToDetailPage"
        class="p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
      >
        {{ $t("chat.viewHouse") }}
      </button>
    </div>
    <div
      v-else-if="localSelectedChat && localSelectedChat.other_person"
      class="p-4 bg-white shadow-lg mb-1 flex justify-between items-center"
    >
      <div>
        <div class="font-bold text-lg">
          {{ localSelectedChat.other_person.first_name }}
          {{ localSelectedChat.other_person.last_name }}
        </div>
        <div class="text-sm text-gray-600">
          {{ localSelectedChat.other_person.email }}
        </div>
        <div class="text-xs text-gray-500">
          {{ localSelectedChat.other_person.street }},
          {{ localSelectedChat.other_person.location }}
        </div>
      </div>
      <button
        @click="goToDetailPage"
        class="p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
      >
        {{ $t("chat.viewHouse") }}
      </button>
    </div>
    <div
      ref="messageList"
      class="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-gray-50 messageList-container"
    >
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        :ref="index === 0 ? 'lastMessage' : null"
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
    <div
      class="message-input-container p-4 border-t border-gray-300 bg-white flex items-center"
    >
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
    <!-- Mobile View House Button -->
    <div
      v-if="localSelectedChat && localSelectedChat.house"
      class="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg lg:hidden"
    >
      <button
        @click="goToDetailPage"
        class="w-full p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
      >
        View House
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
      chatId: null,
      localSelectedChat: this.selectedChat, // Create a local copy of selectedChat
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
        if (response.success && response.result) {
          this.localSelectedChat = {
            id: chatId,
            messages: response.result.messages,
            other_persons: response.result.chat.first_person
              ? [response.result.chat.first_person]
              : [],
          };
          this.messages = response.result.messages;
          this.chatId = chatId;
          this.scrollToBottom();
        } else {
          this.messages = [];
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        try {
          const response = await sendMessage(this.newMessage, this.chatId);
          if (response.success) {
            const newMsg = {
              id: this.messages.length + 1,
              chat_id: this.chatId,
              message: this.newMessage,
              type: "sender",
              created_at: new Date().toISOString(),
              is_read: false,
            };
            this.messages.unshift(newMsg);
            this.newMessage = "";
            this.scrollToBottom();
          }
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const lastMessage = this.$refs.lastMessage;
        if (lastMessage && lastMessage[0]) {
          lastMessage[0].scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    goToDetailPage() {
      if (this.localSelectedChat && this.localSelectedChat.house) {
        this.$router.push({
          name: "HouseDetail",
          params: { id: this.localSelectedChat.house.id },
        });
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
  mounted() {
    const chatId = this.$route.params.chatId || this.$route.query.chatId;
    if (chatId) {
      this.chatId = chatId;
      this.fetchMessages(chatId);
    } else if (this.selectedChat && this.selectedChat.id) {
      this.chatId = this.selectedChat.id;
      this.fetchMessages(this.selectedChat.id);
    }
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
@media (max-width: 768px) {
  .message-input-container {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
  }
  .messageList-container {
    margin-bottom: 130px;
  }
}
</style>
