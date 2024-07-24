<template>
  <div class="min-h-screen pb-20 md:py-8 lg:p-8 bg-gray-100 lg:bg-white">
    <div class="flex flex-col lg:flex-row">
      <div class="hidden lg:block w-full lg:w-1/4">
        <FilterBar :filters="filters" @applyFilters="applyFilters" />
      </div>
      <div
        class="w-full lg:w-3/4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 pt-8 lg:p-0"
      >
        <div
          v-if="progress < 100"
          class="progress-background col-span-full w-full rounded-full shadow-lg h-min"
        >
          <div class="progress-container">
            <div class="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle class="background" cx="50" cy="50" r="45"></circle>
                <circle class="foreground" cx="50" cy="50" r="45"></circle>
              </svg>
              <div class="progress-text">{{ progress }}%</div>
            </div>
            <div class="missing-steps">
              <p>{{ $t("page.completeAccount") }}</p>
              <router-link :to="profileCompletionLink">{{
                $t("page.goToProfile")
              }}</router-link>
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="text-center">{{ $t("page.loading") }}</div>
        <div v-else-if="error" class="text-red-600 text-center">
          {{ error }}
        </div>
        <div
          v-else
          class="tab-buttons col-span-full underlined-tabs hidden lg:flex"
        >
          <button
            :class="[
              'py-2 lg:py-2.5 h-min',
              { 'active-tab': activeTab === 'houses' },
            ]"
            @click="setActiveTab('houses')"
          >
            {{ $t("page.allList") }}
          </button>
          <button
            :class="[
              'py-2 lg:py-2.5 h-min',
              { 'active-tab': activeTab === 'triangles' },
            ]"
            @click="setActiveTab('triangles')"
          >
            {{ $t("page.perfectTriangles") }}
          </button>
        </div>

        <div
          v-if="activeTab === 'houses'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <button
            @click="openFilterDrawer"
            class="lg:hidden p-4 border border-[#1c592f] text-[#1c592f] flex items-center rounded-md justify-center"
          >
            <i class="fas fa-filter mr-2"></i> {{ $t("page.openFilters") }}
          </button>
          <HouseCard
            v-for="house in filteredHouses"
            :key="house.id"
            :house="house"
          />
          <div class="col-span-full">
            <BasePagination
              :currentPage="currentPage"
              :totalPages="totalPages"
              @changePage="fetchFilteredHouses"
            />
          </div>
        </div>
        <div
          v-else-if="activeTab === 'triangles'"
          class="col-span-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <TriangleSwapCard
            v-for="triangle in triangleSwapHouses"
            :key="triangle.house_a.id"
            :triangle="triangle"
          />
          <div class="col-span-full">
            <BasePagination
              :currentPage="triangleCurrentPage"
              :totalPages="triangleTotalPages"
              @changePage="fetchTriangleSwapHouses"
            />
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="showFilterDrawer"
        class="fixed inset-0 z-50 bg-white shadow-lg lg:hidden filter-drawer"
      >
        <div class="flex justify-between items-center mb-4 p-4">
          <h2 class="text-xl font-bold text-[#1c592f]">
            {{ $t("page.filters") }}
          </h2>
          <button @click="closeFilterDrawer" class="text-xl">&times;</button>
        </div>
        <div class="p-4 overflow-y-auto">
          <FilterBar
            :filters="filters"
            @applyFilters="handleApplyFilters"
            @clearFilters="closeFilterDrawer"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import HouseCard from "@/components/HouseCard.vue";
import TriangleSwapCard from "@/components/TriangleSwapCard.vue";
import FilterBar from "@/components/FilterBar.vue";
import BasePagination from "@/components/BasePagination.vue";
import { getProfileProgress } from "@/services/apiService";

export default {
  name: "Home",
  components: {
    HouseCard,
    TriangleSwapCard,
    FilterBar,
    BasePagination,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const filteredHouses = computed(() => store.getters.filteredHouses);
    const triangleSwapHouses = computed(() => store.getters.triangleSwapHouses);
    const pagination = computed(() => store.getters.pagination);
    const trianglePagination = computed(() => store.getters.trianglePagination);

    const filters = ref({
      search: "",
      minSize: 1,
      maxFloor: 10,
      numberOfRooms: [],
      areas: [],
      amenities: [],
    });

    const progress = ref(60);
    const activeTab = ref("houses");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const triangleCurrentPage = ref(1);
    const triangleTotalPages = ref(1);
    const showDescription = ref(false);
    const showImages = ref(false);

    const showFilterDrawer = ref(false); // State for showing filter drawer

    const fetchFilteredHouses = async (page = 1, formData = null) => {
      try {
        await store.dispatch("fetchFilteredHouses", { formData, page });
        currentPage.value = pagination.value.current_page;
        totalPages.value = pagination.value.last_page;
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    const fetchTriangleSwapHouses = async (page = 1) => {
      try {
        await store.dispatch("fetchTriangleSwapHouses", { page });
        triangleCurrentPage.value = trianglePagination.value.current_page;
        triangleTotalPages.value = trianglePagination.value.last_page;
      } catch (error) {
        console.error("Error fetching triangle swap houses:", error);
      }
    };

    const fetchProfileProgress = async () => {
      try {
        const response = await getProfileProgress();
        if (response.success) {
          const progressPercentage = parseInt(response.result.progress);
          progress.value = progressPercentage;
          updateProgress(progressPercentage);
          processMissingSteps(response.result.missing_steps);
        }
      } catch (error) {
        console.error("Error fetching profile progress:", error);
      }
    };

    const processMissingSteps = (missingSteps) => {
      showDescription.value = missingSteps.some((step) =>
        step.toLowerCase().includes("description")
      );
      showImages.value = missingSteps.some((step) =>
        step.toLowerCase().includes("image")
      );
    };

    const applyFilters = async (formData) => {
      const formDataEntries = [];
      for (const [key, value] of formData.entries()) {
        formDataEntries.push(`${key}: ${value}`);
      }
      console.log(formDataEntries);

      await fetchFilteredHouses(1, formData);
    };

    const handleApplyFilters = async (formData) => {
      await applyFilters(formData);
      closeFilterDrawer();
    };

    const openFilterDrawer = () => {
      showFilterDrawer.value = true;
      document.body.style.overflow = "hidden"; // Disable background scroll
    };

    const closeFilterDrawer = () => {
      showFilterDrawer.value = false;
      document.body.style.overflow = ""; // Enable background scroll
    };

    const setActiveTab = (tab) => {
      if (tab === "triangles") {
        activeTab.value = "triangles";
      } else {
        activeTab.value = tab;
      }
    };

    const updateProgress = () => {
      const progressValue = progress.value;
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (progressValue / 100) * circumference;
      const foregroundCircle = document.querySelector(
        ".progress-circle .foreground"
      );
      if (foregroundCircle) {
        foregroundCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        foregroundCircle.style.strokeDashoffset = offset;
      }
    };

    onMounted(() => {
      fetchProfileProgress();
      fetchFilteredHouses();
      fetchTriangleSwapHouses();
    });

    const profileCompletionLink = computed(() => ({
      name: "ProfileCompletion",
      query: {
        showDescription: showDescription.value,
        showImages: showImages.value,
      },
    }));

    watch(progress, updateProgress);

    return {
      isLoading,
      error,
      filteredHouses,
      filters,
      applyFilters,
      progress,
      activeTab,
      currentPage,
      totalPages,
      triangleCurrentPage,
      triangleTotalPages,
      setActiveTab,
      fetchFilteredHouses,
      fetchTriangleSwapHouses,
      profileCompletionLink,
      triangleSwapHouses,
      showFilterDrawer,
      openFilterDrawer,
      closeFilterDrawer,
      handleApplyFilters,
    };
  },
};
</script>

<style scoped>
/* Ensure fixed height for the swiper */
.swiper-container {
  height: 100%;
}

button i.fas.fa-heart,
button i.far.fa-heart {
  transition: color 0.3s;
  font-size: 24px;
  /* Increase font size for larger icon */
}

button i.fas,
button i.far {
  font-size: 16px;
  /* Decrease icon size for smaller buttons */
}

.house-card {
  transition: border 0.3s ease;
}

button.absolute {
  padding: 8px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: none;
}

button.absolute i {
  font-size: 24px;
}

/* Button hover effects */
button:hover {
  transform: none;
}

.bg-light-orange {
  width: 500px;
  background-color: rgba(255, 166, 0, 0.2);
}

.bg-blue-custom {
  background-color: #fc3025;
}

.text-blue-custom {
  color: #154aa8;
}

.text-purple-custom {
  color: #1c592f;
}

.text-green-custom {
  color: #22893c;
}

.text-orange-custom {
  color: #ff6500;
}

.custom_hover:hover {
  border-color: #ff6500;
}

.bg-green-custom {
  background-color: #22893c;
}

.bg-purple-custom {
  background-color: #1c592f;
}

.bg-red-custom {
  background-color: #5e1675;
}

.bg-blue-custom {
  background-color: #154aa8;
}

.bg-orange-custom {
  background-color: #ff6500;
}

/* Additional CSS for the grid layout */

/* Background for the progress section */
.progress-background {
  padding: 20px;
  margin-bottom: 20px;
  /* box-shadow: 0 5px 10px rgba(0, 0, 0, 0.315); */
  display: flex;
  align-items: center;
}

.progress-container {
  display: flex;
  align-items: center;
}

.progress-circle {
  position: relative;
  width: 100px;
  height: 100px;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle circle {
  fill: none;
  stroke-width: 10;
}

.progress-circle .background {
  stroke: #e4eee6;
}

.progress-circle .foreground {
  stroke: #1c592f;
  stroke-linecap: round;
  stroke-dasharray: 0 100;
  transition: stroke-dasharray 1s ease, stroke-dashoffset 1s ease;
  transition-delay: 0.3s;
}

.progress-circle .progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  font-weight: bold;
  color: #000000;
}

.missing-steps {
  margin-left: 20px;
}

.missing-steps p {
  font-size: 0.9em;
  color: #000000;
}

.missing-steps a {
  display: block;
  color: #1c592f;
  text-decoration: none;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9em;
}

.missing-steps a:hover {
  text-decoration: underline;
  color: #1c592f;
}

/* Underlined Tabs Styling */
.underlined-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  border-bottom: 2px solid #ccc;
}

.underlined-tabs button {
  flex: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
  margin: 0;
}

.underlined-tabs button:hover {
  background-color: #ebebeb;
}

.underlined-tabs .active-tab {
  border-bottom: 3px solid #1c592f;
  font-weight: 700;
  background-color: #e4eee6;
}

/* Pagination Styles */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.pagination-container button {
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.pagination-container button.active {
  background-color: #1c592f;
  color: #fff;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Transition for the filter drawer */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

/* Filter Drawer Styling */
.filter-drawer {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 80px; /* Ensure space for close button */
}
</style>
