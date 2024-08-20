<template>
  <section id="user-experiences" class="user-experiences-section my-10">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Ervaringen van onze gebruikers</h2>
      <Swiper
        :slides-per-view="1"
        :modules="modules"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :grabCursor="true"
        loop
        class="mySwiper"
      >
        <SwiperSlide v-for="(experience, index) in experiences" :key="index">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
              </div>
              <p class="testimonial-text">"{{ experience.text }}"</p>
              <div class="author-container">
                <p class="testimonial-author">- {{ experience.author }}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay, EffectFade],
    };
  },
  data() {
    return {
      experiences: [
        {
          text: "Snel Woningruil hielp me snel een geschikte woning te vinden. Het proces was eenvoudig en snel!",
          author: "Anneke",
        },
        {
          text: "De site is ontzettend handig en bespaart me veel tijd. Geen gedoe meer met eindeloos zoeken!",
          author: "Fatima",
        },
        {
          text: "Ik had nooit eerder van huizenruil gehoord, maar ik was niet tevreden met mijn huis. Dankzij Snel Woningruil heb ik een geweldige manier gevonden om mijn huis te ruilen.",
          author: "Ahmed",
        },
        {
          text: "Ik hoorde over de dienst, maar durfde het niet meteen te proberen. Na een gesprek met het Snel Woningruil team voelde ik me zelfverzekerd en heb ik mijn huis geruild. Nu ben ik erg tevreden!",
          author: "Marieke",
        },
        {
          text: "Snel Woningruil hielp me niet alleen een nieuw huis te vinden, maar ook met alle vereiste procedures en papierwerk. Het was een grote hulp!",
          author: "Alicia",
        },
        {
          text: "Dankzij de Snel Woningruil website hebben mijn gezin en ik een nieuwe woning gevonden die perfect bij ons past. We zijn er ontzettend blij mee!",
          author: "Danny",
        },
      ],
    };
  },
};
</script>
<style scoped>
.user-experiences-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa, #e4eee6);
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1c592f;
  margin-bottom: 3rem;
  position: relative;
}

.mySwiper {
  padding: 2rem 0;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  overflow: hidden;
  margin: 2.5rem;
}

.quote-icon {
  font-size: 3rem;
  color: #1c592f;
  margin-bottom: 1rem;
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.testimonial-text {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.6;
}

.author-container {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.author-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-author {
  font-weight: 700;
  color: #1c592f;
}

.swiper-pagination-bullet {
  background: #1c592f;
  opacity: 0.7;
}

.swiper-pagination-bullet-active {
  background: #1c592f;
  opacity: 1;
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
