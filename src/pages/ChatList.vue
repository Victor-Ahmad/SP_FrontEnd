<template>
  <div class="p-4 overflow-y-auto h-full mb-20">
    <!-- Tabs -->
    <div class="tab-buttons underlined-tabs hidden lg:flex mb-4">
      <button
        :class="[
          'py-2 lg:py-2.5 h-min',
          { 'active-tab': activeTab === 'tab1' },
        ]"
        @click="setActiveTab('tab1')"
      >
        Direct Chats
      </button>
      <button
        :class="[
          'py-2 lg:py-2.5 h-min',
          { 'active-tab': activeTab === 'tab2' },
        ]"
        @click="setActiveTab('tab2')"
      >
        Triangle Chats
      </button>
    </div>
    <!-- Tab Content -->
    <div v-if="activeTab === 'tab1'">
      <div
        class="mb-4 p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition"
        v-for="chat in direct_chats"
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

        <div class="text-xs text-gray-500">
          <template v-if="chat.other_persons.length > 0">
            {{ chat.other_persons[0].street }},
            {{ chat.other_persons[0].location }}
          </template>
        </div>
        <div class="text-sm text-gray-600 truncate mt-4">
          {{ chat.latest_message.content }}
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'tab2'">
      <div
        class="mb-4 p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition"
        v-for="chat in triangle_chats"
        :key="chat.id"
        @click="selectChat(chat)"
      >
        <div class="flex justify-between mb-1">
          <div class="font-semibold">
            <div v-for="person in chat.other_persons" :key="person.id">
              <div class="mr-4">
                {{ person.first_name }} {{ person.last_name }}
              </div>
              <div class="text-xs text-gray-500 flex flex-wrap mb-4">
                {{ person.street }}, {{ person.location }}
              </div>
            </div>
          </div>
          <div class="flex text-sm text-gray-500">
            {{ formatDate(chat.latest_message.created_at) }}
          </div>
        </div>

        <div class="text-sm text-gray-600 truncate mt-2">
          {{ chat.latest_message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getChats } from "@/services/apiService";

export default {
  data() {
    return {
      direct_chats: [],
      triangle_chats: [],
      activeTab: "tab1", // Initialize the active tab
    };
  },
  async created() {
    try {
      const response = await getChats();
      if (response.success) {
        this.direct_chats = response.result.filter(
          (chat) => chat.other_persons.length === 1
        );
        this.triangle_chats = response.result.filter(
          (chat) => chat.other_persons.length > 1
        );
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
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
/* Underlined Tabs Styling */
.underlined-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  border-bottom: 2px solid #ccc;
}

.underlined-tabs button {
  flex: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
  margin: 0;
}

.underlined-tabs button:hover {
  background-color: #ebebeb;
}

.underlined-tabs .active-tab {
  border-bottom: 3px solid #1c592f;
  font-weight: 700;
  background-color: #e4eee6;
}
</style>
