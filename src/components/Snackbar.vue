<template>
  <div v-if="visible" class="snackbar font-medium">
    <span>{{ currentMessage }}</span>
    <div class="snackbar-actions">
      <button class="close-btn" @click="hideSnackbar">x</button>
      <button
        v-if="showSettingsButton"
        class="settings-btn"
        @click="redirectToSettings"
      >
        {{ $t("app.snackbar.settingsButton") }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    message: {
      type: String,
      required: true,
    },
    showSettingsButton: {
      type: Boolean,
      default: false, // Show the button only if required
    },
    settingsUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false, // Start hidden
      currentMessage: this.message, // Store the message for dynamic updates
    };
  },
  methods: {
    hideSnackbar() {
      this.visible = false; // Hide snackbar when X is clicked
    },
    showSnackbar() {
      this.visible = true; // Show snackbar again if needed
      setTimeout(() => {
        this.hideSnackbar(); // Automatically hide after a few seconds
      }, 5000); // Adjust the duration as needed
    },
    updateMessage(newMessage) {
      this.currentMessage = newMessage;
      this.showSnackbar(); // Show snackbar when the message is updated
    },
    redirectToSettings() {
      try {
        const newWindow = window.open(this.settingsUrl, "_blank");
        if (newWindow) {
          newWindow.focus();
        } else {
          // If window.open fails, redirect the user using location.href
          window.location.href = this.settingsUrl;
        }
      } catch (error) {
        console.error("Failed to open settings URL:", error);
        // Fallback to redirecting the user
        window.location.href = this.settingsUrl;
      }
    },
  },
  watch: {
    message(newMessage) {
      this.updateMessage(newMessage); // Watch for changes in the message prop
    },
  },
};
</script>

<style scoped>
.snackbar {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff8dc; /* Light yellow */
  color: #000;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 90%; /* Ensure it doesn't overflow on small screens */
  width: 100%; /* Full width by default */
}

.snackbar-actions {
  display: flex;
  align-items: center;
}

.close-btn,
.settings-btn {
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  margin-left: 20px;
}

.settings-btn {
  color: #1c592f; /* Green color for the settings button */
}

.settings-btn:hover {
  color: #065e58; /* Darker green on hover */
}

.close-btn:hover {
  color: #ff0000; /* Red color on hover */
}

@media (min-width: 640px) {
  .snackbar {
    left: auto; /* Center with margin auto */
    right: 20px;
    transform: none; /* Remove centering transform */
  }
}

@media (min-width: 1024px) {
  .snackbar {
    bottom: 20px;
    right: 20px;
    width: auto;
  }
}
</style>
