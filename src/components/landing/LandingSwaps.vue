<template>
  <section id="landing-swaps" class="landing-swaps-section">
    <div class="container mx-auto">
      <h2 class="section-title text-center mb-10" data-aos="fade-up">
        Onze Woningruil Aanbiedingen
      </h2>

      <!-- Grid for larger screens -->
      <div
        v-if="!isMobile"
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

      <!-- Swiper for mobile screens -->
      <swiper
        v-else
        :slides-per-view="1"
        :modules="swiperModules"
        style="height: 100%"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        class="shadow-lg pb-10 bg-white rounded-lg"
        data-aos="fade-up"
      >
        <swiper-slide
          v-for="(house, index) in houses"
          :key="house.id"
          @click="goToDetailPage(house.id)"
          class="house-card flex flex-col rounded overflow-hidden h-full"
        >
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
        </swiper-slide>
      </swiper>
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

export default {
  name: "LandingSwaps",
  mounted() {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
    window.addEventListener("resize", this.handleResize);
    this.handleResize(); // Initial check
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      houses: [],
      isMobile: false,
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
    goToDetailPage(id) {
      this.$router.push({ name: "HouseDetail", params: { id } });
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768; // Example mobile threshold
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
  /* color: #1c592f; */
}

.house-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.house-card .swiper-container {
  height: 16rem;
}

.house-card img {
  border-bottom: 1px solid #ddd;
}
</style>
