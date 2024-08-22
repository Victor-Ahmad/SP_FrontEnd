<template>
  <section id="how-can-we-help" class="how-can-we-help-section py-12 my-10">
    <div class="container mx-auto text-center">
      <h2 class="section-title mb-8" data-aos="fade-up">
        Hoe helpt Snelwoningruil jou?
      </h2>
      <p
        class="how-can-we-help-description mb-6"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Wij nemen de stress weg van het ruilproces. Hier is waarom je voor ons
        zou moeten kiezen.
      </p>
      <div class="how-can-we-help-benefits-grid" data-aos="fade-up">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="benefit-card"
          data-aos="fade-up"
          :data-aos-delay="100 * (index + 1)"
        >
          <div class="benefit-icon-container">
            <img :src="benefit.icon" alt="" />
          </div>
          <p class="benefit-title">{{ benefit.title }}</p>
          <p class="benefit-text">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";

import Driehoeksruil from "@/assets/HowCanWeHelp/Driehoeksruil.png";
import Ideaal from "@/assets/HowCanWeHelp/Ideaal.png";
import Persoonlijke from "@/assets/HowCanWeHelp/Persoonlijke.png";
import Het from "@/assets/HowCanWeHelp/Het.png";

export default {
  name: "HowCanWeHelp",
  data() {
    return {
      benefits: [
        {
          icon: Het, // Adjust the path as needed
          title: "Het systeem",
          text: "Ons systeem zorgt ervoor dat jij snel de beste match vindt. We matchen jou met een heel wat aantal potentiële ruilpartners.",
        },
        {
          icon: Driehoeksruil, // Adjust the path as needed
          title: "Driehoeksruil",
          text: "We begrijpen dat direct ruilen soms moeilijk te vinden is. Daarom bieden we ook een optie tot driehoekruil aan.",
        },
        {
          icon: Persoonlijke, // Adjust the path as needed
          title: "Persoonlijke begeleiding",
          text: "Wij helpen je bij elke stap, van het zoeken tot het regelen van de ruil.",
        },
        {
          icon: Ideaal, // Adjust the path as needed
          title: "Ideaal voor iedereen",
          text: "Of je nu weinig tijd hebt of niet technisch bent, wij maken woningruil makkelijk en toegankelijk voor iedereen.",
        },
      ],
    };
  },
  mounted() {
    AOS.init({
      duration: 1200, // Smooth transition duration
      easing: "ease-in-out", // Easing for smooth animations
      once: true, // Allow animations to repeat
    });
  },
};
</script>
<style scoped>
.how-can-we-help-section {
  background: linear-gradient(135deg, #e3edf7, #f8f9fa);
  padding: 4rem 2rem;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1c592f;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.how-can-we-help-description {
  font-size: 1.1rem;
  color: #5a5e66;
  line-height: 1.9;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.how-can-we-help-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 2.5rem;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  position: relative; /* Required for absolute positioning of the icon */
}

.benefit-icon-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); */
  position: absolute;
  top: -35px; /* Half of the circle's height */
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden; /* Ensure the image stays within the circle */
}

.benefit-icon-container img {
  height: 100%;
}

.benefit-title {
  font-weight: bold;
  color: #1c592f;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  margin-top: 40px; /* Space to avoid overlap with the circle */
}

.benefit-text {
  font-size: 0.9rem;
  color: #646b75;
}

@media (min-width: 1024px) {
  .benefit-text {
    font-size: 1.1rem;
  }

  .benefit-title {
    font-size: 1.5rem;
  }
  .section-title {
    font-size: 2.5rem;
  }
}
</style>
