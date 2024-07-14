<template>
  <header :class="headerClasses">
    <div class="flex items-center space-x-4">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-6 md:h-10" />
    </div>
    <nav v-if="!isMobile" class="flex space-x-4 items-center">
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
      <NotificationDropdown />
      <router-link
        v-if="!isMobile"
        to="/login"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.login") }}</router-link
      >
      <router-link
        v-if="!isMobile"
        to="/register"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        >{{ $t("nav.register") }}</router-link
      >
      <LanguageDropdown v-if="!isMobile" />
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import NotificationDropdown from "@/components/NotificationDropdown.vue";

export default {
  name: "Header",
  components: {
    LanguageDropdown,
    NotificationDropdown,
  },
  setup() {
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

    const headerClasses = computed(() => {
      return isMobile.value
        ? "w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50"
        : "fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center shadow-md z-50";
    });

    return {
      isMobile,
      headerClasses,
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
