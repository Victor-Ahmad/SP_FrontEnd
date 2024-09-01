// src/services/firebaseService.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";
import { storeFcmTokenOnServer } from "@/services/apiService";

let app = null;
let messaging = null;

const firebaseConfig = {
  apiKey: "AIzaSyD1pYbJOZtRoI6uP0CG2BJwbyiF66t8yhs",
  authDomain: "snelwoningruil.firebaseapp.com",
  projectId: "snelwoningruil",
  storageBucket: "snelwoningruil.appspot.com",
  messagingSenderId: "95029283842",
  appId: "1:95029283842:web:cf6baac956ad264d7b2b1b",
  measurementId: "G-ZB2PQERS5W",
};

export function initializeFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  }
  return messaging;
}

export function getFirebaseApp() {
  return app;
}

export function getFirebaseMessaging() {
  if (!messaging) {
    throw new Error(
      "Firebase messaging is not initialized. Call initializeFirebase() first."
    );
  }
  return messaging;
}

export async function resetFirebase() {
  if (messaging) {
    try {
      const token = await getToken(messaging);
      if (token) {
        await deleteToken(messaging, token);
        console.log("FCM token deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting FCM token:", error);
    }
  }
  app = null;
  messaging = null;
}

export async function updateToken(currentToken) {
  if (currentToken) {
    try {
      const response = await storeFcmTokenOnServer(currentToken);
      console.log("Token stored successfully:", response);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  } else {
    console.log("No registration token available.");
  }
}
