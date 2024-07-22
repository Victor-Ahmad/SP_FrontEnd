<template>
  <div
    v-if="isVisible"
    class="sidebar fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
  >
    <div class="flex justify-between items-center p-4">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-10 md:h-12" />
      <button @click="closeSidebar" class="close-btn">&times;</button>
    </div>
    <nav class="flex flex-col space-y-4 p-4" @click="closeSidebar">
      <router-link
        to="/profile"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
      >
        {{ $t("nav.profile") }}
      </router-link>
      <router-link
        to="/login"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
      >
        {{ $t("nav.login") }}
      </router-link>
      <router-link
        to="/register"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
      >
        {{ $t("nav.register") }}
      </router-link>
      <LanguageDropdown />
    </nav>
  </div>
</template>

<script>
import LanguageDropdown from "@/components/LanguageDropdown.vue";

export default {
  name: "Sidebar",
  components: {
    LanguageDropdown,
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeSidebar() {
      this.$emit("close-sidebar");
    },
  },
};
</script>

<style scoped>
.sidebar {
  transition: transform 0.3s ease-in-out;
}

.close-btn {
  font-size: 24px;
}

.hover-color:hover {
  color: #1c592f; /* Hover color */
}

.active {
  color: #1c592f; /* Highlight color for active link */
  font-weight: bold;
}
</style>
