<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Hoe werkt het?</h2>
      <div class="steps-map">
        <svg
          class="steps-path"
          viewBox="0 0 1000 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="curve"
            d="M 50 350 C 150 150, 350 150, 450 350 S 750 550, 950 350"
            stroke="#3b82f6"
            stroke-width="4"
            fill="transparent"
          />
        </svg>
        <div
          v-for="(step, index) in steps"
          :key="index"
          :class="`step step-${index + 1}`"
          :style="getStepStyle(index)"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-text">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HowItWorks",
  data() {
    return {
      steps: [
        {
          title: "Waar wil je naartoe en wat zoek je?",
          text: "Geef details over het huis dat je zoekt. Wees duidelijk en geef volledige informatie zodat het systeem van de site je kan helpen een geschikt huis te vinden.",
        },
        {
          title: "Jouw woninginformatie",
          text: "Vul de informatie over je huis in, zoals huurprijs, aantal kamers, type huis, enz. Zorg dat het duidelijk is en alle nodige details bevat.",
        },
        {
          title: "Het account",
          text: "Vul vervolgens je persoonlijke informatie in. Deze informatie wordt niet weergegeven en wordt alleen gebruikt voor het aanmaken van het account. Onze website garandeert je privacy.",
        },
        {
          title: "Foto’s en beschrijving",
          text: "Voeg duidelijke foto's van je huis toe.",
        },
        {
          title: "Blader door beschikbare woningen",
          text: "Je kunt vervolgens alle woningen op de site bekijken. Als je een van de huizen leuk vindt, laat je interesse weten door een like te geven en neem contact op met de andere partij via de chat.",
        },
        {
          title: "De documenten",
          text: "Willen jullie met elkaar ruilen? Begin met het regelen van de documenten. Als je hulp nodig hebt, stuur ons een mail op info@snelwoningruil.nl",
        },
        {
          title: "Genieten van een geslaagde ruil!",
          text: "Het proces is succesvol afgerond. De site helpt je een huis vinden dat aan je verwachtingen voldoet en bespaart je tijd en moeite. We bieden je ook consultaties aan met betrekking tot alle nodige papieren. Klanttevredenheid is ons belangrijkste doel.",
        },
      ],
    };
  },
  methods: {
    getStepStyle(index) {
      const positions = [
        { top: "300px", left: "50px" },
        { top: "100px", left: "200px" },
        { top: "300px", left: "350px" },
        { top: "100px", left: "500px" },
        { top: "300px", left: "650px" },
        { top: "100px", left: "800px" },
        { top: "300px", left: "950px" },
      ];
      return positions[index];
    },
  },
};
</script>

<style scoped>
.how-it-works-section {
  padding: 4rem 1rem;
  background-color: #f9f9f9;
  position: relative;
}
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.steps-map {
  position: relative;
  height: 400px;
}
.steps-path {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.step {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: left;
  position: absolute;
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.step:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
.step-number {
  font-size: 2rem;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 1rem;
}
.step-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.step-text {
  font-size: 1rem;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .step {
    width: 150px;
  }
  .steps-map {
    height: 600px;
  }
}
</style>
