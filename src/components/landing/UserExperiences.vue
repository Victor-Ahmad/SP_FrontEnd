<template>
  <section id="user-experiences" class="user-experiences-section my-10">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Tevreden gebruikers</h2>
      <img
        src="@/assets/userExperiance.png"
        alt="Icon"
        class="section-icon mx-auto my-4 h-24 mt-10"
      />

      <Swiper
        :slides-per-view="1"
        :modules="modules"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :grabCursor="true"
        loop
        class="mySwiper"
      >
        <SwiperSlide v-for="(experience, index) in experiences" :key="index">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="author-container">
                <div class="author-icon">
                  {{ experience.author[0].toUpperCase() }}
                </div>
                <p class="testimonial-author">{{ experience.author }}</p>
              </div>
              <p class="testimonial-text">"{{ experience.text }}"</p>
              <div class="review-container">
                <div class="stars">
                  <span v-for="n in 5" :key="n" class="star">
                    <i
                      :class="[
                        'fas',
                        n <= experience.rating
                          ? 'fa-star'
                          : n - experience.rating === 0.5
                          ? 'fa-star-half-alt'
                          : 'fa-star-o',
                      ]"
                    ></i>
                  </span>
                </div>
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
          rating: 4.5,
        },
        {
          text: "De site is ontzettend handig en bespaart me veel tijd. Geen gedoe meer met eindeloos zoeken!",
          author: "Fatima",
          rating: 4.5,
        },
        {
          text: "Ik had nooit eerder van huizenruil gehoord, maar ik was niet tevreden met mijn huis. Dankzij Snel Woningruil heb ik een geweldige manier gevonden om mijn huis te ruilen.",
          author: "Ahmed",
          rating: 4,
        },
        {
          text: "Ik hoorde over de dienst, maar durfde het niet meteen te proberen. Na een gesprek met het Snel Woningruil team voelde ik me zelfverzekerd en heb ik mijn huis geruild. Nu ben ik erg tevreden!",
          author: "Marieke",
          rating: 4.5,
        },
        {
          text: "Snel Woningruil hielp me niet alleen een nieuw huis te vinden, maar ook met alle vereiste procedures en papierwerk. Het was een grote hulp!",
          author: "Alicia",
          rating: 4.5,
        },
        {
          text: "Dankzij de Snel Woningruil website hebben mijn gezin en ik een nieuwe woning gevonden die perfect bij ons past. We zijn er ontzettend blij mee!",
          author: "Danny",
          rating: 4,
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
  color: #000;

  position: relative;
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

.author-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.author-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #1c592f;
  color: white;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-author {
  font-weight: 700;
  color: #1c592f;
  text-align: center;
}

.testimonial-text {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.6;
}

.review-container {
  display: flex;
  justify-content: center;
}

.stars {
  display: flex;
}

.star {
  font-size: 1.5rem;
  color: #ffcc00;
  margin: 0 2px;
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
  .star {
    font-size: 1.25rem;
  }
}
</style>
