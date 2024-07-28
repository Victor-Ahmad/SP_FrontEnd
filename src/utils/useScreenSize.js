// src/utils/useScreenSize.js
import { ref, onMounted, onUnmounted } from "vue";

export function useScreenSize() {
  const isMobile = ref(window.innerWidth < 1024);

  const onResize = () => {
    isMobile.value = window.innerWidth < 1024;
  };

  onMounted(() => {
    window.addEventListener("resize", onResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });

  return { isMobile };
}
