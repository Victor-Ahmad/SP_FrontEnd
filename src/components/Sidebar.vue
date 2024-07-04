<template>
    <div class="p-6 bg-white rounded-lg shadow-lg mr-6">
      <h2 class="text-xl font-bold mb-4 text-[#07A984]">Search</h2>
      <input
        v-model="localFilters.search"
        type="text"
        placeholder="Search in the exchange list, for example"
        class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#07A984]"
      />
  
      <h2 class="text-xl font-bold mb-4 text-[#07A984]">Filters</h2>
      <div class="mb-4">
        <p class="text-gray-700 font-bold">All (195)</p>
        <p class="text-gray-700 font-bold">New (75)</p>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Exchange Type</h3>
        <div v-for="type in exchangeTypes" :key="type" class="flex items-center mb-2">
          <input type="checkbox" :value="type" v-model="localFilters.exchangeType" class="form-checkbox text-[#07A984] mr-2" />
          <label class="text-gray-700">{{ type }}</label>
        </div>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Hidden & Favorite Markings</h3>
        <div v-for="marking in hiddenFavorites" :key="marking" class="flex items-center mb-2">
          <input type="checkbox" :value="marking" v-model="localFilters.hiddenFavorite" class="form-checkbox text-[#07A984] mr-2" />
          <label class="text-gray-700">{{ marking }}</label>
        </div>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Amenities</h3>
        <div v-for="amenity in amenities" :key="amenity" class="flex items-center mb-2">
          <input type="checkbox" :value="amenity" v-model="localFilters.amenities" class="form-checkbox text-[#07A984] mr-2" />
          <label class="text-gray-700">{{ amenity }}</label>
        </div>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Rent</h3>
        <input type="range" v-model="localFilters.rentRange" min="0" max="3000" step="10" multiple class="w-full mb-2" />
        <p class="text-gray-700">{{ localFilters.rentRange[0] }} — {{ localFilters.rentRange[1] }} €</p>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Size</h3>
        <input type="range" v-model="localFilters.sizeRange" min="1" max="300" step="1" multiple class="w-full mb-2" />
        <p class="text-gray-700">{{ localFilters.sizeRange[0] }}m² — {{ localFilters.sizeRange[1] }}m²</p>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Which Floor (e.g., Ground Floor)</h3>
        <input type="range" v-model="localFilters.floorRange" min="0" max="10" step="1" multiple class="w-full mb-2" />
        <p class="text-gray-700">BG-{{ localFilters.floorRange[0] }}-{{ localFilters.floorRange[1] }}</p>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Number of Rooms</h3>
        <div v-for="room in rooms" :key="room" class="flex items-center mb-2">
          <input type="checkbox" :value="room" v-model="localFilters.numberOfRooms" class="form-checkbox text-[#07A984] mr-2" />
          <label class="text-gray-700">{{ room }}</label>
        </div>
      </div>
  
      <div class="mb-4">
        <h3 class="font-semibold mb-2 text-[#07A984]">Areas</h3>
        <div v-for="area in areas" :key="area" class="flex items-center mb-2">
          <input type="checkbox" :value="area" v-model="localFilters.areas" class="form-checkbox text-[#07A984] mr-2" />
          <label class="text-gray-700">{{ area }}</label>
        </div>
      </div>
  
      <button
        @click="applyFilters"
        class="w-full bg-[#07A984] text-white py-2 rounded hover:bg-green-800 transition"
      >
        Apply Filters
      </button>
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
  input[type='range'] {
    @apply w-full mb-2;
  }
  .text-green-700 {
    @apply text-[#07A984];
  }
  .bg-green-700 {
    @apply bg-[#07A984];
  }
  .border-green-700 {
    @apply border-[#07A984];
  }
  .hover\:bg-green-800:hover {
    @apply hover:bg-[#065e58];
  }
  .form-checkbox {
    @apply text-[#07A984];
  }
  </style>
  