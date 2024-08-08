<template>
  <section id="user-experiences" class="user-experiences-section">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Ervaringen van onze gebruikers</h2>
      <div class="testimonials-grid">
        <div
          v-for="(experience, index) in experiences"
          :key="index"
          class="testimonial-card"
        >
          <div class="testimonial-content">
            <p class="testimonial-text">"{{ experience.text }}"</p>
            <p class="testimonial-author">- {{ experience.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
};
</script>

<style scoped>
.user-experiences-section {
  padding: 4rem 1rem;
  background-color: #f1f5f9;
}
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.testimonial-card {
  background: white;
  border: 2px solid #3b82f6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.testimonial-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.testimonial-text {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}
.testimonial-author {
  font-weight: bold;
  color: #333;
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
