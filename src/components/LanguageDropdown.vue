<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="toggleDropdown"
        type="button"
        class="inline-flex justify-center w-12 rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition duration-300 ease-in-out"
        id="options-menu"
      >
        <span class="font-medium">{{ currentLanguage }}</span>
        <svg
          class="-mr-1 ml-1 h-4 w-4 lg:h-5 lg:w-5 font-small"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="dropdownOpen"
      class="origin-top-right absolute right-0 mt-2 lg:w-16 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-300 ease-in-out"
      @click.stop
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          @click="setLanguage('en')"
          class="block px-4 py-2 font-small text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          en
        </a>
        <a
          @click="setLanguage('nl')"
          class="block px-4 py-2 font-small text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          nl
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LanguageDropdown",
  computed: {
    ...mapGetters(["currentLanguage"]),
  },
  methods: {
    ...mapActions(["setCurrentLanguage"]),
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.setCurrentLanguage(lang);
      this.dropdownOpen = false;
    },
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
