<template>
  <div>
    <!-- Mobile View -->
    <div v-if="isMobile" class="flex flex-col h-screen">
      <router-view></router-view>
    </div>

    <!-- Desktop View -->
    <div v-else class="flex" style="height: 83vh">
      <!-- Chat List Sidebar -->
      <div class="w-1/4 border-r border-gray-300 bg-gray-100">
        <ChatList @chatSelected="handleChatSelected" />
      </div>

      <!-- Message Interface -->
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
    async fetchChatMessages(chatId, houseId) {
      try {
        const response = await getChatMessages(chatId);
        if (response.success) {
          this.selectedChat = {
            id: chatId,
            messages: response.result.messages,
            other_persons: response.result.chat.first_person
              ? [response.result.chat.first_person]
              : [],
            houseId: houseId,
          };
        } else {
          console.error("Failed to fetch chat messages:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch chat messages:", error);
      }
    },
    handleChatSelected({ chat, houseId }) {
      if (this.isMobile) {
        this.$router.push({
          name: "MessageInterfacePage",
          params: { chatId: chat.id },
          query: { otherPersonHouseId: houseId },
        });
      } else {
        this.fetchChatMessages(chat.id, houseId);
      }
    },
    async selectChatById(chatId, houseId) {
      this.fetchChatMessages(chatId, houseId);
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },

  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
    const chatId = this.$route.params.chatId || this.$route.query.chatId;
    const houseId =
      this.$route.params.otherPersonHouseId ||
      this.$route.query.otherPersonHouseId;
    if (chatId) {
      this.selectChatById(chatId, houseId);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>
