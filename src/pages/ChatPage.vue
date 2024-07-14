<template>
  <div>
    <div v-if="isMobile" class="flex flex-col h-screen">
      <router-view></router-view>
    </div>
    <div v-else class="flex" style="height: 83vh">
      <div class="w-1/4 border-r border-gray-300 bg-gray-100">
        <ChatList @chatSelected="selectChat" />
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
import { getChatMessages } from "@/services/apiService";

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
    async selectChat(chat) {
      if (this.isMobile) {
        this.$router.push({
          name: "MessageInterfacePage",
          params: { chatId: chat.id },
        });
      } else {
        this.selectedChat = chat;
        try {
          const response = await getChatMessages(chat.id);
          if (response.success) {
            this.selectedChat.messages = response.result;
          } else {
            console.error("Failed to fetch chat messages:", response.message);
          }
        } catch (error) {
          console.error("Failed to fetch chat messages:", error);
        }
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>
