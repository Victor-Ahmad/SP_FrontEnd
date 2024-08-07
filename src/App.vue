<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
  </div>
</template>

<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export default {
  name: "App",
  components: {
    LoadingSpinner,
  },
};

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
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    "BK2jDUAUj5G9pjfehRYRHJV7PA0Lv23hqVALEierhj9Ym4ZGUofPjISzPFSmwi7bO8uYHkmEfn6pkfYAwNR47p0",
})
  .then((currentToken) => {
    if (currentToken) {
      alert(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });
</script>

<style>
/* Add global styles here */
</style>
