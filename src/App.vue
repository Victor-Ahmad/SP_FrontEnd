<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
    <Snackbar
      ref="snackbar"
      :message="snackbarMessage"
      :showSettingsButton="showSettingsButton"
      :settingsUrl="settingsUrl"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n"; // Import the useI18n hook for localization
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Snackbar from "@/components/Snackbar.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

export default {
  name: "App",
  components: {
    LoadingSpinner,
    Snackbar,
  },
  setup() {
    const store = useStore(); // Initialize Vuex store
    const snackbar = ref(null);
    const snackbarMessage = ref("");
    const showSettingsButton = ref(false);
    const settingsUrl = ref("");
    const { t } = useI18n(); // Initialize localization using useI18n hook

    // Show Snackbar with dynamic message, button visibility, and settings URL
    const showSnackbar = (message, showButton = false, url = "") => {
      snackbarMessage.value = message;
      showSettingsButton.value = showButton;
      settingsUrl.value = url;
      if (snackbar.value) {
        snackbar.value.showSnackbar(); // Trigger the Snackbar to display
      }
    };

    // Detect browser and return the appropriate URL for notification settings
    const detectBrowserAndSetUrl = () => {
      const userAgent = navigator.userAgent.toLowerCase();

      if (userAgent.includes("edg/")) {
        return "edge://settings/content/notifications";
      } else if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
        return "chrome://settings/content/notifications";
      } else if (userAgent.includes("firefox")) {
        return "about:preferences#privacy";
      } else if (
        userAgent.includes("safari") &&
        !userAgent.includes("chrome")
      ) {
        return "x-apple.systempreferences:com.apple.preference.notifications";
      } else if (userAgent.includes("opera")) {
        return "opera://settings/content/notifications";
      } else {
        return ""; // No specific URL available, fallback to general instructions
      }
    };

    onMounted(async () => {
      const token = store.getters.token;

      if (token) {
        const app = initializeApp({
          apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
          authDomain: "snelwoningruil.firebaseapp.com",
          projectId: "snelwoningruil",
          storageBucket: "snelwoningruil.appspot.com",
          messagingSenderId: "95029283842",
          appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
          measurementId: "G-ZB2PQERS5W",
        });
        const messaging = getMessaging(app);

        if ("serviceWorker" in navigator) {
          try {
            const registration = await navigator.serviceWorker.register(
              "/firebase-messaging-sw.js"
            );

            const existingToken = await getToken(messaging, {
              serviceWorkerRegistration: registration,
            });

            if (existingToken) {
              console.log(t("app.firebase.existingTokenDeleted")); // Localized message
              await deleteToken(messaging);
            }

            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              const newToken = await getToken(messaging, {
                serviceWorkerRegistration: registration,
              });
              if (newToken) {
                console.log(t("app.firebase.newTokenObtained"), newToken); // Localized message
                await store.dispatch("saveFcmToken", newToken);
              } else {
                console.warn(t("app.firebase.failedToObtainToken")); // Localized message
              }
            } else if (permission === "denied") {
              const browserUrl = detectBrowserAndSetUrl();
              showSnackbar(
                t("app.snackbar.allowNotifications"),
                true,
                browserUrl
              ); // Localized message
            }
          } catch (error) {
            if (error.code === "messaging/permission-blocked") {
              console.error(
                t("app.firebase.notificationPermissionBlocked"),
                error.message
              ); // Localized message
              const browserUrl = detectBrowserAndSetUrl();
              showSnackbar(
                t("app.snackbar.allowNotifications"),
                true,
                browserUrl
              ); // Localized message
            } else {
              console.error(
                t("app.firebase.failedToRegisterServiceWorker"),
                error
              ); // Localized message
            }
          }
        }
      }
    });

    return {
      snackbar,
      snackbarMessage,
      showSettingsButton,
      settingsUrl,
    };
  },
};
</script>

<style scoped>
/* Add your global styles here */
</style>
