<template>
  <nav
    class="bottom-nav-bar fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-2 z-50"
  >
    <router-link
      to="/home"
      class="nav-item"
      active-class="active"
      @click.native="handleNavItemClick('/home')"
    >
      <div class="icon-text">
        <i class="fas fa-home"></i>
        <span>{{ $t("bottomNav.home") }}</span>
      </div>
    </router-link>
    <router-link
      to="/swaps"
      class="nav-item"
      active-class="active"
      @click.native="handleNavItemClick('/swaps')"
    >
      <div class="icon-text">
        <i class="fas fa-exchange-alt"></i>
        <span>{{ $t("bottomNav.swaps") }}</span>
      </div>
    </router-link>
    <router-link
      :to="isMobile ? '/chatslist' : '/chatPage'"
      class="nav-item"
      active-class="active"
      @click.native="handleNavItemClick(isMobile ? '/chatslist' : '/chatPage')"
    >
      <div class="icon-text">
        <i class="fas fa-comments"></i>
        <span>{{ $t("bottomNav.chats") }}</span>
      </div>
    </router-link>
    <button @click="handleMenuClick" class="nav-item sidebar">
      <div class="icon-text">
        <i class="fas fa-bars"></i>
        <span>{{ $t("bottomNav.menu") }}</span>
      </div>
    </button>
  </nav>
</template>

<script>
export default {
  name: "BottomNavBar",
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
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
    handleNavItemClick(route) {
      // If sidebar is visible, only close it instead of navigating
      if (this.isSidebarVisible) {
        this.toggleSidebar();
      } else {
        this.$router.push(route);
      }
    },
    handleMenuClick() {
      this.toggleSidebar();
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
  z-index: 50; /* Ensure it is below the filter drawer */
}

.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 24px; /* Increase font size for icons */
  position: relative; /* Position relative for the border effect */
}

.icon-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon-text i {
  font-size: 24px; /* Adjust icon size */
}

.icon-text span {
  font-size: 12px; /* Adjust text size */
  margin-top: 4px; /* Space between icon and text */
}

.active {
  color: #1c592f; /* Highlight color for active link */
  font-weight: bold;
}

.active::before {
  content: "";
  position: absolute;
  top: -6px; /* Adjust position to ensure it appears above the nav item */
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 4px;
  background-color: #1c592f; /* Same color as the active icon */
  border-radius: 4px; /* Rounds the edges of the border */
}

.hover-color:hover {
  color: #1c592f; /* Hover color */
}
</style>
