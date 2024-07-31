<template>
  <div class="min-h-screen pb-20 lg:p-4 md:p-8 bg-gray-100 lg:bg-white">
    <div v-if="isLoading" class="text-center">{{ $t("common.loading") }}</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <div v-else class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/4">
        <div
          class="grid grid-cols-2 gap-2 lg:p-4 md:mr-6 md:grid-cols-1 md:flex md:flex-col"
        >
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'complete_profile' }"
              @click="setActiveTab('complete_profile')"
            >
              {{ $t("profileTabs.completeProfile") }} ({{
                completeProfileCount
              }})
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'swap_with_me' }"
              @click="setActiveTab('swap_with_me')"
            >
              {{ $t("profileTabs.swapWithMe") }} ({{ swapWithMeCount }})
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_interests' }"
              @click="setActiveTab('my_interests')"
            >
              {{ $t("profileTabs.myInterests") }} ({{ myInterestsCount }})
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_favorites' }"
              @click="setActiveTab('my_favorites')"
            >
              {{ $t("profileTabs.myFavorites") }} ({{ myFavoritesCount }})
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_triangles' }"
              @click="setActiveTab('my_triangles')"
            >
              {{ $t("profileTabs.myTriangleSwaps") }} ({{
                myTriangleSwapsCount
              }})
            </button>
          </div>
        </div>
      </div>
      <div class="w-full md:w-3/4 lg:pt-4 px-4 lg:py-4">
        <!-- Complete Profile Tab -->
        <div
          v-if="activeTab === 'complete_profile'"
          :class="{
            'col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
              complete_interest.length,
          }"
        >
          <template v-if="complete_interest.length">
            <HouseCardWithSwap
              v-for="house in complete_interest"
              :key="house.id"
              :house="house"
            />
          </template>
          <template v-else>
            <div class="placeholder">
              <img
                src="@/assets/images/logo2.png"
                alt="Placeholder"
                class="grayscale"
              />
            </div>
          </template>
        </div>

        <!-- Swap With Me Tab -->
        <div
          v-else-if="activeTab === 'swap_with_me'"
          :class="{
            'col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
              swap_with_me.length,
          }"
        >
          <template v-if="swap_with_me.length">
            <HouseCardWithSwap
              v-for="house in swap_with_me"
              :key="house.id"
              :house="house"
            />
          </template>
          <template v-else>
            <div class="placeholder">
              <img
                src="@/assets/images/logo2.png"
                alt="Placeholder"
                class="grayscale"
              />
            </div>
          </template>
        </div>

        <!-- My Interests Tab -->
        <div
          v-else-if="activeTab === 'my_interests'"
          :class="{
            'col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
              my_interests.length,
          }"
        >
          <template v-if="my_interests.length">
            <HouseCardWithSwap
              v-for="house in my_interests"
              :key="house.id"
              :house="house"
              :hideWhenNotInterested="true"
            />
          </template>
          <template v-else>
            <div class="placeholder">
              <img
                src="@/assets/images/logo2.png"
                alt="Placeholder"
                class="grayscale"
              />
            </div>
          </template>
        </div>

        <!-- My Favorites Tab -->
        <div
          v-else-if="activeTab === 'my_favorites'"
          :class="{
            'col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6':
              my_favorites.length,
          }"
        >
          <template v-if="my_favorites.length">
            <HouseCardWithSwap
              v-for="house in my_favorites"
              :key="house.id"
              :house="house"
            />
          </template>
          <template v-else>
            <div class="placeholder">
              <img
                src="@/assets/images/logo2.png"
                alt="Placeholder"
                class="grayscale"
              />
            </div>
          </template>
        </div>

        <!-- My Triangle Swaps Tab -->
        <div
          v-else-if="activeTab === 'my_triangles'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <template v-if="my_triangles.length">
            <TriangleSwapCard
              v-for="triangle in my_triangles"
              :key="triangle.house_a.id"
              :triangle="triangle"
              :myHouse="triangleSwapHousesMyHouse"
            />
          </template>
          <template v-else>
            <div class="placeholder">
              <img
                src="@/assets/images/logo2.png"
                alt="Placeholder"
                class="grayscale"
              />
            </div>
          </template>
          <div class="col-span-full">
            <BasePagination
              :currentPage="trianglePagination.current_page"
              :totalPages="trianglePagination.last_page"
              @changePage="fetchMyTriangleSwaps"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import HouseCardWithSwap from "@/components/HouseCardWithSwap.vue";
import TriangleSwapCard from "@/components/TriangleSwapCard.vue";
import BasePagination from "@/components/BasePagination.vue";
import {
  getMyInterests,
  getMyFavorites,
  getSwapWithMe,
  getCompleteInterest,
  getMyTriangleSwaps, // Assuming this function exists
} from "@/services/apiService";

export default {
  name: "Swaps",
  components: {
    HouseCardWithSwap,
    TriangleSwapCard,
    BasePagination,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const my_interests = ref([]);
    const my_favorites = ref([]);
    const swap_with_me = ref([]);
    const complete_interest = ref([]);
    const my_triangles = ref([]);
    const activeTab = ref("my_interests");
    const trianglePagination = ref({
      current_page: 1,
      last_page: 1,
    });

    const fetchMyInterests = async () => {
      try {
        const response = await getMyInterests();
        if (response && response.success) {
          my_interests.value = response.result;
        }
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    const fetchMyFavorites = async () => {
      try {
        const response = await getMyFavorites();
        if (response && response.success) {
          my_favorites.value = response.result;
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchSwapWithMe = async () => {
      try {
        const response = await getSwapWithMe();
        if (response && response.success) {
          swap_with_me.value = response.result;
        }
      } catch (error) {
        console.error("Error fetching swaps:", error);
      }
    };

    const fetchCompleteInterest = async () => {
      try {
        const response = await getCompleteInterest();
        if (response && response.success) {
          complete_interest.value = response.result;
        }
      } catch (error) {
        console.error("Error fetching complete interest:", error);
      }
    };

    const fetchMyTriangleSwaps = async (page = 1) => {
      try {
        const response = await getMyTriangleSwaps(page);
        if (response && response.success) {
          my_triangles.value = response.result.data;
          trianglePagination.value = {
            current_page: response.result.current_page,
            last_page: response.result.last_page,
          };
        }
      } catch (error) {
        console.error("Error fetching triangle swaps:", error);
      }
    };

    const fetchAllData = async () => {
      store.commit("setLoading", true); // Start loading
      try {
        await fetchMyInterests();
        await fetchMyFavorites();
        await fetchSwapWithMe();
        await fetchCompleteInterest();
        await fetchMyTriangleSwaps();
      } finally {
        store.commit("setLoading", false); // Finish loading
      }
    };

    const setActiveTab = async (tab) => {
      activeTab.value = tab;
      store.commit("setLoading", true); // Start loading
      try {
        switch (tab) {
          case "complete_profile":
            await fetchCompleteInterest();
            break;
          case "swap_with_me":
            await fetchSwapWithMe();
            break;
          case "my_interests":
            await fetchMyInterests();
            break;
          case "my_favorites":
            await fetchMyFavorites();
            break;
          case "my_triangles":
            await fetchMyTriangleSwaps();
            break;
        }
      } catch (error) {
        console.error(`Error fetching data for tab ${tab}:`, error);
      } finally {
        store.commit("setLoading", false); // Finish loading
      }
    };

    onMounted(() => {
      fetchAllData();
    });

    // Computed properties for item counts
    const completeProfileCount = computed(() => complete_interest.value.length);
    const swapWithMeCount = computed(() => swap_with_me.value.length);
    const myInterestsCount = computed(() => my_interests.value.length);
    const myFavoritesCount = computed(() => my_favorites.value.length);
    const myTriangleSwapsCount = computed(() => my_triangles.value.length);

    return {
      isLoading,
      error,
      my_interests,
      my_favorites,
      swap_with_me,
      complete_interest,
      my_triangles,
      activeTab,
      setActiveTab,
      fetchAllData,
      completeProfileCount,
      swapWithMeCount,
      myInterestsCount,
      myFavoritesCount,
      myTriangleSwapsCount,
      fetchMyTriangleSwaps,
      trianglePagination,
    };
  },
};
</script>

<style scoped>
.underlined-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
}

.underlined-tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
}

.underlined-tabs button:hover {
  background-color: #e4eee6;
}

.underlined-tabs .active-tab {
  border-bottom: 3px solid #1c592f;
  font-weight: 700;
  background-color: #e4eee6;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
}

.placeholder img {
  max-width: 200px;
  max-height: 200px;
  filter: grayscale(100%) opacity(50%);
}
</style>
