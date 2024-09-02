<template>
  <div
    class="flex flex-col md:flex-row lg:justify-center pt-8 lg:pt-20 bg-white"
  >
    <div class="flex justify-center p-4 md:p-8 w-full md:w-1/2">
      <div class="max-w-md w-full bg-white p-8 space-y-6">
        <div class="text-center border-gray-300 py-2 mb-10">
          <h2 class="font-bold text-[#1c592f]">
            {{ $t("login.logIn") }}
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="form-group mb-4">
            <label for="email" class="block font-semibold text-[#1c592f] mb-2">
              {{ $t("login.email") }}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="input-field"
              placeholder="example@example.com"
              @input="validateEmail"
            />
          </div>
          <div class="form-group mb-4">
            <label
              for="password"
              class="block font-semibold text-[#1c592f] mb-2"
            >
              {{ $t("login.password") }}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="password"
              class="input-field"
              placeholder="Password"
            />
          </div>
          <div v-if="validationError" class="text-red-600 text-sm mt-2">
            {{ validationError }}
          </div>
          <div class="form-group mb-4">
            <button
              type="submit"
              class="px-4 py-2 bg-[#1c592f] text-white w-full rounded-full transition duration-300 hover:bg-[#065e58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c592f]"
              :disabled="isLoading || validationError"
            >
              <span v-if="!isLoading">{{ $t("login.logIn") }}</span>
              <span v-else>Loading...</span>
            </button>
          </div>
          <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <router-link
                to="/register"
                class="font-medium text-[#1c592f] hover:text-[#065e58]"
              >
                {{ $t("login.register") }}
              </router-link>
            </div>
            <div class="text-sm">
              <router-link
                to="/forget-password"
                class="font-medium text-[#1c592f] hover:text-[#065e58]"
              >
                Forget Password?
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden lg:block w-full md:w-1/2">
      <img
        class="w-full h-auto rounded"
        src="@/assets/images/login.png"
        alt="Background"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const email = ref("");
    const password = ref("");
    const validationError = ref(null);

    const validateEmail = () => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validationError.value = re.test(String(email.value).toLowerCase())
        ? null
        : "Please enter a valid email.";
    };

    const handleLogin = async () => {
      validateEmail();
      if (validationError.value) return;

      try {
        // Step 1: Handle the login process with your backend API
        const response = await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });

        // Step 2: If login is successful, initialize Firebase and handle FCM
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/home");
          const app = initializeApp(firebaseConfig);
          const messaging = getMessaging(app);

          // Register service worker for FCM
          if ("serviceWorker" in navigator) {
            try {
              const registration = await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js"
              );

              // Request notification permission and get FCM token
              const permission = await Notification.requestPermission();
              if (permission === "granted") {
                const fcmToken = await getToken(messaging, {
                  serviceWorkerRegistration: registration,
                });
                console.log("fcm obtained:", fcmToken);

                // Save the FCM token to your backend
                await store.dispatch("saveFcmToken", fcmToken);
              } else {
                // Permission denied, notify the user but continue
                Swal.fire({
                  icon: "info",
                  title: "Notifications Disabled",
                  text: "You won't receive notifications because you've denied permission.",
                  showConfirmButton: true,
                });
              }
            } catch (error) {
              console.error("Service Worker registration failed:", error);
            }
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: error.message || "An error occurred during login.",
        });
      }
    };

    return {
      isLoading,
      error,
      email,
      password,
      validationError,
      handleLogin,
      validateEmail,
    };
  },
};
</script>

<style scoped>
.input-field {
  @apply w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#1c592f] focus:border-[#1c592f] placeholder-gray-400;
}
.input-field:focus {
  border-color: #1c592f;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
</style>
