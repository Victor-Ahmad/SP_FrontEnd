<template>
  <footer
    class="bg-[#ebebeb] text-black p-4 flex justify-between items-center shadow-md mt-auto hidden sm:flex"
  >
    <div class="flex items-center space-x-4">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-10" />
    </div>
    <nav class="flex space-x-4 items-center">
      <router-link
        to="/privacy-policy"
        class="hover:text-gray-400 transition duration-300 ease-in-out"
        >{{ $t("nav.privacy") }}</router-link
      >
    </nav>
    <div class="flex space-x-4 items-center">
      <LanguageDropdown />
    </div>
  </footer>
</template>

<script>
import LanguageDropdown from "@/components/LanguageDropdown.vue";

export default {
  name: "Footer",
  components: {
    LanguageDropdown,
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
