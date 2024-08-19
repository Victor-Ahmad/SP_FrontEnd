<template>
  <section id="user-experiences" class="user-experiences-section">
    <div class="container mx-auto text-center">
      <h2 class="section-title animate-hidden">
        Ervaringen van onze gebruikers
      </h2>
      <div class="testimonials-grid">
        <div
          v-for="(experience, index) in experiences"
          :key="index"
          class="testimonial-card animate-hidden"
        >
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-text">"{{ experience.text }}"</p>
            <p class="testimonial-author">- {{ experience.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import anime from "animejs";

export default {
  name: "UserExperiences",
  data() {
    return {
      experiences: [
        {
          text: "Snelwoningruil hielp me snel een geschikte woning te vinden. Het proces was eenvoudig en snel!",
          author: "Anneke",
        },
        {
          text: "De site is ontzettend handig en bespaart me veel tijd. Geen gedoe meer met eindeloos zoeken!",
          author: "Fatima",
        },
        {
          text: "Ik had nooit eerder van huizenruil gehoord, maar ik was niet tevreden met mijn huis. Dankzij Snelwoningruil heb ik een geweldige manier gevonden om mijn huis te ruilen.",
          author: "Ahmed",
        },
        {
          text: "Ik hoorde over de dienst, maar durfde het niet meteen te proberen. Na een gesprek met het Snelwoningruil team voelde ik me zelfverzekerd en heb ik mijn huis geruild. Nu ben ik erg tevreden!",
          author: "Marieke",
        },
        {
          text: "Snelwoningruil hielp me niet alleen een nieuw huis te vinden, maar ook met alle vereiste procedures en papierwerk. Het was een grote hulp!",
          author: "Alicia",
        },
        {
          text: "Dankzij de Snelwoningruil website hebben mijn gezin en ik een nieuwe woning gevonden die perfect bij ons past. We zijn er ontzettend blij mee!",
          author: "Danny",
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
        threshold: 0.1,
      };

      const observer = new IntersectionObserver(
        this.handleIntersection,
        options
      );

      this.$refs.section.querySelectorAll(".animate-hidden").forEach((el) => {
        observer.observe(el);
      });
    },
    handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          element.classList.remove("animate-hidden");

          anime({
            targets: element,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: "easeOutExpo",
            delay: (el, i) => i * 200,
          });

          observer.unobserve(element);
        }
      });
    },
  },
};
</script>

<style scoped>
.user-experiences-section {
  padding: 4rem 1rem;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #3b82f6, #9333ea);
  border-radius: 15px 15px 0 0;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.quote-icon {
  font-size: 2rem;
  color: #9333ea;
  margin-bottom: 1rem;
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.testimonial-text {
  font-size: 1.125rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
  text-align: center;
}

.testimonial-author {
  font-weight: 600;
  color: #1a202c;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .testimonial-text {
    font-size: 1rem;
  }
}
</style>
