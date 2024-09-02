<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
  authDomain: "snelwoningruil.firebaseapp.com",
  projectId: "snelwoningruil",
  storageBucket: "snelwoningruil.appspot.com",
  messagingSenderId: "95029283842",
  appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
  measurementId: "G-ZB2PQERS5W",
};

export default {
  name: "App",
  components: {
    LoadingSpinner,
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const token = store.getters.token;

      if (token) {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        // Register or renew service worker and FCM token
        if ("serviceWorker" in navigator) {
          try {
            const registration = await navigator.serviceWorker.register(
              "/firebase-messaging-sw.js"
            );

            // Delete the existing FCM token to force renewal
            const existingToken = await getToken(messaging, {
              serviceWorkerRegistration: registration,
            });
            if (existingToken) {
              console.log("Existing FCM token found, deleting it...");
              await deleteToken(messaging);
            }

            // Request a new FCM token
            const newToken = await getToken(messaging, {
              serviceWorkerRegistration: registration,
            });
            if (newToken) {
              console.log("New FCM token obtained:", newToken);
              await store.dispatch("saveFcmToken", newToken);
            } else {
              console.warn("Failed to obtain a new FCM token.");
            }
          } catch (error) {
            console.error(
              "Failed to register service worker or obtain FCM token:",
              error
            );
          }
        }
      }
    });

    return {};
  },
};
</script>

<style>
/* Add your global styles here */
</style>
