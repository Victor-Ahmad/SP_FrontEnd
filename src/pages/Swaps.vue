<template>
  <div class="min-h-screen pb-20 lg:p-4 md:p-8 bg-gray-100 lg:bg-white">
    <div v-if="isLoading" class="text-center">{{ $t("common.loading") }}</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <div v-else class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/5">
        <div
          class="tabs-container lg:p-4 md:mr-6 md:grid-cols-1 md:flex md:flex-col"
        >
          <div class="tab-item">
            <button
              :class="{ 'active-tab': activeTab === 'my_interests' }"
              @click="setActiveTab('my_interests')"
            >
              {{ $t("profileTabs.myInterests") }} ({{ myInterestsCount }})
            </button>
          </div>
          <div class="tab-item">
            <button
              :class="{ 'active-tab': activeTab === 'complete_profile' }"
              @click="setActiveTab('complete_profile')"
            >
              {{ $t("profileTabs.completeProfile") }} ({{
                completeProfileCount
              }})
            </button>
          </div>
          <div class="tab-item">
            <button
              :class="{ 'active-tab': activeTab === 'swap_with_me' }"
              @click="setActiveTab('swap_with_me')"
            >
              {{ $t("profileTabs.swapWithMe") }} ({{ swapWithMeCount }})
            </button>
          </div>
          <div class="tab-item">
            <button
              :class="{ 'active-tab': activeTab === 'my_favorites' }"
              @click="setActiveTab('my_favorites')"
            >
              {{ $t("profileTabs.myFavorites") }} ({{ myFavoritesCount }})
            </button>
          </div>
          <div class="tab-item">
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
      <div class="w-full md:w-4/5 lg:pt-4 px-4 lg:py-4">
        <!-- My Interests Tab -->
        <div
          v-if="activeTab === 'my_interests'"
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
              :confirmUninterested="true"
              :hideWhenUnclickInterested="true"
              @uninterested="handleUninterested"
              @updateCounts="updateSwapsCount"
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

        <!-- Complete Profile Tab -->
        <div
          v-else-if="activeTab === 'complete_profile'"
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
              @updateCounts="updateSwapsCount"
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
              @updateCounts="updateSwapsCount"
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
              @unfavorite="handleUnfavorite"
              @updateCounts="updateSwapsCount"
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
          :class="[
            'col-span-full  grid-cols-1 gap-6 ',
            my_triangles.length ? 'grid' : '',
          ]"
        >
          <template v-if="my_triangles.length">
            <TriangleSwapCard
              v-for="triangle in my_triangles"
              :key="triangle.house_a.id"
              :triangle="triangle"
              :myHouse="triangle.my_house"
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
          <div v-if="my_triangles.length" class="col-span-full">
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
  getMyTriangleSwaps,
  getSwapsCounts,
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

    // Reactive references for item counts
    const completeProfileCount = ref(0);
    const swapWithMeCount = ref(0);
    const myInterestsCount = ref(0);
    const myFavoritesCount = ref(0);
    const myTriangleSwapsCount = ref(0);

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

    const updateSwapsCount = async () => {
      try {
        const response = await getSwapsCounts();
        if (response && response.success) {
          myInterestsCount.value = response.result.interest_count;
          completeProfileCount.value = response.result.complete_interest_count;
          swapWithMeCount.value = response.result.swap_with_me_count;
          myFavoritesCount.value = response.result.favorite_count;
          myTriangleSwapsCount.value = response.result.top_perfect_swaps_count;
        }
      } catch (error) {
        console.error("Error fetching swaps count:", error);
      }
    };

    const removeFromInterestedHouses = async (houseId) => {
      const index = my_interests.value.findIndex(
        (house) => house.id === houseId
      );
      if (index !== -1) {
        my_interests.value.splice(index, 1);
        await updateSwapsCount();
      }
    };

    const handleUninterested = async (houseId) => {
      await removeFromInterestedHouses(houseId);
      await updateSwapsCount(); // Ensure counts are updated
    };

    const removeFromFavorites = async (houseId) => {
      const index = my_favorites.value.findIndex(
        (house) => house.id === houseId
      );
      if (index !== -1) {
        my_favorites.value.splice(index, 1);
        await updateSwapsCount();
      }
    };

    const handleUnfavorite = async (houseId) => {
      await removeFromFavorites(houseId);
      await updateSwapsCount(); // Ensure counts are updated
    };

    const fetchMyTriangleSwaps = async (page = 1) => {
      try {
        const response = await getMyTriangleSwaps(page);
        if (response && response.success) {
          my_triangles.value = response.result.paginatedItems.data;
          my_triangles.value = my_triangles.value.map((triangle) => ({
            ...triangle,
            my_house: response.result.my_house,
          }));
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
        await updateSwapsCount();
        // await fetchMyFavorites();
        // await fetchSwapWithMe();
        // await fetchCompleteInterest();
        // await fetchMyTriangleSwaps();
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
            await updateSwapsCount();
            break;
          case "swap_with_me":
            await fetchSwapWithMe();
            await updateSwapsCount();
            break;
          case "my_interests":
            await fetchMyInterests();
            await updateSwapsCount();
            break;
          case "my_favorites":
            await fetchMyFavorites();
            await updateSwapsCount();
            break;
          case "my_triangles":
            await fetchMyTriangleSwaps();
            await updateSwapsCount();
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

    return {
      isLoading,
      error,
      my_interests,
      my_favorites,
      swap_with_me,
      complete_interest,
      my_triangles,
      removeFromInterestedHouses,
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
      handleUninterested,
      handleUnfavorite,
      updateSwapsCount,
    };
  },
};
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
}

.tab-item {
  margin-bottom: 10px;
}

.tab-item button {
  width: 100%;
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

.tab-item button:hover {
  background-color: #e4eee6;
}

.tab-item .active-tab {
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

@media (max-width: 767px) {
  .tabs-container {
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .tabs-container::-webkit-scrollbar {
    display: none; /* Hide scrollbar for WebKit browsers */
  }

  .tab-item {
    flex: 0 0 auto;
    margin-right: 10px;
    border-bottom: 2px solid #ccc;
  }

  .tab-item:last-child {
    margin-right: 0;
  }

  .tab-item button {
    flex: 1;
  }
}
</style>
