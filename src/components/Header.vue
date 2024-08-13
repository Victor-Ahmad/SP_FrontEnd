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
        <i class="fas fa-arrow-left text-lg text-black"></i>
      </button>
      <router-link to="/" class="flex items-center">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-10 md:h-12" />
      </router-link>
    </div>
    <nav v-if="!isMobile && token" class="flex space-x-4 items-center">
      <router-link
        to="/home"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.home") }}</router-link
      >
      <router-link
        to="/swaps"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.swaps") }}</router-link
      >
      <router-link
        to="/chatPage"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.messages") }}</router-link
      >
      <router-link
        to="/profile"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.profile") }}</router-link
      >
    </nav>
    <div class="flex space-x-4 items-center">
      <NotificationDropdown v-if="token" />
      <router-link
        v-if="!isMobile && !token"
        to="/login"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.login") }}</router-link
      >
      <router-link
        v-if="!isMobile && !token"
        to="/register"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.register") }}</router-link
      >
      <button
        v-if="!isMobile && token"
        @click="handleLogout"
        class="hover-color transition duration-300 ease-in-out"
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

    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
    });

    const token = computed(() => store.getters.token);

    const handleLogout = () => {
      store.dispatch("logout").then(() => {
        router.push("/login");
      });
    };

    const headerClasses = computed(() => {
      return isMobile.value
        ? "w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50"
        : "fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50";
    });

    const hiddenRoutesOnMobile = ["/login", "/register", "/anotherRoute"]; // List of routes where header should be hidden on mobile
    const noBackButtonRoutes = ["/home", "/swaps"]; // Routes where the back button should not appear

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
    };
  },
};
</script>

<style scoped>
.active {
  color: #1c592f; /* Highlight color for active link */
  font-weight: bold;
}

.hover-color:hover {
  color: #1c592f; /* Hover color */
}
</style>
