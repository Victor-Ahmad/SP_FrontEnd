<template>
  <nav
    class="bottom-nav-bar fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-2 z-50"
  >
    <router-link to="/home" class="nav-item" active-class="active">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link to="/swaps" class="nav-item" active-class="active">
      <i class="fas fa-exchange-alt"></i>
    </router-link>
    <router-link
      :to="isMobile ? '/chats' : '/chatPage'"
      class="nav-item"
      active-class="active"
    >
      <i class="fas fa-comments"></i>
    </router-link>
    <button @click="toggleSidebar" class="nav-item sidebar">
      <i class="fas fa-bars"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: "BottomNavBar",
  data() {
    return {
      isMobile: window.innerWidth <= 768,
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped>
.bottom-nav-bar {
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 24px; /* Increase font size for icons */
}

.active {
  color: #1c592f; /* Highlight color for active link */
  font-weight: bold;
}

.hover-color:hover {
  color: #1c592f; /* Hover color */
}
</style>
