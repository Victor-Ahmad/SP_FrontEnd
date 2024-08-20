<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="container mx-auto">
      <h2 class="section-title text-center mb-10 animate-hidden">
        Hoe werkt het?
      </h2>
      <div class="timeline">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="timeline-item animate-hidden"
        >
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
        <!-- Vertical Line -->
        <div class="timeline-line"></div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from "animejs";

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
  mounted() {
    this.observeAnimations();
  },
  methods: {
    observeAnimations() {
      const options = {
        threshold: 0.1, // Start animation when 10% of the element is visible
      };

      const observer = new IntersectionObserver(
        this.handleIntersection,
        options
      );

      this.$el.querySelectorAll(".animate-hidden").forEach((el) => {
        observer.observe(el);
      });
    },
    handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Remove the hidden class and animate with a fade-up effect
          element.classList.remove("animate-hidden");

          anime({
            targets: element,
            translateY: [200, 0], // Move up from below
            opacity: [0, 1], // Fade in
            easing: "easeOutExpo", // Smooth easing function
            duration: 1200, // Duration of the animation
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
.how-it-works-section {
  padding: 5rem 1rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: #f0f4f8;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1c592f;
  margin-bottom: 3rem;
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
  width: 5px;
  border-radius: 6px;
  transform: translateX(-50%);
  z-index: 2;
  background: linear-gradient(to bottom, #fff 50%, transparent 0);
  background-size: 12px 40px;
}

.timeline::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 40px;
  background-color: #908f8f;
  border-radius: 10px;
  transform: translateX(-50%);
  z-index: 1;
}

.animate-hidden {
  opacity: 0;
  transform: translateY(50px); /* Start below and fade up */
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 30px;
  box-sizing: border-box;
  z-index: 8;
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
  width: 60px;
  height: 60px;
  background-color: #1c592f;
  border: 4px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.milestone-left {
  left: calc(50% - 6px);
}

.milestone-right {
  left: calc(50% + 6px);
}

.milestone-number {
  font-size: 1.5rem;
  font-weight: bold;
}

.content-box {
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  text-align: center;
}

.content-box:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(-10px);
}

.content-left {
  padding-right: 60px;
}

.content-right {
  padding-left: 60px;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1c592f;
  margin-bottom: 15px;
}

.timeline-description {
  font-size: 1.1rem;
  color: #607d8b;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .timeline::before,
  .timeline::after {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    padding-left: 40px;
    padding-right: 0;
  }

  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    left: 0;
  }

  .milestone {
    left: 20px;
    z-index: 5; /* Ensure milestones are in the foreground */
  }

  .content-left,
  .content-right {
    text-align: left;
    padding: 20px;
  }

  .timeline::after {
    width: 20px;
  }
  .timeline::before {
    width: 3px;
  }
  .milestone {
    width: 40px;
    height: 40px;
  }
  .milestone-number {
    font-size: 1rem;
  }

  .timeline-title {
    font-size: 1rem;
  }

  .timeline-description {
    font-size: 0.8rem;
  }
  .section-title {
    font-size: 2rem;
  }
}
</style>
