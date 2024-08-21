<template>
  <section id="faq" class="faq-section my-10">
    <div class="container mx-auto">
      <h2 class="section-title" data-aos="fade-up">
        Veelgestelde Vragen (FAQ)
      </h2>
      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :data-aos="'zoom-in'"
        >
          <button @click="toggleFaq(index)" class="faq-question">
            {{ faq.question }}
            <span
              :class="faq.open ? 'rotate-180' : 'rotate-0'"
              class="transform transition-transform duration-300"
            >
              <i class="fas fa-chevron-down"></i>
            </span>
          </button>
          <transition name="faq-toggle" @enter="enter" @leave="leave">
            <div v-show="faq.open" ref="faqAnswers" class="faq-answer">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "FAQ",
  data() {
    return {
      faqs: [
        {
          question: "Wat is snelwoningruil.nl?",
          answer:
            "Snelwoningruil is een woningruilplatform in Nederland, ontworpen om huurders gemakkelijk en veilig te helpen een ruilpartner te vinden en te ruilen.",
          open: false,
        },
        {
          question: "Hoe werkt het woningruilproces?",
          answer:
            "Het proces is simpel: 1. Vind een geschikte ruilpartner(s) 2. Maak een afspraak voor bezichtiging 3. Regel de documenten 4. Lever alles in bij de woningcorporaties 5. Onderteken je nieuwe contract 6. Geslaagde woningruil!",
          open: false,
        },
        {
          question: "Hoe helpt Snelwoningruil met de documenten?",
          answer:
            "Wij proberen zoveel mogelijk te helpen aan de kant van jou en van de woningcorporatie. We bieden checks aan of je de juiste documenten hebt, en communiceren snel met de woningcorporaties zodat het wachten minder lang wordt. Stuur een mail naar info@snelwoningruil.nl",
          open: false,
        },
        {
          question: "Is Snelwoningruil gratis te gebruiken?",
          answer: "Ja, ons platform is helemaal gratis voor alle gebruikers.",
          open: false,
        },
        {
          question:
            "Is het veilig om via snelwoningruil.nl woningen te ruilen?",
          answer:
            "Veiligheid is onze prioriteit. We verifiëren alle gebruikers en bieden een veilig platform voor communicatie.",
          open: false,
        },
        {
          question: "Kan ik met iedereen in Nederland woningen ruilen?",
          answer:
            "Ja, je kunt woningen ruilen met iedereen in Nederland zolang alle partijen akkoord gaan met de ruilvoorwaarden.",
          open: false,
        },
        {
          question: "Wat als ik niet meteen een geschikte woning vind?",
          answer:
            "Ons platform wordt continu bijgewerkt met nieuwe aanbiedingen. Blijf regelmatig kijken of stel meldingen in voor nieuwe woningen die aan jouw criteria voldoen.",
          open: false,
        },
        {
          question: "Kan ik mijn huurwoning ruilen?",
          answer:
            "Ja, zolang zowel jij als de ruilpartner huurders zijn en de juiste toestemming hebben van je woningcorporatie/verhuurders.",
          open: false,
        },
        {
          question: "Wat voor soort woningen kan ik vinden op Snelwoningruil?",
          answer:
            "Je kunt een verscheidenheid aan woningen vinden, waaronder appartementen, huizen en meer, in verschillende steden en buurten door heel Nederland.",
          open: false,
        },
        {
          question:
            "Hoe neem ik contact op met een andere gebruiker om een woningruil te regelen?",
          answer:
            "Als je een woning vindt waarin je geïnteresseerd bent, kun je ons chat systeem gebruiken om contact op te nemen met de huiseigenaar en de details van de ruil te bespreken.",
          open: false,
        },
        {
          question: "Wat gebeurt er als er een probleem is tijdens de ruil?",
          answer:
            "Als er problemen ontstaan, staat ons ondersteuningsteam klaar om te helpen. We raden beide partijen aan om duidelijk te communiceren en alle voorwaarden van de ruil vast te leggen voordat ze verder gaan.",
          open: false,
        },
        {
          question: "Hoe upload ik foto's van mijn woning?",
          answer:
            "Na registratie ga je naar je profiel, klik op “Foto’s toevoegen,” en upload hoogwaardige afbeeldingen die je woning het beste laten zien.",
          open: false,
        },
        {
          question: "Wat voor ondersteuning biedt Snelwoningruil?",
          answer:
            "We bieden consultaties om te helpen met alle benodigde papieren en procedures, om een soepele en probleemloze woningruil te ervaren.",
          open: false,
        },
        {
          question: "Hoe begin ik?",
          answer:
            "Bezoek gewoon onze website snelwoningruil.nl, maak een account aan, plaats je woning en begin met zoeken naar jouw perfecte woningruilmatch!",
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
    },
    leave(el) {
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = 0;
      });
    },
  },
  mounted() {
    AOS.init({
      duration: 1200, // Duration of the animation
      easing: "ease-in-out", // Easing for the animation
      once: true, // Allow animations to repeat
    });
  },
};
</script>

<style scoped>
.faq-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #e4eee6, #f7fafc);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow-x: hidden; /* Add this to hide overflow on the x-axis */
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1c592f;
  text-align: center;
  margin-bottom: 2.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  transition: color 0.3s ease;
  color: #2d3748;
}

.faq-question:hover {
  color: #1c592f;
}

.faq-answer {
  overflow: hidden;
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
  height: 0;
  transition: height 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .faq-question {
    font-size: 1rem;
  }
  .faq-answer {
    font-size: 0.875rem;
  }
}
</style>
