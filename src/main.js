import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import store from "./store";
import "./assets/styles.css";

import AOS from "aos";
import "aos/dist/aos.css";
import "parallax-js";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { storeFcmTokenOnServer } from "@/services/apiService"; // Make sure this path is correct

const firebaseConfig = {
  apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
  authDomain: "snelwoningruil.firebaseapp.com",
  projectId: "snelwoningruil",
  storageBucket: "snelwoningruil.appspot.com",
  messagingSenderId: "95029283842",
  appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
  measurementId: "G-ZB2PQERS5W",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to update the token on the server
const updateToken = async (currentToken) => {
  if (currentToken) {
    try {
      const response = await storeFcmTokenOnServer(currentToken);
      console.log("Token stored successfully:", response);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  } else {
    console.log(
      "No registration token available. Request permission to generate one."
    );
  }
};

// Register the service worker and get the token
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Get initial token
      getToken(messaging, {
        vapidKey:
          "BK2jDUAUj5G9pjfehRYRHJV7PA0Lv23hqVALEierhj9Ym4ZGUofPjISzPFSmwi7bO8uYHkmEfn6pkfYAwNR47p0",
      })
        .then(updateToken)
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });

      // Monitor token refresh
      messaging.onTokenRefresh(() => {
        getToken(messaging, {
          vapidKey:
            "BK2jDUAUj5G9pjfehRYRHJV7PA0Lv23hqVALEierhj9Ym4ZGUofPjISzPFSmwi7bO8uYHkmEfn6pkfYAwNR47p0",
        })
          .then(updateToken)
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      });

      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        // Handle foreground messages here if needed
      });
    })
    .catch((err) => {
      console.log("Service Worker registration failed: ", err);
    });
}

const app = createApp(App);

app.use(router).use(i18n).use(store).mount("#app");

AOS.init({
  duration: 1000,
});
