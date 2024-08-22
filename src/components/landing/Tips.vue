<template>
  <section id="tips" class="tips-section my-10">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Tips voor een succesvolle ruil</h2>
      <div class="tips-grid">
        <ul class="tips-list">
          <li
            v-for="(tip, index) in tips"
            :key="index"
            class="tip-item my-5"
            :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
            :data-aos-delay="100 * index"
          >
            <div class="icon-container">
              <i :class="tip.icon"></i>
            </div>
            <div class="tip-content">
              <strong class="tip-title">{{ tip.title }}</strong
              >{{ tip.description }}
            </div>
          </li>
        </ul>
        <div
          class="tips-image-container"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <img
            src="@/assets/images/landing_4.jpg"
            alt="Tips"
            class="tips-image"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "Tips",
  data() {
    return {
      tips: [
        {
          icon: "fas fa-camera",
          title: "Foto’s toevoegen",
          description:
            "Zorg ervoor dat je duidelijke en heldere foto’s van je huis toevoegt. Advertenties met foto’s hebben een grotere kans van slagen.",
        },
        {
          icon: "fas fa-info-circle",
          title: "Omschrijving woning",
          description:
            "Deze details helpen het systeem van de site om opties te vinden die echt bij jou passen.",
        },
        {
          icon: "fas fa-comments",
          title: "Communiceer duidelijk",
          description:
            "Bespreek al je wensen en behoeftes met je ruilpartner. Duidelijke communicatie helpt misverstanden te voorkomen.",
        },
        {
          icon: "fas fa-home",
          title: "Realistische verwachtingen",
          description:
            "Zoek naar je droomhuis, maar wees ook realistisch. Huizen worden toegewezen op basis van inkomenssituatie en grootte van het huishouden.",
        },
        {
          icon: "fas fa-sign-in-alt",
          title: "Dagelijks inloggen",
          description:
            "Hoe meer je inlogt, hoe groter de kans op slagen. Ons systeem past zich aan op basis van jouw gegeven interesses.",
        },
      ],
    };
  },
  mounted() {
    AOS.init({
      duration: 1000,
      easing: "ease-out-quart",
      once: true,
    });
  },
};
</script>
<style scoped>
.tip-title {
  color: #1c592f;
}

.tips-section {
  padding: 4rem 2rem;
  background-color: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 3rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .tips-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tip-item {
  position: relative; /* Needed for the absolute positioning of the icon */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem; /* Extra padding at the top to accommodate the icon */
  border-radius: 10px;
  background: white;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center; /* Center the title and text */
}

.icon-container {
  position: absolute;
  top: -25px; /* Position the icon above the card */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #1c592f;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tip-content {
  margin-top: 1rem; /* Space for the icon */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tip-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1c592f;
}

.tip-description {
  font-size: 1rem;
  color: #4a5568;
}

/* Image Container Styles */
.tips-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  height: fit-content;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tips-image {
  width: 100%;
  display: block;
  border-radius: inherit;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .tip-content {
    font-size: 1rem;
  }
  .tips-image-container {
    display: none;
  }
}
</style>
