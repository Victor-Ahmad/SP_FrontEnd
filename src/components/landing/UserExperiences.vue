<template>
  <section id="user-experiences" class="bg-gray-100 py-12" data-aos="fade-up">
    <div class="container mx-auto">
      <h2 class="text-4xl font-bold mb-6">User Experiences</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6 text-lg">
          <p v-for="(experience, index) in experiences" :key="index">
            "{{ experience }}"
          </p>
        </div>
        <img
          src="@/assets/images/landing_3.jpg"
          alt="User Experiences"
          class="w-full h-auto rounded-lg shadow-lg"
        />
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
        "Snelwoningruil helped me quickly find a suitable home. The process was simple and fast! - Anneke",
        "The site is incredibly convenient and saves me a lot of time. No more hassle with endless searching! - Fatima",
        "I had never heard of home swapping before, but I was unhappy with my house. Thanks to Snelwoningruil, I found a great way to exchange my house. - Ahmed",
        "I heard about the service but was hesitant to try it. After a conversation with the Snelwoningruil team, I felt confident and exchanged my house. Now I’m very satisfied! - Marieke",
        "Snelwoningruil not only helped me find a new house but also with all the required procedures and paperwork. It was a great help! - Alicia",
        "Thanks to the Snelwoningruil website, my family and I found a new home that perfectly fits us. We are very happy with it! - Danny",
      ],
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
