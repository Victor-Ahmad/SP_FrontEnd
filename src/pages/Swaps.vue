<template>
  <div class="min-h-screen pb-20 lg:p-4 md:p-8 bg-gray-100 lg:bg-white">
    <div v-if="isLoading" class="text-center">Loading...</div>
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
              Complete Interest!
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'swap_with_me' }"
              @click="setActiveTab('swap_with_me')"
            >
              Swap with me
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_interests' }"
              @click="setActiveTab('my_interests')"
            >
              My Interests
            </button>
          </div>
          <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_favorites' }"
              @click="setActiveTab('my_favorites')"
            >
              My Favorites
            </button>
          </div>
          <!-- <div class="mb-2 underlined-tabs">
            <button
              :class="{ 'active-tab': activeTab === 'my_disinterests' }"
              @click="setActiveTab('my_disinterests')"
            >
              My Disinterests
            </button>
          </div> -->
        </div>
      </div>
      <div
        class="w-full md:w-3/4 lg:pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:py-4"
      >
        <div
          v-if="activeTab === 'complete_profile'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HouseCardWithSwap
            v-for="house in complete_interest"
            :key="house.id"
            :house="house"
          />
        </div>
        <div
          v-else-if="activeTab === 'swap_with_me'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HouseCardWithSwap
            v-for="house in swap_with_me"
            :key="house.id"
            :house="house"
          />
        </div>
        <div
          v-else-if="activeTab === 'my_interests'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HouseCardWithSwap
            v-for="house in my_interests"
            :key="house.id"
            :house="house"
          />
        </div>
        <div
          v-else-if="activeTab === 'my_favorites'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HouseCardWithSwap
            v-for="house in my_favorites"
            :key="house.id"
            :house="house"
          />
        </div>
        <!-- <div
          v-else-if="activeTab === 'my_disinterests'"
          class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HouseCardWithSwap
            v-for="house in my_disinterests"
            :key="house.id"
            :house="house"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import HouseCardWithSwap from "@/components/HouseCardWithSwap.vue";
import {
  getMyInterests,
  getMyFavorites,
  getSwapWithMe,
  getCompleteInterest,
  getMyDisinterests,
} from "@/services/apiService";

export default {
  name: "Home",
  components: {
    HouseCardWithSwap,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);
    const error = computed(() => store.getters.error);
    const my_interests = ref([]);
    const my_favorites = ref([]);
    const swap_with_me = ref([]);
    const complete_interest = ref([]);
    const my_disinterests = ref([]);
    const activeTab = ref("houses");

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

    const fetchMyDisinterests = async () => {
      try {
        const response = await getMyDisinterests();
        if (response && response.success) {
          my_disinterests.value = response.result;
        }
      } catch (error) {
        console.error("Error fetching disinterests:", error);
      }
    };

    const fetchAllData = async () => {
      store.commit("setLoading", true); // Start loading
      try {
        await fetchMyInterests();
        await fetchMyFavorites();
        await fetchSwapWithMe();
        await fetchCompleteInterest();
        await fetchMyDisinterests();
      } finally {
        store.commit("setLoading", false); // Finish loading
      }
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
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
      my_disinterests,
      activeTab,
      setActiveTab,
      fetchAllData,
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
  /* border-radius: 100px; */
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
</style>
