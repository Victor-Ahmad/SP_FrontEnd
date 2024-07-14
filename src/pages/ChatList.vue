<template>
  <div class="p-4 overflow-y-auto h-full">
    <div
      class="mb-4 p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition"
      v-for="chat in chats"
      :key="chat.id"
      @click="selectChat(chat)"
    >
      <div class="flex justify-between items-center mb-1">
        <div class="font-semibold">
          {{ chat.other_person?.first_name ?? "" }}
          {{ chat.other_person?.last_name ?? "" }}
        </div>
        <div class="text-sm text-gray-500">{{ chat.created_at }}</div>
      </div>
      <div class="text-sm text-gray-600 truncate">{{ chat.lastMessage }}</div>
    </div>
  </div>
</template>

<script>
import { getChats } from "@/services/apiService";

export default {
  data() {
    return {
      chats: [],
    };
  },
  async created() {
    try {
      const response = await getChats();
      if (response.success) {
        this.chats = response.result;
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    }
  },
  methods: {
    selectChat(chat) {
      if (window.innerWidth <= 768) {
        this.$router.push({
          name: "MessageInterfacePage",
          params: { chatId: chat.id },
        });
      } else {
        this.$emit("chatSelected", chat);
      }
    },
  },
};
</script>
