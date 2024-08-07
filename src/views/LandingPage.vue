<template>
  <div>
    <Header />
    <main id="main-content" class="py-12">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold mb-6">
          Make home swapping easy with Snelwoningruil
        </h2>
        <p>
          Our system and personalized guidance with the documents ensure that
          you can quickly and simply find and exchange a new house.
        </p>
        <p>
          Email@example.com
          <a href="#signup" class="text-blue-500 hover:underline"
            >[Start Here]</a
          >
        </p>
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
/* Add any additional styles here */
</style>
