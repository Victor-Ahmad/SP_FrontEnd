<template>
  <div
    :class="[
      'flex flex-col h-full mt-14',
      localSelectedChat?.second_person ? ' lg:pt-0' : ' lg:pt-0',
    ]"
  >
    <div
      class="fixed z-50 lg:z-0 lg:static top-0 w-full hidden md:flex lg:flex flex-col md:flex-row mb-1 bg-white shadow-lg justify-between items-center"
    >
      <div
        v-if="localSelectedChat && localSelectedChat.first_person"
        :class="[
          'p-4 flex justify-between items-center w-full ',
          localSelectedChat.second_person ? 'md:w-5/12' : 'md:px-10',
        ]"
      >
        <div>
          <div class="font-bold text-lg">
            {{ localSelectedChat.first_person.street }},
            {{ localSelectedChat.first_person.location }}
          </div>
          <div class="text-xs text-gray-500">
            {{ localSelectedChat.first_person.first_name }}
            {{ localSelectedChat.first_person.last_name }}
          </div>
        </div>
        <button
          @click="goToDetailPage(localSelectedChat.first_person.house_id)"
          class="p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
        >
          {{ $t("chat.viewHouse") }}
        </button>
      </div>
      <div
        v-if="localSelectedChat && localSelectedChat.second_person"
        class="p-4 flex justify-between items-center w-full md:w-5/12"
      >
        <div>
          <div class="font-bold text-lg">
            {{ localSelectedChat.second_person.street }},
            {{ localSelectedChat.second_person.location }}
          </div>
          <div class="text-xs text-gray-500">
            {{ localSelectedChat.second_person.first_name }}
            {{ localSelectedChat.second_person.last_name }}
          </div>
        </div>
        <button
          @click="goToDetailPage(localSelectedChat.second_person.house_id)"
          class="p-2 bg-[#1c592f] text-white rounded hover:bg-green-600 transition"
        >
          {{ $t("chat.viewHouse") }}
        </button>
      </div>
    </div>
    <div
      class="mobile_dropdown fixed z-50 lg:z-0 lg:static top-0 w-full flex md:hidden lg:hidden flex-col md:flex-row mb-1 bg-white shadow-lg justify-between items-center"
    >
      <div class="relative w-full">
        <div
          class="flex justify-between items-center cursor-pointer p-4"
          @click="toggleDropdown"
        >
          <span>Houses Dropdown Menu</span>
          <i
            :class="dropdownOpen ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"
          ></i>
        </div>
        <ul
          v-show="dropdownOpen"
          class="absolute w-full bg-white shadow-lg z-10"
        >
          <li
            v-if="localSelectedChat && localSelectedChat.first_person"
            @click="goToDetailPage(localSelectedChat.first_person.house_id)"
            class="p-4 hover:bg-gray-100 cursor-pointer"
          >
            <div class="font-bold text-lg">
              {{ localSelectedChat.first_person.street }},
              {{ localSelectedChat.first_person.location }}
            </div>
            <div class="text-xs text-gray-500">
              {{ localSelectedChat.first_person.first_name }}
              {{ localSelectedChat.first_person.last_name }}
            </div>
          </li>
          <li
            v-if="localSelectedChat && localSelectedChat.second_person"
            @click="goToDetailPage(localSelectedChat.second_person.house_id)"
            class="p-4 hover:bg-gray-100 cursor-pointer"
          >
            <div class="font-bold text-lg">
              {{ localSelectedChat.second_person.street }},
              {{ localSelectedChat.second_person.location }}
            </div>
            <div class="text-xs text-gray-500">
              {{ localSelectedChat.second_person.first_name }}
              {{ localSelectedChat.second_person.last_name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      ref="messageList"
      class="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-gray-50 messageList-container"
    >
      <div v-if="messages.length > 0">
        <div
          v-for="(message, index) in messages"
          :key="message.id"
          :ref="index === messages.length - 1 ? 'lastMessage' : null"
          class="mb-4 flex flex-col"
        >
          <div
            :class="{
              'self-end bg-[#E8FDF6] text-right': message.type === 'sender',
              'self-start bg-white': message.type === 'receiver',
            }"
            class="p-4 rounded-lg shadow-md max-w-xs relative"
          >
            <div
              v-if="
                localSelectedChat.second_person && message.type == 'receiver'
              "
              class="mb-2"
            >
              {{ message.sender_name }}:
            </div>
            <div class="message-content mb-2">{{ message.message }}</div>
            <div class="text-xs text-gray-500 flex justify-end items-center">
              <span class="message-timestamp">{{
                formatTime(message.created_at)
              }}</span>
              <div class="relative ml-2">
                <i
                  v-if="message.is_read"
                  class="fas fa-check text-green-500"
                ></i>
                <i v-else class="fas fa-check text-gray-500"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="placeholder">
          <img
            src="@/assets/images/logo2.png"
            alt="Placeholder"
            class="grayscale"
          />
        </div>
        <div class="flex justify-center">
          <router-link
            to="/home"
            class="px-4 py-2 bg-[#154aa8] text-white rounded transition"
          >
            Home
          </router-link>
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
        :disabled="isSending"
      />
      <button
        @click="sendMessage"
        :class="[
          'ml-2 pl-3 pr-4 pt-2 pb-2 rounded-full transition',
          isSending
            ? 'bg-gray-500 cursor-not-allowed  text-white '
            : 'bg-[#154aa8] hover:bg-green-600  text-white ',
        ]"
        :disabled="isSending"
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
      chatId: null,
      localSelectedChat: this.selectedChat, // Create a local copy of selectedChat

      isSending: false,
      dropdownOpen: false, // State to track dropdown visibility
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
            first_person: response.result?.chat?.first_person ?? null,
            second_person: response.result?.chat?.second_person ?? null,
          };
          this.messages = response.result.messages.reverse();
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
        this.isSending = true; // Set isSending to true
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
            this.messages.push(newMsg);
            this.newMessage = "";
            this.scrollToBottom();
          }
        } catch (error) {
          console.error("Failed to send message:", error);
        } finally {
          this.isSending = false; // Set isSending to false
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
    goToDetailPage(id) {
      this.$router.push({
        name: "HouseDetail",
        params: { id: id },
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
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
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
}
.placeholder img {
  max-width: 200px;
  max-height: 200px;
  filter: grayscale(100%) opacity(50%);
}
@media (max-width: 768px) {
  .message-input-container {
    position: fixed;
    bottom: 80px;
    left: 0;
    right: 0;
  }
  .messageList-container {
    margin-bottom: 130px;
  }
}
.mobile_dropdown .relative {
  position: relative;
}
</style>
