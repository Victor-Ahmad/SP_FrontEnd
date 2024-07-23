<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow lg:pt-20">
      <router-view></router-view>
    </main>
    <Footer />
    <BottomNavBar @toggle-sidebar="toggleSidebar" v-if="isMobile && token" />
    <Sidebar :isVisible="isSidebarVisible" @close-sidebar="toggleSidebar" />
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

    const handleClickOutside = (event) => {
      if (isSidebarVisible.value && !event.target.closest(".sidebar")) {
        isSidebarVisible.value = false;
        console.log(event.target);
      }
    };

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", checkScreenSize);
      document.removeEventListener("click", handleClickOutside);
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
</style>
