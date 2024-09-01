<!-- Snackbar.vue -->
<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="snackbar fixed top-50 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg"
    >
      <div class="flex justify-between items-center">
        <span>{{ message }}</span>
        <button @click="closeSnackbar" class="ml-4 font-bold">&times;</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000, // Default duration is 5 seconds
    },
  },
  data() {
    return {
      isVisible: false,
      timeoutId: null,
    };
  },
  methods: {
    showSnackbar() {
      this.isVisible = true;
      this.timeoutId = setTimeout(this.closeSnackbar, this.duration);
    },
    closeSnackbar() {
      this.isVisible = false;
      clearTimeout(this.timeoutId);
    },
  },
  mounted() {
    this.showSnackbar();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.snackbar {
  z-index: 1000;
}
</style>
