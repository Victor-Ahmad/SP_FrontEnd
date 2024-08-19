<template>
  <header class="hero-section" ref="header">
    <div class="overlay"></div>
    <div class="container mx-auto text-center text-white z-10">
      <h1 class="hero-title animate-hidden">
        Vind eenvoudig je perfecte woningruil
      </h1>
      <p class="hero-subtitle animate-hidden">
        De plek voor snelle en veilige woningruil.
      </p>
      <a href="#main-content" class="cta-button animate-hidden">Begin hier</a>
    </div>
  </header>
</template>

<script>
import anime from "animejs";

export default {
  name: "Header",
  mounted() {
    this.observeAnimations();
  },
  methods: {
    observeAnimations() {
      const options = {
        threshold: 0.1, // Trigger when 10% of the element is visible
      };

      const observer = new IntersectionObserver(
        this.handleIntersection,
        options
      );

      // Observe all elements with the class 'animate-hidden'
      this.$refs.header.querySelectorAll(".animate-hidden").forEach((el) => {
        observer.observe(el);
      });
    },
    handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Remove the hidden class and animate
          element.classList.remove("animate-hidden");

          anime({
            targets: element,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: "easeOutExpo",
            delay: (el, i) => i * 300, // Stagger the elements
          });

          // Stop observing the element after it has animated
          observer.unobserve(element);
        }
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

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 4rem; /* Increased font size for impact */
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  font-size: 1.5rem; /* Slightly increased font size */
  margin-bottom: 2.5rem;
  color: white;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7);
}

.cta-button {
  background-color: #ff6b6b;
  color: white;
  padding: 0.75rem 1.5rem; /* Increased padding */
  border-radius: 9999px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.cta-button:hover {
  background-color: #e63946;
  transform: translateY(-3px);
}

/* Hidden initially for scroll-triggered animation */
.animate-hidden {
  opacity: 0;
  transform: translateY(50px);
}
</style>
