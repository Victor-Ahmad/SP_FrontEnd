<template>
  <div>
    <Navbar />
    <Header />
    <main id="main-content" class="py-12">
      <div class="container mx-auto">
        <section class="text-center my-16">
          <h2 class="text-3xl font-bold mb-6">
            Make Home Swapping Easy with Snelwoningruil
          </h2>
          <p class="mb-4">
            Our system and personalized guidance with the documents ensure that
            you can quickly and simply find and exchange a new house.
          </p>
          <p>
            <a
              href="mailto:info@example.com"
              class="text-blue-500 hover:underline"
              >info@example.com</a
            >
            <a
              href="#signup"
              class="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
              >Start Here</a
            >
          </p>
        </section>
        <HowItWorks />
        <UserExperiences />
        <Tips />
        <FAQ />
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/landing/Navbar.vue";
import Header from "@/components/landing/Header.vue";
import HowItWorks from "@/components/landing/HowItWorks.vue";
import UserExperiences from "@/components/landing/UserExperiences.vue";
import Tips from "@/components/landing/Tips.vue";
import FAQ from "@/components/landing/FAQ.vue";

export default {
  components: {
    Navbar,
    Header,
    HowItWorks,
    UserExperiences,
    Tips,
    FAQ,
  },
};
</script>

<style scoped>
/* Add global styles here */
body {
  font-family: "Nunito", sans-serif;
  background-color: #f9f9f9;
  color: #333;
}
a {
  text-decoration: none;
}
</style>
