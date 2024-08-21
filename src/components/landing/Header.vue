<template>
  <header class="hero-section">
    <div class="overlay"></div>
    <div class="container mx-auto text-center text-white z-10">
      <h1 class="hero-title" data-aos="fade-up">
        Vind eenvoudig je perfecte woningruil
      </h1>
      <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
        Maak woningruil makkelijk met Snelwoningruil. Ons systeem en
        persoonlijke begeleiding met de documenten zorgen ervoor dat je snel en
        simpel een nieuw huis kunt vinden en ruilen.
      </p>

      <!-- New Email Input Field -->
      <div class="email-input-wrapper" data-aos="fade-up" data-aos-delay="200">
        <input
          type="email"
          class="email-input"
          placeholder="Voer je e-mail in"
        />
        <router-link
          to="/register"
          class="email-submit-button"
          @click="closeMenu"
          >Begin hier</router-link
        >
      </div>
      <div
        class="text-sm lg:text-xl text-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <router-link
          to="/login"
          class="font-medium hover:text-secondary-dark"
          >{{ $t("register.login") }}</router-link
        >
      </div>
    </div>
  </header>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Header",
  mounted() {
    AOS.init({
      duration: 1200, // Smooth transition duration
      easing: "ease-in-out", // Easing for smooth animations
      once: true, // Only animate once
    });
  },
};
</script>
<style scoped>
.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 0 1rem;
  overflow: hidden; /* Prevents overflow during animation */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: white;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7);
}

.email-input-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.email-input {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 9999px 0 0 9999px;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  color: black;
  background-color: white;
  width: 20%;
}

.email-submit-button {
  background-color: #1c592f;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0 9999px 9999px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.email-submit-button:hover {
  background-color: #10361c;
  transform: translateY(-3px);
}

/* Background Image Slideshow */
.hero-section::before,
.hero-section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  opacity: 0;
  animation: fadeSlideshow 12s infinite;
}

.hero-section::before {
  background-image: url("@/assets/header/1.jpg"); /* First image */
  animation-delay: 0s;
}

.hero-section::after {
  background-image: url("@/assets/header/2.jpg"); /* Second image */
  animation-delay: 6s;
}

/* Keyframes for seamless fading effect */
@keyframes fadeSlideshow {
  0% {
    opacity: 1;
  }
  45% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 1.1rem;
  }

  .hero-subtitle {
    font-size: 0.8rem;
  }

  .email-input {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
    width: 50%;
  }

  .email-submit-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
