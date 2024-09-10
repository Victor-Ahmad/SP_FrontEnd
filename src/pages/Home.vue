<template>
  <div class="min-h-screen pb-20 md:py-8 lg:p-8 bg-gray-100 lg:bg-white">
    <div class="flex flex-col lg:flex-row">
      <div v-if="!isMobile" class="hidden lg:block w-full lg:w-1/5">
        <FilterBar
          :filters="filters"
          :filteredHouses="filteredHouses"
          @applyFilters="applyFilters"
          @updateFilteredHouses="setFilteredHouses"
        />
      </div>
      <div
        class="w-full lg:w-4/5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 pt-8 lg:p-0"
      >
        <!-- Progress Indicator -->
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
              <div class="progress-text font-medium">{{ progress }}%</div>
            </div>
            <div class="missing-steps">
              <p class="font-small">{{ $t("page.completeAccount") }}</p>
              <router-link :to="profileCompletionLink" class="font-small">{{
                $t("page.goToProfile")
              }}</router-link>
            </div>
          </div>
        </div>
        <!-- Loading and Error States -->
        <div v-if="isLoading" class="text-center font-medium">
          {{ $t("page.loading") }}
        </div>
        <div v-else-if="error" class="text-red-600 text-center font-medium">
          {{ error }}
        </div>
        <!-- Tab Buttons -->
        <div
          v-else
          class="tab-buttons col-span-full underlined-tabs hidden lg:flex"
        >
          <button
            :class="[
              'py-2 lg:py-2.5 h-min font-medium',
              { 'active-tab': activeTab === 'houses' },
            ]"
            @click="setActiveTab('houses')"
          >
            {{ $t("page.allList") }}
          </button>
          <button
            :class="[
              'py-2 lg:py-2.5 h-min font-medium',
              { 'active-tab': activeTab === 'triangles' },
            ]"
            @click="setActiveTab('triangles')"
          >
            {{ $t("page.perfectTriangles") }}
          </button>
        </div>
        <!-- Houses Tab Content -->
        <div
          v-if="activeTab === 'houses'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <div class="flex justify-between lg:hidden">
            <button
              @click="openFilterDrawer"
              class="w-2/3 p-2 border-r border-l border-t border-b bg-white border-[#1c592f] text-[#1c592f] flex items-center rounded-l-md justify-center font-small"
            >
              <i class="fas fa-filter mr-2"></i> {{ $t("page.filters") }}
            </button>
            <button
              @click="clearFilters"
              class="w-1/3 p-2 border-r border-t border-b bg-white text-gray-700 border-gray-700 flex items-center rounded-r-md justify-center font-small"
            >
              <i class="fas fa-times mr-2"></i> {{ $t("filters.clear") }}
            </button>
          </div>

          <HouseCard
            v-for="house in filteredHouses"
            :key="house.id"
            :house="house"
            @uninterested="removeFromFilteredHouses"
            :updateCounts="updateCounts"
          />
          <div class="col-span-full">
            <BasePagination
              :currentPage="currentPage"
              :totalPages="totalPages"
              @changePage="fetchFilteredHouses"
            />
          </div>
        </div>
        <!-- Triangles Tab Content -->
        <div
          v-else-if="activeTab === 'triangles'"
          class="col-span-full grid-cols-1 gap-6 lg:px-4"
        >
          <TriangleSwapCard
            v-for="triangle in triangleSwapHouses"
            :key="triangle.house_a.id"
            :triangle="triangle"
            :myHouse="triangleSwapHousesMyHouse"
          />
          <div class="col-span-full" v-if="triangleSwapHouses.length">
            <BasePagination
              :currentPage="triangleCurrentPage"
              :totalPages="triangleTotalPages"
              @changePage="fetchTriangleSwapHouses"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Filter Drawer -->
    <transition name="slide-fade">
      <div
        v-show="showFilterDrawer"
        class="fixed inset-0 z-100 bg-white shadow-lg lg:hidden filter-drawer"
      >
        <div class="flex justify-between items-center mb-4 p-4">
          <h2 class="text-xl font-bold text-[#1c592f] font-large">
            {{ $t("page.filters") }}
          </h2>
          <button @click="closeFilterDrawer" class="text-xl font-large">
            &times;
          </button>
        </div>
        <div class="p-4 overflow-y-auto">
          <FilterBar
            :filters="filters"
            :filteredHouses="filteredHouses"
            @applyFilters="handleApplyFilters"
            @clearFilters="closeFilterDrawer"
            @closeFilterDrawer="closeFilterDrawer"
            @updateFilteredHouses="setFilteredHouses"
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
import { useScreenSize } from "@/utils/useScreenSize";

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
    const { isMobile } = useScreenSize();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const filteredHouses = computed(() => store.getters.filteredHouses);
    const triangleSwapHouses = computed(() => store.getters.triangleSwapHouses);
    const triangleSwapHousesMyHouse = computed(
      () => store.getters.triangleSwapHousesMyHouse
    );
    const pagination = computed(() => store.getters.pagination);
    const trianglePagination = computed(() => store.getters.trianglePagination);
    const progress = ref(60);
    const activeTab = computed(() => store.getters.activeTab);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const triangleCurrentPage = ref(1);
    const triangleTotalPages = ref(1);

    const filters = ref({
      search: "",
      minSize: 1,
      maxFloor: 10,
      numberOfRooms: [],
      areas: [],
      amenities: [],
    });

    const showDescription = ref(false);
    const showImages = ref(false);
    const showWishes = ref(false);
    const showFilterDrawer = ref(false);

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
      showWishes.value = missingSteps.some((step) =>
        step.toLowerCase().includes("wish")
      );
    };

    const applyFilters = async (formData) => {
      await fetchFilteredHouses(1, formData);
    };

    const handleApplyFilters = async (formData) => {
      await applyFilters(formData);
      closeFilterDrawer();
    };

    const openFilterDrawer = () => {
      showFilterDrawer.value = true;
      document.body.style.overflow = "hidden";
    };

    const closeFilterDrawer = () => {
      showFilterDrawer.value = false;
      // showFilterDrawer.value = false;
      document.body.style.overflow = "";
    };

    const setActiveTab = (tab) => {
      store.dispatch("updateActiveTab", tab);
      if (tab === "triangles") {
        fetchTriangleSwapHouses();
      } else {
        fetchFilteredHouses();
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
        showWishes: showWishes.value,
      },
    }));

    watch(progress, updateProgress);

    const removeFromFilteredHouses = (houseId) => {
      const index = filteredHouses.value.findIndex(
        (house) => house.id === houseId
      );
      if (index !== -1) {
        filteredHouses.value.splice(index, 1);
      }
    };

    const clearFilters = async () => {
      filters.value = {
        search: "",
        maxRent: 3000, // Reset to the maximum
        minSize: 1, // Reset to the minimum
        maxFloor: 10,
        numberOfRooms: [],
        areas: [],
        amenities: [],
      };
      await applyFilters(new FormData());
    };

    return {
      isMobile,
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
      triangleSwapHousesMyHouse,
      showFilterDrawer,
      openFilterDrawer,
      closeFilterDrawer,
      handleApplyFilters,
      removeFromFilteredHouses,
      clearFilters,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const tab = to.query.tab || null;
      if (tab) {
        vm.setActiveTab(tab);
      } else {
        vm.setActiveTab(vm.activeTab);
      }
    });
  },
  methods: {
    updateCounts() {},
    setFilteredHouses(houses) {
      this.filteredHouses = houses; // Update the filtered houses
    },
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
  font-size: 18px; /* Reduce size of icon */
}

button i.fas,
button i.far {
  font-size: 12px; /* Reduce size of smaller icons */
}

button.absolute {
  padding: 8px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: none;
}

button.absolute i {
  font-size: 18px;
}

/* Button hover effects */
button:hover {
  transform: none;
}

/* Additional styles for progress and layout */

.missing-steps {
  margin-left: 20px;
}

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
  border-bottom: 3px solid transparent;
  margin: 0;
}

.underlined-tabs .active-tab {
  border-bottom: 3px solid #1c592f;
  font-weight: 700;
  background-color: #e4eee6;
}

.filter-drawer {
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  padding-bottom: 80px; /* Ensure space for close button */
}
</style>
