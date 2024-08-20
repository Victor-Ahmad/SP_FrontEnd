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

.cta-button {
  background-color: #ff6b6b;
  color: white;
  padding: 0.75rem 1.5rem;
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

/* Media query for mobile screens */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.1rem; /* Smaller font size for mobile */
  }

  .hero-subtitle {
    font-size: 0.8rem; /* Smaller font size for mobile */
  }

  .cta-button {
    padding: 0.5rem 1rem; /* Adjust padding for mobile */
    font-size: 0.9rem; /* Smaller font size for mobile */
  }

  .email-input {
    font-size: 0.9rem; /* Adjust input font size for mobile */
    padding: 0.5rem 0.75rem; /* Adjust padding for mobile */
  }

  .email-submit-button {
    padding: 0.5rem 1rem; /* Adjust button padding for mobile */
    font-size: 0.9rem; /* Smaller font size for mobile */
  }
}
</style>
