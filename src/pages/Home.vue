<template>
    <div class="min-h-screen p-8">
        <div v-if="isLoading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
        <div v-else class="flex">
            <div class="w-1/4">
                <Sidebar :filters="filters" @applyFilters="applyFilters" />
            </div>
            <div class="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div   v-if="progress < 100" class="progress-background col-span-full">
                    <div class="progress-container">
                        <div class="progress-circle">
                            <svg viewBox="0 0 100 100">
                                <circle class="background" cx="50" cy="50" r="45"></circle>
                                <circle class="foreground" cx="50" cy="50" r="45"></circle>
                            </svg>
                            <div class="progress-text">{{ progress }}%</div>
                        </div>
                        <div class="missing-steps">
                            <p>Complete your account to get better house exchange matches</p>
                            <router-link :to="profileCompletionLink">Go to profile</router-link>
                        </div>
                    </div>
                </div>

                <div class="tab-buttons col-span-full underlined-tabs">
                    <button
                        :class="{'active-tab': activeTab === 'houses'}"
                        @click="setActiveTab('houses')">All List</button>
                    <button
                        :class="{'active-tab': activeTab === 'other1'}"
                        @click="setActiveTab('other1')">Perfect Triangles</button>
                </div>
                <div v-if="activeTab === 'houses'" class="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <HouseCard v-for="house in filteredHouses" :key="house.id" :house="house" />
                    <div  class="col-span-full">
                        <BasePagination
                            :currentPage="currentPage"
                            :totalPages="totalPages"
                            @changePage="fetchFilteredHouses"
                        />
                    </div>
                </div>
                <div v-else-if="activeTab === 'other1'" class="col-span-full ">
                    <p style="height: 150vh;">This is the content for the other tab 1.</p>
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
import BasePagination from '@/components/BasePagination.vue';
import { getProfileProgress } from '@/services/apiService';
export default {
    name: 'Home',
    components: {
        HouseCard,
        Sidebar,
        BasePagination
    },
    setup() {
        const store = useStore();
        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.error);
        const filteredHouses = computed(() => store.getters.filteredHouses);
        const pagination = computed(() => store.getters.pagination);

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

        const progress = ref(60);
        const activeTab = ref('houses');
        const currentPage = ref(1);
        const totalPages = ref(1);
        const showDescription = ref(false);
        const showImages = ref(false);

        const fetchFilteredHouses = async (page = 1) => {
            try {
                await store.dispatch('fetchFilteredHouses', {
                    ...filters.value,
                    page
                });
                currentPage.value = pagination.value.current_page;
                totalPages.value = pagination.value.last_page;
                await fetchProfileProgress();

            } catch (error) {
                console.error('Error fetching houses:', error);
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
                console.error('Error fetching profile progress:', error);
            }
        };
        const processMissingSteps = (missingSteps) => {
            showDescription.value = missingSteps.some(step => step.toLowerCase().includes('description'));
            showImages.value = missingSteps.some(step => step.toLowerCase().includes('image'));
        };
        const applyFilters = async () => {
            await fetchFilteredHouses(1);
        };

        const setActiveTab = (tab) => {
            activeTab.value = tab;
        };

        const updateProgress = () => {
            const progressValue = progress.value;
            const circumference = 2 * Math.PI * 45;
            const offset = circumference - (progressValue / 100) * circumference;
            const foregroundCircle = document.querySelector('.progress-circle .foreground');
            if (foregroundCircle) {
                foregroundCircle.style.strokeDasharray = `${circumference} ${circumference}`;
                foregroundCircle.style.strokeDashoffset = offset;
            }
        };

        onMounted(() => {
            fetchFilteredHouses();
        });
        const profileCompletionLink = computed(() => ({
            name: 'ProfileCompletion',
            query: { showDescription: showDescription.value, showImages: showImages.value }
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
            setActiveTab,
            fetchFilteredHouses,
            profileCompletionLink
        };
    }
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
    color: #07A984;
}
.text-green-custom {
    color: #22893c;
}
.text-orange-custom {
    color: #FF6500;
}
.custom_hover:hover {
    border-color: #FF6500;
}
.bg-green-custom {
    background-color: #22893c;
}
.bg-purple-custom {
    background-color: #07A984;
}
.bg-red-custom {
    background-color: #5e1675;
}
.bg-blue-custom {
    background-color: #154aa8;
}
.bg-orange-custom {
    background-color: #FF6500;
}

/* Additional CSS for the grid layout */
.grid {
    display: grid;
}

/* Background for the progress section */
.progress-background {
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
    stroke: #E8FDF6;
}

.progress-circle .foreground {
    stroke: #07A984;
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
    color: #07A984;
    text-decoration: none;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 0.9em;
}

.missing-steps a:hover {
    text-decoration: underline;
    color: #07A984;
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
    background-color:#07a98332;
}

.underlined-tabs .active-tab {
    border-bottom: 3px solid #07A984;
    font-weight: 700;
    background-color: #E8FDF6;
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
    background-color: #E8FDF6;
    color: #fff;
}

.pagination-container button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.pagination-container button:hover:not(:disabled) {
    background-color: #e0e0e0;
}
</style>
