<template>
  <section id="landing-swaps" class="landing-swaps-section">
    <div class="container mx-auto">
      <h2 class="section-title text-center mb-10" data-aos="fade-up">
        Onze Woningruil Aanbiedingen
      </h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        data-aos="fade-up"
      >
        <div
          v-for="(house, index) in houses"
          :key="house.id"
          class="house-card flex flex-col rounded overflow-hidden shadow-lg"
          data-aos="fade-in"
          @click="goToDetailPage(house.id)"
        >
          <!-- House Image Slider -->
          <div class="relative w-full h-64">
            <swiper
              :slides-per-view="1"
              class="w-full h-full"
              :modules="swiperModules"
              :pagination="{ clickable: true }"
              :autoplay="{ delay: 5000, disableOnInteraction: false }"
            >
              <swiper-slide
                v-for="(image, imgIndex) in house.images"
                :key="imgIndex"
              >
                <img
                  :src="getImageUrl(image.image_path)"
                  class="w-full h-full object-cover"
                />
              </swiper-slide>
            </swiper>
          </div>

          <!-- House Details -->
          <div class="p-4 bg-white">
            <h3 class="text-lg font-semibold">{{ house.street }}</h3>
            <p class="text-sm text-gray-500">
              {{ house.location }}, {{ house.post_code }}
            </p>
            <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
              <p><i class="fas fa-home mr-2"></i>{{ house.house_type.type }}</p>
              <p>
                <i class="fas fa-door-open mr-2"></i
                >{{ house.number_of_rooms }} kamers
              </p>
              <p>
                <i class="fas fa-euro-sign mr-2"></i
                >{{ Math.floor(house.price) }} / maand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { getLandingSwaps } from "@/services/apiService";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "vue-router"; // Import the router
export default {
  name: "LandingSwaps",
  mounted() {
    AOS.init({
      duration: 1200, // Duration of the animation
      easing: "ease-in-out", // Easing function for smooth animations
      once: true, // Animation occurs only once
    });
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      houses: [],
      swiperModules: [Pagination, Autoplay],
    };
  },
  async created() {
    try {
      const data = await getLandingSwaps();
      if (data.success) {
        this.houses = data.result;
      }
    } catch (error) {
      console.error("Error fetching landing swaps:", error);
    }
  },
  methods: {
    getImageUrl(path) {
      return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
    },
    calculateDelay(index) {
      return index * 100; // Stagger delay by 100ms increments
    },
    goToDetailPage(id) {
      this.$router.push({ name: "HouseDetail", params: { id } });
    },
  },
};
</script>

<style scoped>
.landing-swaps-section {
  padding: 4rem 2rem;
  background-color: #f9f9f9;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #1c592f;
}

.house-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.house-card .swiper-container {
  height: 16rem; /* Matches the height of the image section */
}

.house-card img {
  border-bottom: 1px solid #ddd;
}
</style>
