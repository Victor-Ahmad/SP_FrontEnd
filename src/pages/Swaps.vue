<template>
    <div class="min-h-screen p-8">
        <div v-if="isLoading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
        <div v-else class="flex">
            <div class="w-1/4">
                <div class="p-4 mr-6">
                    <div class="mb-4 underlined-tabs">
                        <button :class="{'active-tab': activeTab === 'complete_profile'}" @click="setActiveTab('complete_profile')">Complete Interest!</button>
                    </div>
                    <div class="mb-4 underlined-tabs">
                        <button :class="{'active-tab': activeTab === 'swap_with_me'}" @click="setActiveTab('swap_with_me')">Want to swap with me</button>
                    </div>
                    <div class="mb-4 underlined-tabs">
                        <button :class="{'active-tab': activeTab === 'my_interests'}" @click="setActiveTab('my_interests')">My Interests</button>
                    </div>
                    <div class="mb-4 underlined-tabs">
                        <button :class="{'active-tab': activeTab === 'my_favorites'}" @click="setActiveTab('my_favorites')">My Favorites</button>
                    </div>
                </div>
            </div>
            <div class="w-3/4 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-if="activeTab === 'complete_profile'" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HouseCardWithSwap v-for="house in complete_interest" :key="house.id" :house="house" />
                </div>
                <div v-else-if="activeTab === 'swap_with_me'" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HouseCardWithSwap v-for="house in swap_with_me" :key="house.id" :house="house" />
                </div>
                <div v-else-if="activeTab === 'my_interests'" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HouseCardWithSwap v-for="house in my_interests" :key="house.id" :house="house" />
                </div>
                <div v-else-if="activeTab === 'my_favorites'" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HouseCardWithSwap v-for="house in my_favorites" :key="house.id" :house="house" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import HouseCardWithSwap from '@/components/HouseCardWithSwap.vue';
import { getMyInterests, getMyFavorites, getSwapWithMe, getCompleteInterest } from '@/services/apiService';

export default {
    name: 'Home',
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
        const activeTab = ref('houses');

        const fetchMyInterests = async () => {
            try {
                const response = await getMyInterests();
                if (response && response.success) {
                    my_interests.value = response.result;
                }
            } catch (error) {
                console.error('Error fetching interests:', error);
            }
        };

        const fetchMyFavorites = async () => {
            try {
                const response = await getMyFavorites();
                if (response && response.success) {
                    my_favorites.value = response.result;
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        const fetchSwapWithMe = async () => {
            try {
                const response = await getSwapWithMe();
                if (response && response.success) {
                    swap_with_me.value = response.result;
                }
            } catch (error) {
                console.error('Error fetching swaps:', error);
            }
        };

        const fetchCompleteInterest = async () => {
            try {
                const response = await getCompleteInterest();
                if (response && response.success) {
                    complete_interest.value = response.result;
                }
            } catch (error) {
                console.error('Error fetching swaps:', error);
            }
        };

        const fetchAllData = async () => {
            store.commit('setLoading', true); // Start loading
            try {
                await fetchMyInterests();
                await fetchMyFavorites();
                await fetchSwapWithMe();
                await fetchCompleteInterest();
            } finally {
                store.commit('setLoading', false); // Finish loading
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
            activeTab,
            setActiveTab,
            fetchAllData
        };
    }
};
</script>

<style scoped>
/* Underlined Tabs Styling */
.underlined-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    /* border-bottom: 2px solid #ccc; */
}

.underlined-tabs button {
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 3px solid transparent;
}

.underlined-tabs button:hover {
    background-color: #e2b8a078;
}

.underlined-tabs .active-tab {
    border-bottom: 3px solid #722262;
    font-weight: 700;
    background-color: #e2b8a054;
}
</style>
