<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow lg:pt-20">
      <router-view></router-view>
    </main>
    <Footer />
    <BottomNavBar @toggle-sidebar="toggleSidebar" v-if="isMobile" />
    <Sidebar :isVisible="isSidebarVisible" @close-sidebar="toggleSidebar" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BottomNavBar from "@/components/BottomNavBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
    BottomNavBar,
    Sidebar,
  },
  setup() {
    const isMobile = ref(false);
    const isSidebarVisible = ref(false);

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

    const toggleSidebar = () => {
      isSidebarVisible.value = !isSidebarVisible.value;
    };

    return {
      isMobile,
      isSidebarVisible,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
