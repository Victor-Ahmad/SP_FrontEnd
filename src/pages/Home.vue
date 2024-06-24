<template>
    <div class="min-h-screen bg-gray-100 p-8">
        <h1 class="text-3xl font-bold mb-6">Home Page</h1>
        <p class="text-lg mb-8">Welcome to the home page!</p>
        <div v-if="isLoading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
        <div v-else class="flex">
            <Sidebar :filters="filters" @applyFilters="applyFilters" />

            <!-- Main content area with reduced width and added space -->
            <div class="w-4/5 space-y-6">
                <HouseCard v-for="house in filteredHouses" :key="house.id" :house="house" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import HouseCard from '@/components/HouseCard.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    name: 'Home',
    components: {
        HouseCard,
        Sidebar
    },
    setup() {
        const store = useStore();
        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.error);
        const filteredHouses = computed(() => store.getters.filteredHouses);
        const filters = ref({
            search: '',
            exchangeType: [],
            hiddenFavorite: [],
            amenities: [],
            rentRange: [0, 3000],
            sizeRange: [1, 300],
            floorRange: [0, 10],
            numberOfRooms: [],
            areas: []
        });

        onMounted(async () => {
            await store.dispatch('fetchFilteredHouses', {
                price_min: null,
                price_max: null,
                number_of_rooms: null,
                location: null
            });
        });

        const applyFilters = async (filters) => {
            await store.dispatch('fetchFilteredHouses', {
                search: filters.search,
                exchangeType: filters.exchangeType,
                hiddenFavorite: filters.hiddenFavorite,
                amenities: filters.amenities,
                rentRange: filters.rentRange,
                sizeRange: filters.sizeRange,
                floorRange: filters.floorRange,
                numberOfRooms: filters.numberOfRooms,
                areas: filters.areas
            });
        };

        return {
            isLoading,
            error,
            filteredHouses,
            filters,
            applyFilters
        };
    }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
