<template>
  <section id="about-us" class="about-us-section py-12 my-10">
    <div class="container mx-auto text-center">
      <h2 class="section-title mb-8" data-aos="fade-up">Over Ons</h2>
      <div class="about-content">
        <div class="about-text">
          <p
            v-for="(paragraph, index) in paragraphs"
            :key="index"
            class="about-paragraph"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 200"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "AboutUs",
  data() {
    return {
      paragraphs: [
        "Snelwoningruil is ontstaan vanuit een persoonlijke worsteling—een echte ervaring van hoe moeilijk het kan zijn om de juiste woningruil te vinden. Na bijna twee jaar te hebben gezocht op onbetrouwbare en dure platforms, zonder succes, wisten we dat het anders moest. Daarom hebben we besloten om het heft in eigen handen te nemen.",
        "Gedreven door de frustraties van talloze anderen die met dezelfde uitdagingen kampen, hebben we Snelwoningruil opgericht om het anders te doen. We wilden iets betrouwbaars creëren, iets dat mensen echt helpt om de juiste ruilpartner te vinden zonder de hoge kosten en stress.",
        "We hebben in jouw schoenen gestaan en begrijpen de pijn van het eindeloos wachten op de perfecte match, om vervolgens teleurgesteld te worden door hoge kosten en inefficiënte systemen. Daarom is Snelwoningruil toegewijd om het proces zo eenvoudig en toegankelijk mogelijk te maken. Ons platform is ontworpen met echte mensen in gedachten—mensen die meer ruimte nodig hebben, op zoek zijn naar een andere buurt, of gewoon een nieuwe start willen maken zonder financiële last.",
        "In tegenstelling tot andere platforms die buitensporige kosten vragen, geloven wij dat het vinden van je volgende huis betaalbaar en stressvrij moet zijn. We hebben Snelwoningruil gebouwd, niet alleen als een dienst, maar als een oplossing voor een probleem dat we persoonlijk maar al te goed kennen. Wij zijn er om ervoor te zorgen dat jouw woningruil soepel, efficiënt en, vooral, succesvol verloopt.",
      ],
    };
  },
  mounted() {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  },
};
</script>

<style scoped>
.about-us-section {
  padding: 4rem 2rem;
  background-color: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #e4eee6, #f7fafc);
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 2rem;
  text-transform: uppercase;
  position: relative;
  z-index: 10;
}

.about-content {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.about-text {
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
  position: relative;
  z-index: 10;
}

.about-paragraph {
  font-size: 1.25rem;
  line-height: 1.75;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.about-us-section::before,
.about-us-section::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(28, 89, 47, 0.15);
  z-index: 1;
}

/* Adjust circle sizes and positions for larger screens */
.about-us-section::before {
  width: 300px;
  height: 300px;
  top: -100px; /* Move higher */
  left: -100px; /* Shift to the left */
}

.about-us-section::after {
  width: 400px;
  height: 400px;
  bottom: -150px; /* Move lower */
  right: -150px; /* Shift to the right */
}

/* Ensure circles are visible on mobile */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .about-paragraph {
    font-size: 1rem;
  }

  .about-content {
    display: block;
  }

  .about-us-section::before,
  .about-us-section::after {
    display: block; /* Ensure circles are visible on mobile */
    width: 150px; /* Smaller size */
    height: 150px; /* Smaller size */
  }

  .about-us-section::before {
    top: -50px; /* Move higher */
    left: -50px; /* Shift to the left */
  }

  .about-us-section::after {
    bottom: -75px; /* Move lower */
    right: -75px; /* Shift to the right */
  }
}
</style>
