<template>
  <header v-if="shouldShowHeader" :class="headerClasses">
    <div class="flex items-center space-x-4">
      <!-- Back Button (Visible only on mobile and not on certain routes) -->
      <button
        v-if="shouldShowBackButton"
        @click="goBack"
        class="p-2"
        aria-label="Go back"
      >
        <i class="fas fa-arrow-left text-black font-large"></i>
      </button>
      <router-link to="/" class="flex items-center">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-10 md:h-12" />
      </router-link>
    </div>
    <nav v-if="!isMobile && token" class="flex space-x-4 items-center">
      <router-link
        :to="{ path: '/home', query: { tab: 'houses' } }"
        class="hover-color transition duration-300 ease-in-out font-medium"
        active-class="active"
        >{{ $t("nav.home") }}</router-link
      >
      <router-link
        to="/swaps"
        class="hover-color transition duration-300 ease-in-out font-medium"
        active-class="active"
        >{{ $t("nav.swaps") }}</router-link
      >
      <div class="relative" :class="{ shake: isShakingMessage }">
        <router-link
          to="/chatPage"
          class="hover-color transition duration-300 ease-in-out font-medium"
          active-class="active"
          @click="resetMessageNotification"
          >{{ $t("nav.messages") }}</router-link
        >
        <!-- Red Dot Indicator for New Messages -->
        <span
          v-if="hasNewMessage"
          class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
        ></span>
      </div>
      <router-link
        to="/profile"
        class="hover-color transition duration-300 ease-in-out font-medium"
        active-class="active"
        >{{ $t("nav.profile") }}</router-link
      >
    </nav>
    <div class="flex space-x-4 items-center">
      <div class="relative" :class="{ shake: isShakingNotification }">
        <NotificationDropdown ref="notificationDropdown" v-if="token" />
        <!-- Red Dot Indicator for General Notifications -->
        <span
          v-if="hasNewNotification"
          class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"
        ></span>
      </div>
      <router-link
        v-if="!isMobile && !token"
        to="/login"
        class="hover-color transition duration-300 ease-in-out font-medium"
        active-class="active"
        >{{ $t("nav.login") }}</router-link
      >
      <router-link
        v-if="!isMobile && !token"
        to="/register"
        class="hover-color transition duration-300 ease-in-out font-medium"
        active-class="active"
        >{{ $t("nav.register") }}</router-link
      >
      <button
        v-if="!isMobile && token"
        @click="handleLogout"
        class="hover-color transition duration-300 ease-in-out font-medium"
      >
        {{ $t("nav.logout") }}
      </button>
      <LanguageDropdown />
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { storeFcmTokenOnServer } from "@/services/apiService";
import { resetFirebase } from "@/services/firebaseService";
export default {
  name: "Header",
  components: {
    LanguageDropdown,
    NotificationDropdown,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isMobile = ref(false);
    const notificationDropdown = ref(null); // Ref for NotificationDropdown

    // States for shaking animations and red dots
    const isShakingNotification = ref(false);
    const isShakingMessage = ref(false);
    const hasNewNotification = ref(false);
    const hasNewMessage = ref(false);

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      // Firebase initialization and onMessage handling
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
      const messaging = getMessaging(app);

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);

        // Handle different types of notifications
        if (payload.data.type === "message") {
          hasNewMessage.value = true; // Show red dot on Messages link only
          isShakingMessage.value = true; // Trigger shake animation for Messages link
          setTimeout(() => {
            isShakingMessage.value = false; // Stop shaking after 0.5s
          }, 500);
        } else {
          hasNewNotification.value = true; // Show red dot on Notification icon only
          isShakingNotification.value = true; // Trigger shake animation for Notification icon
          setTimeout(() => {
            isShakingNotification.value = false; // Stop shaking after 0.5s
          }, 500);
        }

        // Add the notification to the NotificationDropdown
        if (notificationDropdown.value) {
          notificationDropdown.value.addNotification(payload);
        }
      });
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    const token = computed(() => store.getters.token);

    const handleLogout = async () => {
      store.dispatch("logout").then(() => {
        router.push("/login");
      });
    };

    const resetMessageNotification = () => {
      hasNewMessage.value = false; // Hide red dot when Messages link is clicked
    };

    const resetNotification = () => {
      hasNewNotification.value = false; // Hide red dot when Notification icon is clicked
    };

    const headerClasses = computed(() => {
      return isMobile.value
        ? "w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50"
        : "fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50";
    });

    const hiddenRoutesOnMobile = ["/anotherRoute"];
    const noBackButtonRoutes = ["/home", "/login", "/register", "/swaps"];

    const shouldShowHeader = computed(() => {
      const isHiddenRoute = hiddenRoutesOnMobile.includes(route.path);
      const isSpecificChatPage =
        route.path.startsWith("/chats/") && route.query.otherPersonHouseId;
      return !(isMobile.value && (isHiddenRoute || isSpecificChatPage));
    });

    const shouldShowBackButton = computed(() => {
      const isNoBackButtonRoute = noBackButtonRoutes.includes(route.path);
      return isMobile.value && !isNoBackButtonRoute;
    });

    const goBack = () => {
      router.back();
    };

    return {
      isMobile,
      token,
      handleLogout,
      headerClasses,
      shouldShowHeader,
      shouldShowBackButton,
      goBack,
      notificationDropdown,
      isShakingNotification,
      isShakingMessage,
      hasNewNotification,
      hasNewMessage,
      resetMessageNotification,
      resetNotification,
    };
  },
};
</script>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake {
  animation: shake 0.5s;
}

.bg-red-500 {
  background-color: #f56565;
}

.relative {
  position: relative;
}

/* Existing styles */
.active {
  color: #1c592f; /* Highlight color for active link */
  font-weight: bold;
}

.hover-color:hover {
  color: #1c592f; /* Hover color */
}
</style>
