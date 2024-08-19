<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="container mx-auto">
      <h2 class="section-title text-center mb-10">Hoe werkt het?</h2>
      <div class="timeline">
        <div v-for="(step, index) in steps" :key="index" class="timeline-item">
          <div
            :class="[
              'milestone',
              {
                'milestone-left': index % 2 === 0,
                'milestone-right': index % 2 !== 0,
              },
            ]"
          >
            <span class="milestone-number">{{ index + 1 }}</span>
          </div>
          <div
            :class="[
              'content-box',
              {
                'content-left': index % 2 === 0,
                'content-right': index % 2 !== 0,
              },
            ]"
          >
            <h3 class="timeline-title">{{ step.title }}</h3>
            <p class="timeline-description">{{ step.description }}</p>
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
          description:
            "Geef details over het huis dat je zoekt. Wees duidelijk en geef volledige informatie zodat het systeem van de site je kan helpen een geschikt huis te vinden.",
        },
        {
          title: "Jouw woninginformatie",
          description:
            "Vul de informatie over je huis in, zoals huurprijs, aantal kamers, type huis, enz. Zorg dat het duidelijk is en alle nodige details bevat.",
        },
        {
          title: "Het account",
          description:
            "Vul vervolgens je persoonlijke informatie in. Deze informatie wordt niet weergegeven en wordt alleen gebruikt voor het aanmaken van het account. Onze website garandeert je privacy.",
        },
        {
          title: "Foto’s en beschrijving",
          description: "Voeg duidelijke foto's van je huis toe.",
        },
        {
          title: "Blader door beschikbare woningen",
          description:
            "Je kunt vervolgens alle woningen op de site bekijken. Als je een van de huizen leuk vindt, laat je interesse weten door een like te geven en neem contact op met de andere partij via de chat.",
        },
        {
          title: "De documenten",
          description:
            "Willen jullie met elkaar ruilen? Begin met het regelen van de documenten. Als je hulp nodig hebt, stuur ons een mail op info@snelwoningruil.nl",
        },
        {
          title: "Genieten van een geslaagde ruil!",
          description:
            "Het proces is succesvol afgerond. De site helpt je een huis vinden dat aan je verwachtingen voldoet en bespaart je tijd en moeite. We bieden je ook consultaties aan met betrekking tot alle nodige papieren. Klanttevredenheid is ons belangrijkste doel.",
        },
      ],
    };
  },
};
</script>
<style scoped>
.how-it-works-section {
  padding: 4rem 1rem;
  background-color: #f9f9f9;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 30px; /* Thicker line representing the road */
  background-color: #7e7e7e;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px; /* Thinner dashed line for lane markings */
  background-image: linear-gradient(#ffffff 50%, transparent 0);
  background-size: 4px 20px;
  transform: translateX(-50%);
  z-index: 2;
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.milestone {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: #3b82f6;
  border: 4px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  color: white;
}

.milestone-left {
  left: calc(50% - 20px);
}

.milestone-right {
  left: calc(50% + 20px);
}

.milestone-number {
  font-size: 1.25rem;
  font-weight: bold;
}

.content-box {
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.content-box:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.content-left {
  text-align: right;
  padding-right: 80px;
}

.content-right {
  text-align: left;
  padding-left: 80px;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.timeline-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline::before,
  .timeline::after {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    padding-left: 100px;
    padding-right: 0;
  }

  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    left: 0;
  }

  .milestone {
    left: 20px;
  }

  .milestone-left,
  .milestone-right {
    left: 20px;
  }

  .content-left,
  .content-right {
    text-align: left;
    padding: 20px;
  }
}
</style>
