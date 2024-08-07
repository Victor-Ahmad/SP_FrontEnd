<template>
  <div class="flex flex-col min-h-screen relative">
    <Header />
    <main class="flex-grow md:pt-20 lg:pt-20">
      <router-view></router-view>
    </main>
    <Footer />
    <BottomNavBar @toggle-sidebar="toggleSidebar" v-if="isMobile && token" />
    <Sidebar :isVisible="isSidebarVisible" @close-sidebar="toggleSidebar" />
    <div v-if="isSidebarVisible" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BottomNavBar from "@/components/BottomNavBar.vue";
import Sidebar from "@/components/Sidebar.vue";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
    BottomNavBar,
    Sidebar,
  },
  setup() {
    const store = useStore();
    const isMobile = ref(false);
    const isSidebarVisible = ref(false);

    const token = computed(() => store.getters.token);

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
      token,
    };
  },
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 40; /* Ensure it's below the sidebar but above other content */
}
</style>
