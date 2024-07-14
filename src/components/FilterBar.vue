<template>
  <div class="bg-white mr-6">
    <h2 class="text-xl font-bold mb-4 text-[#1c592f]">Search</h2>
    <input
      v-model="localFilters.search"
      type="text"
      placeholder="Search in the exchange list, for example"
      class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#1c592f]"
    />

    <h2 class="text-xl font-bold mb-4 text-[#1c592f]">Filters</h2>
    <div class="mb-4">
      <p class="text-gray-700 font-bold">All (195)</p>
      <p class="text-gray-700 font-bold">New (75)</p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Exchange Type</h3>
      <div
        v-for="type in exchangeTypes"
        :key="type"
        class="flex items-center mb-2"
      >
        <input
          type="checkbox"
          :value="type"
          v-model="localFilters.exchangeType"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{ type }}</label>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        Hidden & Favorite Markings
      </h3>
      <div
        v-for="marking in hiddenFavorites"
        :key="marking"
        class="flex items-center mb-2"
      >
        <input
          type="checkbox"
          :value="marking"
          v-model="localFilters.hiddenFavorite"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{ marking }}</label>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Amenities</h3>
      <div
        v-for="amenity in amenities"
        :key="amenity"
        class="flex items-center mb-2"
      >
        <input
          type="checkbox"
          :value="amenity"
          v-model="localFilters.amenities"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{ amenity }}</label>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Rent</h3>
      <input
        type="range"
        v-model="localFilters.rentRange"
        min="0"
        max="3000"
        step="10"
        multiple
        class="w-full mb-2"
      />
      <p class="text-gray-700">
        {{ localFilters.rentRange[0] }} — {{ localFilters.rentRange[1] }} €
      </p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Size</h3>
      <input
        type="range"
        v-model="localFilters.sizeRange"
        min="1"
        max="300"
        step="1"
        multiple
        class="w-full mb-2"
      />
      <p class="text-gray-700">
        {{ localFilters.sizeRange[0] }}m² — {{ localFilters.sizeRange[1] }}m²
      </p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        Which Floor (e.g., Ground Floor)
      </h3>
      <input
        type="range"
        v-model="localFilters.floorRange"
        min="0"
        max="10"
        step="1"
        multiple
        class="w-full mb-2"
      />
      <p class="text-gray-700">
        BG-{{ localFilters.floorRange[0] }}-{{ localFilters.floorRange[1] }}
      </p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Number of Rooms</h3>
      <div v-for="room in rooms" :key="room" class="flex items-center mb-2">
        <input
          type="checkbox"
          :value="room"
          v-model="localFilters.numberOfRooms"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{ room }}</label>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">Areas</h3>
      <div v-for="area in areas" :key="area" class="flex items-center mb-2">
        <input
          type="checkbox"
          :value="area"
          v-model="localFilters.areas"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{ area }}</label>
      </div>
    </div>

    <button
      @click="applyFilters"
      class="w-full bg-[#1c592f] text-white py-2 rounded hover:bg-green-800 transition"
    >
      Apply Filters
    </button>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localFilters: { ...this.filters },
      exchangeTypes: ["Direct exchange", "Three-way exchange"],
      hiddenFavorites: ["Marked as favorite", "Show only hidden"],
      amenities: ["Elevator", "Balcony", "Bath"],
      rooms: ["1", "2", "3", "4", "5", "6", "7+"],
      areas: ["Amsterdam (13)", "North, Amsterdam (184)"],
    };
  },
  methods: {
    applyFilters() {
      this.$emit("applyFilters", this.localFilters);
    },
  },
  watch: {
    filters: {
      handler(newVal) {
        this.localFilters = { ...newVal };
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
input[type="range"] {
  @apply w-full mb-2;
}
.text-green-700 {
  @apply text-[#1c592f];
}
.bg-green-700 {
  @apply bg-[#1c592f];
}
.border-green-700 {
  @apply border-[#1c592f];
}
.hover\:bg-green-800:hover {
  @apply hover:bg-[#065e58];
}
.form-checkbox {
  @apply text-[#1c592f];
}
</style>
