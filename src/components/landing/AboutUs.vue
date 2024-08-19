<template>
  <section id="about-us" class="about-us-section py-12">
    <div class="container mx-auto text-center">
      <h2 class="section-title mb-8">Over ons</h2>
      <p class="about-description mb-6">
        Snelwoningruil is de plek voor snelle en veilige woningruil. Ons systeem
        zorgt ervoor dat jij snel de beste match vindt. We matchen jou met een
        heel wat aantal potentiële ruilpartners.
      </p>
      <h3 class="about-subtitle mt-10 mb-8">
        Waarom kiezen voor Snelwoningruil?
      </h3>
      <div class="about-benefits-grid">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="benefit-card"
        >
          <div class="icon-container">
            <i :class="benefit.icon"></i>
          </div>
          <p class="benefit-text">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      benefits: [
        {
          icon: "fas fa-heartbeat",
          text: "Wij nemen de stress weg van het ruilproces.",
        },
        {
          icon: "fas fa-exchange-alt",
          text: "We bieden een driehoeksruil-optie voor meer flexibiliteit.",
        },
        {
          icon: "fas fa-user-friends",
          text: "Persoonlijke begeleiding bij elke stap, van zoeken tot ruilen.",
        },
        {
          icon: "fas fa-file-alt",
          text: "Consultaties en ondersteuning bij alle documenten en procedures.",
        },
        {
          icon: "fas fa-check-circle",
          text: "Toegankelijk en makkelijk te gebruiken voor iedereen.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.about-us-section {
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
  padding: 4rem 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 2rem;
}

.about-description {
  font-size: 1.25rem;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.about-subtitle {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.about-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.benefit-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.icon-container {
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.benefit-text {
  font-size: 1.125rem;
  color: #4a5568;
}
</style>
