<template>
  <header
    class="relative overflow-hidden bg-cover bg-center py-40"
    ref="header"
  >
    <div class="container mx-auto text-center text-white">
      <h1 class="text-6xl font-bold mb-4" ref="headerTitle">
        Easily Find Your Perfect Home Exchange
      </h1>
      <p class="text-2xl mb-8" ref="headerSubtitle">
        The place for quick and safe home exchanges.
      </p>
      <a
        href="#main-content"
        class="mt-6 bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg"
        ref="headerButton"
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
    this.animateHeader();
    this.initParallax();
  },
  methods: {
    animateHeader() {
      anime
        .timeline()
        .add({
          targets: this.$refs.headerTitle,
          translateY: [-50, 0],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1000,
        })
        .add(
          {
            targets: this.$refs.headerSubtitle,
            translateY: [-50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
          },
          "-=800"
        )
        .add(
          {
            targets: this.$refs.headerButton,
            translateY: [-50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1000,
          },
          "-=800"
        );
    },
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
