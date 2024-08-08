<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { storeFcmTokenOnServer } from "@/services/apiService";

export default {
  name: "App",
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapGetters(["token"]),
  },
  mounted() {
    const firebaseConfig = {
      apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
      authDomain: "snelwoningruil.firebaseapp.com",
      projectId: "snelwoningruil",
      storageBucket: "snelwoningruil.appspot.com",
      messagingSenderId: "95029283842",
      appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
      measurementId: "G-ZB2PQERS5W",
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging();

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
    });

    if (this.token) {
      getToken(messaging, {
        vapidKey:
          "BK2jDUAUj5G9pjfehRYRHJV7PA0Lv23hqVALEierhj9Ym4ZGUofPjISzPFSmwi7bO8uYHkmEfn6pkfYAwNR47p0",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("fcmToken: " + currentToken);
            storeFcmTokenOnServer(currentToken)
              .then((response) => {
                console.log("Token stored successfully:", response);
              })
              .catch((error) => {
                console.error("Error storing token:", error);
              });
          } else {
            alert("No token available.");
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    } else {
      console.log("User is not authenticated. No FCM token will be requested.");
    }
  },
};
</script>

<style>
/* Add global styles here */
</style>
