<template>
  <div
    v-if="isVisible"
    class="sidebar fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50"
    @click.stop
  >
    <div class="flex justify-between items-center p-4">
      <router-link to="/" class="flex items-center">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-10 md:h-12" />
      </router-link>
      <button @click="closeSidebar" class="close-btn">&times;</button>
    </div>
    <nav class="flex flex-col space-y-4 p-4">
      <router-link
        to="/profile"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        @click="closeSidebar"
      >
        {{ $t("nav.profile") }}
      </router-link>
      <router-link
        v-if="!token"
        to="/login"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        @click="closeSidebar"
      >
        {{ $t("nav.login") }}
      </router-link>
      <router-link
        v-if="!token"
        to="/register"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
        @click="closeSidebar"
      >
        {{ $t("nav.register") }}
      </router-link>
      <button
        v-if="token"
        @click="handleLogout"
        class="hover-color transition duration-300 ease-in-out"
        active-class="active"
      >
        {{ $t("nav.logout") }}
      </button>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Sidebar",

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const token = computed(() => store.getters.token);

    const handleLogout = () => {
      store.dispatch("logout").then(() => {
        router.push("/login");
      });
    };

    return {
      token,
      handleLogout,
    };
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
