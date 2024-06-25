<template>
    <div class="min-h-screen p-8">
        <div v-if="isLoading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
        <div v-else class="flex">
            <div class="w-1/4">
                <Sidebar :filters="filters" @applyFilters="applyFilters" />
            </div>
            <div class="w-3/4 space-y-6">
                <div class="progress-background">
                    <div class="progress-container ">
                        <div class="progress-circle">
                            <svg viewBox="0 0 100 100">
                                <circle class="background" cx="50" cy="50" r="45"></circle>
                                <circle class="foreground" cx="50" cy="50" r="45"></circle>
                            </svg>
                            <div class="progress-text">{{ progress }}%</div>
                        </div>
                        <div class="missing-steps">
                            <p>Complete your account to get better house exchange matches</p>
                            <a href="#">Go to profile</a>
                        </div>
                    </div>
                </div>
                
                <div class="tab-buttons underlined-tabs">
                    <button 
                        :class="{'active-tab': activeTab === 'houses'}" 
                        @click="activeTab = 'houses'">All List</button>
                    <button 
                        :class="{'active-tab': activeTab === 'other1'}" 
                        @click="activeTab = 'other1'">Perfect Triangles</button>
                </div>
                <div v-if="activeTab === 'houses'">
                    <HouseCard v-for="house in filteredHouses" :key="house.id" :house="house" />
                </div>
                <div v-else-if="activeTab === 'other1'">
                    <p>This is the content for the other tab 1.</p>
                </div>
              
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
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
        const progress = ref(60); // Set progress to 60%
        const activeTab = ref('houses'); // State variable for the active tab

        onMounted(async () => {
            await store.dispatch('fetchFilteredHouses', {
                price_min: null,
                price_max: null,
                number_of_rooms: null,
                location: null
            });
            updateProgress();
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

        const updateProgress = () => {
            const progressValue = progress.value;
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (progressValue / 100) * circumference;
            const foregroundCircle = document.querySelector('.progress-circle .foreground');
            const progressText = document.querySelector('.progress-text');

            foregroundCircle.style.strokeDasharray = `${circumference} ${circumference}`;
            foregroundCircle.style.strokeDashoffset = offset;
            progressText.textContent = `${progressValue}%`;
        };

        watch(progress, updateProgress);

        return {
            isLoading,
            error,
            filteredHouses,
            filters,
            applyFilters,
            progress,
            activeTab
        };
    }
};
</script>

<style scoped>
/* Background for the progress section */
.progress-background {
    /* background-color: #ffedd5; */
    padding: 20px;
    border-radius: 100px ; 
    margin-bottom: 20px;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.315);

}

.progress-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    stroke: #154ba854;
    /* stroke: #22893c; */
    /* stroke:#b3251e; */
}

.progress-circle .foreground {
    stroke: #154aa8;
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
    color: #154aa8;
    text-decoration: none;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 0.9em;
}

.missing-steps a:hover {
    text-decoration: underline;
    color: #154aa8;
}

/* Underlined Tabs Styling */
.underlined-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
}

.underlined-tabs button {
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 3px solid transparent;
}

.underlined-tabs button:hover {
background-color:#154ba854;
    /* background-color: rgba(0, 0, 0, 0.05); */
}

.underlined-tabs .active-tab {
    border-bottom: 3px solid #154aa8;
    font-weight: 700;
    /* background-color: #ffedd5; */
    background-color: #154ba835;
}
.bg-blue-custom {
    background-color: #154aa8;
}
.bg-green-custom {
    background-color: #22893c;
}
.bg-red-custom {
    background-color: #b3251e;
}
</style>
