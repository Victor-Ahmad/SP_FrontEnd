<template>
  <section id="tips" class="tips-section">
    <div class="container mx-auto text-center">
      <h2 class="section-title">Tips voor een succesvolle ruil</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul class="tips-list">
          <li>
            <strong>Foto’s toevoegen:</strong> Zorg ervoor dat je duidelijke en
            heldere foto’s van je huis toevoegt. Advertenties met foto’s hebben
            een grotere kans van slagen.
          </li>
          <li>
            <strong>Omschrijving woning:</strong> Deze details helpen het
            systeem van de site om opties te vinden die echt bij jou passen.
          </li>
          <li>
            <strong>Communiceer duidelijk:</strong> Bespreek al je wensen en
            behoeftes met je ruilpartner. Duidelijke communicatie helpt
            misverstanden te voorkomen.
          </li>
          <li>
            <strong>Realistische verwachtingen:</strong> Iedereen zoekt naar
            diens ideale huis. Het is natuurlijk zo dat huizen worden toegewezen
            op een manier dat deze gepast is voor zowel de inkomenssituatie en
            de grote van het huishouden. Zoek naar je droomhuis, maar wees ook
            realistisch.
          </li>
          <li>
            <strong>Dagelijks inloggen:</strong> Hoe meer je inlogt, hoe groter
            de kans op slagen. Ons systeem past aan op basis van jou gegeven
            interesses.
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
};
</script>

<style scoped>
.tips-section {
  padding: 4rem 1rem;
  background-color: white;
}
.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.tips-list {
  text-align: left;
  list-style: none;
  padding: 0;
}
.tips-list li {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}
.tips-image {
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  .tips-list li {
    font-size: 1rem;
  }
}
</style>
