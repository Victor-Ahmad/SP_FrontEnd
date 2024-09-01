<template>
  <div class="relative" @click="toggleDropdown">
    <!-- Notification Bell Icon -->
    <div class="relative">
      <svg
        class="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405C18.79 15.79 18 14.195 18 12.5V9a6 6 0 10-12 0v3.5c0 1.695-.79 3.29-2.595 4.095L3 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        ></path>
      </svg>
      <!-- Red Dot Indicator -->
      <span
        v-if="hasUnreadNotifications"
        class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
      ></span>
    </div>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute -right-16 md:right-0 lg:right-0 mt-2 min-w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50"
    >
      <!-- Dropdown content here -->
      <div
        class="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-200"
      >
        <span class="font-medium text-gray-700">Notifications</span>
        <button
          @click.stop="markAllNotificationsAsRead"
          :disabled="markingAllAsRead || !hasUnreadNotifications"
          :class="{
            'text-blue-500 hover:underline':
              hasUnreadNotifications && !markingAllAsRead,
            'text-gray-400 cursor-not-allowed':
              !hasUnreadNotifications || markingAllAsRead,
          }"
          class="font-small focus:outline-none"
        >
          <span v-if="!markingAllAsRead">Mark All as Read</span>
          <span v-else class="flex items-center">
            <svg
              class="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Loading...
          </span>
        </button>
      </div>

      <ul class="py-2">
        <!-- Loading Indicator -->
        <li v-if="loading" class="px-4 py-2 text-center">
          <svg
            class="animate-spin h-5 w-5 text-gray-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span class="font-small text-gray-500 mt-2 block">Loading...</span>
        </li>

        <!-- Notifications List -->
        <li
          v-for="(notification, index) in notifications"
          :key="index"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          :class="{ 'bg-gray-100': !notification.read }"
          @click="handleNotificationClick(notification, index)"
        >
          <div class="flex justify-between items-center">
            <div class="font-medium">
              <span
                v-if="!notification.read"
                class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
              ></span>
              {{ notification.title }}
            </div>
            <div class="font-small text-gray-500">
              {{ formatDate(notification.sent_at) }}
            </div>
          </div>
          <div class="font-small">{{ notification.body }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationAsRead,
} from "@/services/apiService"; // Update the path as needed

export default {
  data() {
    return {
      isOpen: false,
      notifications: [],
      loading: false, // Track loading state
      markingAllAsRead: false, // Track the marking all as read state
    };
  },
  computed: {
    hasUnreadNotifications() {
      return this.notifications.some((notification) => !notification.read);
    },
  },
  methods: {
    async toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        await this.fetchNotifications();
      }
    },
    async fetchNotifications() {
      this.loading = true; // Start loading
      try {
        const response = await getNotifications();
        if (response && response.success) {
          this.notifications = response.result.map((notification) => ({
            id: notification.id,
            title: notification.title,
            body: notification.body,
            sent_at: notification.sent_at,
            read: notification.read_at !== null, // Assuming `read_at` is not null if read
            data: notification.data, // Keep the data field
            type: notification.type, // Keep the type field
          }));
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        this.loading = false; // End loading
      }
    },

    async handleNotificationClick(notification, index) {
      if (!notification.read) {
        try {
          const response = await markNotificationAsRead(notification.id);
          if (response && response.success) {
            this.notifications[index].read = true; // Mark as read in the UI
          }
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      }
      // Check if the sub_type is 'new_interest'
      if (notification.data.sub_type === "new_interest") {
        // Navigate to HouseDetail route with house_a as the id
        this.$router.push({
          name: "HouseDetail",
          params: { id: notification.data.house_a },
        });
      } else {
        // If needed, handle other sub_types here
        alert(
          `Data: ${JSON.stringify(notification.data)}, Type: ${
            notification.type
          }`
        );
      }
    },

    async markAllNotificationsAsRead() {
      this.markingAllAsRead = true;
      try {
        const response = await markAllNotificationAsRead();
        if (response && response.success) {
          this.notifications.forEach((notification) => {
            notification.read = true;
          });
        }
      } catch (error) {
        console.error("Failed to mark all notifications as read:", error);
      } finally {
        this.markingAllAsRead = false;
      }
    },
    formatDate(datetime) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(datetime).toLocaleDateString(undefined, options);
    },
    closeDropdown() {
      this.isOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    },
    addNotification(notification) {
      // Add the new notification to the list and set it as unread
      this.notifications.unshift({
        id: notification.messageId,
        title: notification.notification.title,
        body: notification.notification.body,
        sent_at: new Date().toISOString(), // Set the current time
        read: false,
      });
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}

.border-gray-200 {
  border-color: #e2e8f0;
}

.cursor-not-allowed {
  cursor: not-allowed;
}

.bg-red-500 {
  background-color: #f56565;
}

/* Additional styles if needed */
</style>
