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
    selectChat(chat) {
      this.selectedChat = chat;
    },
  },
};
</script>
