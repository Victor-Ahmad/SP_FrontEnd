<template>
  <section id="contact-us" class="contact-us-section py-12">
    <div class="container mx-auto text-center">
      <h2 class="section-title mb-8">Contact</h2>
      <p class="contact-description mb-10">
        Heb je vragen of heb je hulp nodig bij het woningruilproces? Neem
        contact met ons op, en we helpen je graag verder!
      </p>
      <div class="contact-info-grid">
        <div class="contact-card">
          <div class="icon-container">
            <i class="fas fa-envelope"></i>
          </div>
          <p class="contact-label">Email</p>
          <a href="mailto:info@snelwoningruil.nl" class="contact-detail"
            >info@snelwoningruil.nl</a
          >
        </div>
        <div class="contact-card">
          <div class="icon-container">
            <i class="fas fa-phone-alt"></i>
          </div>
          <p class="contact-label">Telefoon</p>
          <p class="contact-detail">+31 123 456 789</p>
        </div>
        <div class="contact-card">
          <div class="icon-container">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <p class="contact-label">Adres</p>
          <p class="contact-detail">
            Snelwoningruil, Lange Straat 123, 1234 AB, Amsterdam
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from "animejs";

export default {
  name: "ContactUs",
  mounted() {
    this.animateSection();
  },
  methods: {
    animateSection() {
      anime({
        targets: ".contact-card",
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "easeOutExpo",
        duration: 800,
        delay: anime.stagger(150),
      });
    },
  },
};
</script>

<style scoped>
.contact-us-section {
  background-color: #f7fafc; /* Light grey background */
  padding: 4rem 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.contact-us-section::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: #3b82f6;
  border-radius: 50%;
  opacity: 0.1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2rem;
}

.contact-description {
  font-size: 1.25rem;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.icon-container {
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.contact-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.contact-detail {
  font-size: 1rem;
  color: #4a5568;
  transition: color 0.3s ease;
}

.contact-detail:hover {
  color: #2563eb;
  text-decoration: underline;
}

a {
  color: inherit; /* Inherit color for consistent styling */
  text-decoration: none;
}
</style>
