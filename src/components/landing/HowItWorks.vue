<template>
  <section
    id="how-it-works"
    class="py-12 bg-white text-center"
    data-aos="fade-up"
  >
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-6">How Does It Work?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src="@/assets/images/landing_2.jpg"
          alt="How it works"
          class="w-full h-auto rounded-lg shadow-lg animate__animated animate__fadeInLeft"
        />
        <div class="space-y-6 text-lg animate__animated animate__fadeInRight">
          <p v-for="(text, index) in texts" :key="index">{{ text }}</p>
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
      texts: [
        "Where do you want to go and what are you looking for? Provide details about the house you are looking for. Be clear and give complete information so that the site’s system can help you find a suitable house.",
        "Fill in information about your home, such as rent price, number of rooms, type of house, etc. Ensure that it is clear and contains all necessary details.",
        "Then, fill in your personal information. This information will not be displayed and is only used for creating the account. Our website guarantees your privacy.",
        "Add clear photos of your home. You can then view all homes on the site. If you like one of the houses, express your interest by giving a like and contact the other party through the chat.",
        "Do you want to swap with each other? Start arranging the documents. If you need help, email us at info@snelwoningruil.nl",
        "The process is successfully completed. The site helps you find a house that meets your expectations and saves you time and effort. We also offer consultations regarding all necessary paperwork. Customer satisfaction is our main goal.",
      ],
    };
  },
};
</script>

<style scoped>
section {
  background-color: #f9f9f9;
}
</style>
