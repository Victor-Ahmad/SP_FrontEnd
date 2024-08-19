<template>
  <section id="tips" class="tips-section">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Tips voor een succesvolle ruil</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ul class="tips-list">
          <li v-for="(tip, index) in tips" :key="index" class="tip-item">
            <div class="icon-container">
              <i :class="tip.icon"></i>
            </div>
            <div class="tip-content">
              <strong>{{ tip.title }}</strong
              >: {{ tip.description }}
            </div>
          </li>
        </ul>
        <img
          src="@/assets/images/landing_4.jpg"
          alt="Tips"
          class="tips-image"
        />
      </div>
    </div>
  </section>
</template>

<script>
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
};
</script>

<style scoped>
.tips-section {
  padding: 4rem 2rem;
  background-color: #f7fafc;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 3rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

.tips-list {
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tip-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.icon-container {
  font-size: 2rem;
  color: #3182ce;
  margin-right: 1rem;
  flex-shrink: 0;
}

.tip-content {
  flex-grow: 1;
  font-size: 1.125rem;
  color: #4a5568;
}

.tips-image {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tips-image:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .tip-content {
    font-size: 1rem;
  }
}
</style>
