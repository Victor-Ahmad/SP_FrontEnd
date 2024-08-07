<template>
  <header
    class="relative overflow-hidden bg-cover bg-center py-40 text-center text-white"
    ref="header"
  >
    <div class="container mx-auto">
      <h1 class="text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
        Easily Find Your Perfect Home Exchange
      </h1>
      <p class="text-2xl mb-8 animate__animated animate__fadeInUp">
        The place for quick and safe home exchanges.
      </p>
      <a
        href="#main-content"
        class="mt-6 bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg animate__animated animate__pulse"
        >Start Here</a
      >
    </div>
  </header>
</template>

<script>
import anime from "animejs";
import Parallax from "parallax-js";

export default {
  name: "Header",
  mounted() {
    this.initParallax();
  },
  methods: {
    initParallax() {
      new Parallax(this.$refs.header);
    },
  },
};
</script>

<style scoped>
header {
  background: url("@/assets/images/landing_1.jpg") no-repeat center center/cover;
  height: 100vh;
}
</style>
