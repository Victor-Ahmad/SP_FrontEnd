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
          <template v-if="chat.other_persons.length > 0">
            {{ chat.other_persons[0].first_name }}
            {{ chat.other_persons[0].last_name }}
          </template>
          <template v-else> Unknown User </template>
        </div>
        <div class="text-sm text-gray-500">
          {{ formatDate(chat.latest_message.created_at) }}
        </div>
      </div>
      <div class="text-sm text-gray-600 truncate">
        {{ chat.latest_message.content }}
      </div>
      <div class="text-xs text-gray-500">
        <template v-if="chat.other_persons.length > 0">
          {{ chat.other_persons[0].street }},
          {{ chat.other_persons[0].location }}
        </template>
      </div>
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
      const houseId =
        chat.other_persons.length > 0 ? chat.other_persons[0].house_id : null;

      if (window.innerWidth <= 768) {
        this.$router.push({
          name: "MessageInterfacePage",
          params: { chatId: chat.id },
          query: { otherPersonHouseId: houseId },
        });
      } else {
        this.$emit("chatSelected", { chat, houseId });
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
</script>
