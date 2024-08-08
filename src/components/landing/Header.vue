<template>
  <header class="hero-section" ref="header">
    <div class="container mx-auto text-center text-white">
      <h1 class="hero-title">Vind eenvoudig je perfecte woningruil</h1>
      <p class="hero-subtitle">De plek voor snelle en veilige woningruil.</p>
      <a href="#main-content" class="cta-button">Begin hier</a>
    </div>
  </header>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "Header",
  mounted() {
    this.animateHeader();
  },
  methods: {
    animateHeader() {
      gsap.from(".hero-title", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5,
      });
      gsap.from(".cta-button", {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: "elastic.out(1, 0.3)",
        delay: 1,
      });
    },
  },
};
</script>

<style scoped>
.hero-section {
  background: url("@/assets/images/landing_1.jpg") no-repeat center center/cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 0 1rem;
}
.hero-title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.cta-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.cta-button:hover {
  background-color: #2563eb;
}
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.25rem;
  }
  .cta-button {
    padding: 0.5rem 1rem;
  }
}
</style>
