<template>
  <div>
    <div v-if="isMobile" class="flex flex-col h-screen">
      <router-view></router-view>
    </div>
    <div v-else class="flex" style="height: 83vh">
      <div class="w-1/4 border-r border-gray-300 bg-gray-100">
        <ChatList @chatSelected="handleChatSelected" />
      </div>
      <div class="w-3/4 flex flex-col">
        <MessageInterface :selectedChat="selectedChat" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from "./ChatList.vue";
import MessageInterface from "./MessageInterface.vue";
import { getChats, getChatMessages } from "@/services/apiService";

export default {
  components: {
    ChatList,
    MessageInterface,
  },
  data() {
    return {
      selectedChat: null,
      isMobile: window.innerWidth <= 768,
    };
  },
  methods: {
    async fetchChatMessages(chatId) {
      try {
        const response = await getChatMessages(chatId);
        if (response.success) {
          this.selectedChat = {
            id: chatId,
            messages: response.result.messages,
            other_persons: response.result.chat.first_person
              ? [response.result.chat.first_person]
              : [],
          };
        } else {
          console.error("Failed to fetch chat messages:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    },
    handleChatSelected(chat) {
      if (this.isMobile) {
        this.$router.push({
          name: "MessageInterfacePage",
          params: { chatId: chat.id },
        });
      } else {
        this.fetchChatMessages(chat.id);
      }
    },
    async selectChatById(chatId) {
      this.fetchChatMessages(chatId);
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  watch: {
    "$route.params.chatId": {
      immediate: true,
      handler(chatId) {
        if (chatId) {
          this.selectChatById(chatId);
        }
      },
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
    const chatId = this.$route.params.chatId || this.$route.query.chatId;
    if (chatId) {
      this.selectChatById(chatId);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>
