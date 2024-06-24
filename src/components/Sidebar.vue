<template>
    <div class="w-1/4 p-4 bg-white rounded-lg shadow-lg mr-6">
        <h2 class="text-xl font-bold mb-4">Search</h2>
        <input v-model="localFilters.search" type="text" placeholder="Search in the exchange list, for example"
            class="w-full p-2 mb-4 border rounded" />

        <h2 class="text-xl font-bold mb-4">Filters</h2>
        <div class="mb-4">
            <p class="text-gray-700"><strong>All (195)</strong></p>
            <p class="text-gray-700"><strong>New (75)</strong></p>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">EXCHANGE TYPE</h3>
            <div v-for="type in exchangeTypes" :key="type">
                <input type="checkbox" :value="type" v-model="localFilters.exchangeType" />
                <label class="ml-2">{{ type }}</label>
            </div>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">HIDDEN & FAVORITE MARKINGS</h3>
            <div v-for="marking in hiddenFavorites" :key="marking">
                <input type="checkbox" :value="marking" v-model="localFilters.hiddenFavorite" />
                <label class="ml-2">{{ marking }}</label>
            </div>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">AMENITIES</h3>
            <div v-for="amenity in amenities" :key="amenity">
                <input type="checkbox" :value="amenity" v-model="localFilters.amenities" />
                <label class="ml-2">{{ amenity }}</label>
            </div>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">RENT</h3>
            <input type="range" v-model="localFilters.rentRange" min="0" max="3000" step="10" multiple />
            <p>{{ localFilters.rentRange[0] }} — {{ localFilters.rentRange[1] }} €</p>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">SIZE</h3>
            <input type="range" v-model="localFilters.sizeRange" min="1" max="300" step="1" multiple />
            <p>{{ localFilters.sizeRange[0] }}m² — {{ localFilters.sizeRange[1] }}m²</p>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">WHICH FLOOR (E.G., GROUND FLOOR)</h3>
            <input type="range" v-model="localFilters.floorRange" min="0" max="10" step="1" multiple />
            <p>BG-{{ localFilters.floorRange[0] }}-{{ localFilters.floorRange[1] }}</p>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">NUMBER OF ROOMS</h3>
            <div v-for="room in rooms" :key="room">
                <input type="checkbox" :value="room" v-model="localFilters.numberOfRooms" />
                <label class="ml-2">{{ room }}</label>
            </div>
        </div>

        <div class="mb-4">
            <h3 class="font-semibold mb-2">AREAS</h3>
            <div v-for="area in areas" :key="area">
                <input type="checkbox" :value="area" v-model="localFilters.areas" />
                <label class="ml-2">{{ area }}</label>
            </div>
        </div>

        <button @click="applyFilters" class="w-full bg-blue-500 text-white py-2 rounded">Apply Filters</button>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: {
        filters: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localFilters: { ...this.filters },
            exchangeTypes: ['Direct exchange', 'Three-way exchange'],
            hiddenFavorites: ['Marked as favorite', 'Show only hidden'],
            amenities: ['Elevator', 'Balcony', 'Bath'],
            rooms: ['1', '2', '3', '4', '5', '6', '7+'],
            areas: ['Amsterdam (13)', 'North, Amsterdam (184)']
        };
    },
    methods: {
        applyFilters() {
            this.$emit('applyFilters', this.localFilters);
        }
    },
    watch: {
        filters: {
            handler(newVal) {
                this.localFilters = { ...newVal };
            },
            deep: true
        }
    }
};
</script>

<style scoped>
/* Add any additional styling if needed */
input[type="range"] {
    width: 100%;
    margin-bottom: 10px;
}
</style>
