<template>
  <div>
    <Navbar />
    <Header />
    <main id="main-content" class="py-12">
      <div class="container mx-auto">
        <LandingSwaps />
        <HowItWorks />
        <CallToActionButton />
        <HowCanWeHelp />
        <UserExperiences />
        <Tips />
        <FAQ />
        <ContactUs />
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
import HowCanWeHelp from "@/components/landing/HowCanWeHelp.vue";
import ContactUs from "@/components/landing/ContactUs.vue";
import CallToActionButton from "@/components/landing/CallToActionButton.vue"; // Import the CTA Button
import LandingSwaps from "@/components/landing/LandingSwaps.vue";
export default {
  components: {
    Navbar,
    Header,
    HowItWorks,
    HowCanWeHelp,
    UserExperiences,
    Tips,
    FAQ,
    ContactUs,
    CallToActionButton,
    LandingSwaps,
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

/* Optional styling for the CTA container */
.cta-container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>
