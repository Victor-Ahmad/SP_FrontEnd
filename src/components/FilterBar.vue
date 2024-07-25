<template>
  <div class="bg-white mr-6">
    <h2 class="text-xl font-bold mb-4 text-[#1c592f]">
      {{ $t("filters.title") }}
    </h2>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.amenities") }}
      </h3>
      <div v-if="loadingAmenities" class="text-center mb-4">
        <i class="fas fa-spinner fa-spin"></i>
        {{ $t("filters.loadingAmenities") }}
      </div>
      <div v-else>
        <div
          v-for="amenity in amenities"
          :key="amenity.id"
          class="flex items-center mb-2"
        >
          <input
            type="radio"
            :value="amenity.id"
            v-model="localFilters.amenities"
            class="form-checkbox text-[#1c592f] mr-2"
          />
          <label class="text-gray-700">{{ amenity.name }}</label>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.notInterested") }}
      </h3>
      <div class="flex items-center mb-2">
        <input
          type="checkbox"
          v-model="localFilters.notInterested"
          class="form-checkbox text-[#1c592f] mr-2"
        />
        <label class="text-gray-700">{{
          $t("filters.notInterestedLabel")
        }}</label>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.rent") }}
      </h3>
      <input
        type="range"
        v-model="localFilters.maxRent"
        min="0"
        max="3000"
        step="10"
        class="w-full mb-2"
      />
      <p class="text-gray-700">0 — {{ localFilters.maxRent }} €</p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.size") }}
      </h3>
      <input
        type="number"
        v-model="localFilters.minSize"
        min="1"
        :placeholder="$t('filters.minSizePlaceholder')"
        class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#1c592f]"
      />
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.floor") }}
      </h3>
      <ul class="flex w-full no-gap-list">
        <li
          v-for="(floor, index) in floors"
          :key="index"
          @click="selectFloor(floor)"
          class="flex-1 p-2 border border-gray-300 rounded cursor-pointer text-center room-item"
          :class="floorClasses(floor)"
        >
          {{ floor }}
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.numberOfRooms") }}
      </h3>
      <ul class="flex w-full no-gap-list">
        <li
          v-for="(number, index) in numberOfRooms"
          :key="index"
          @click="selectNumberOfRooms(number)"
          class="flex-1 p-2 border border-gray-300 rounded cursor-pointer text-center room-item"
          :class="roomClasses(number)"
        >
          {{ number }}
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2 text-[#1c592f]">
        {{ $t("filters.areas") }}
      </h3>
      <input
        type="text"
        id="areasAutocompleteInput"
        :placeholder="$t('filters.areasPlaceholder')"
        class="input-field w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-[#1c592f]"
      />
      <div class="tags-container flex flex-wrap mt-2">
        <span
          v-for="(area, index) in selectedAreas"
          :key="index"
          class="tag bg-gray-200 p-2 rounded-sm mr-2 mb-2"
        >
          {{ area }}
          <span
            @click="removeArea(area)"
            class="cursor-pointer text-red-500 ml-1"
            >&times;</span
          >
        </span>
      </div>
    </div>

    <button
      @click="applyFilters"
      class="w-full bg-[#1c592f] text-white py-2 rounded hover:bg-green-800 transition"
    >
      {{ $t("filters.apply") }}
    </button>
    <button
      @click="clearFilters"
      class="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition mt-2"
    >
      {{ $t("filters.clear") }}
    </button>
  </div>
</template>

<script>
import { getHouseFeatures } from "@/services/apiService";

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
      localFilters: {
        search: "",
        amenities: null,
        maxRent: null,
        minSize: null,
        maxFloor: null,
        numberOfRooms: null,
        notInterested: false,
        areas: "",
      },
      amenities: [],
      floors: ["G", 1, 2, 3, 4, 5, "6+"],
      numberOfRooms: [1, 2, 3, 4, 5, "6+"],
      selectedAreas: [],
      loadingAmenities: false,
    };
  },
  methods: {
    applyFilters() {
      const formData = new FormData();

      // Add non-empty values to formData
      if (this.localFilters.search) {
        formData.append("search", this.localFilters.search);
      }
      if (this.localFilters.maxRent !== null) {
        formData.append("price_max", this.localFilters.maxRent);
      }
      if (this.localFilters.minSize !== null) {
        formData.append("area_min", this.localFilters.minSize);
      }
      if (this.localFilters.maxFloor !== null) {
        const maxFloor =
          this.localFilters.maxFloor === "G"
            ? 0
            : parseInt(this.localFilters.maxFloor, 10);
        formData.append("floor_max", maxFloor);
      }
      if (this.localFilters.numberOfRooms !== null) {
        const numberOfRooms = parseInt(this.localFilters.numberOfRooms, 10);
        formData.append("number_of_rooms", numberOfRooms);
      }
      if (this.selectedAreas.length > 0) {
        formData.append("location", this.selectedAreas.join(","));
      }
      if (this.localFilters.amenities !== null) {
        formData.append("house_feature", this.localFilters.amenities);
      }
      if (this.localFilters.notInterested) {
        formData.append("not_interested", 1);
      }

      this.$emit("applyFilters", formData);
    },
    clearFilters() {
      this.localFilters = {
        search: "",
        amenities: null,
        maxRent: null,
        minSize: null,
        maxFloor: null,
        numberOfRooms: null,
        areas: "",
        notInterested: false,
      };
      this.selectedAreas = [];
      this.$emit("applyFilters", new FormData());
    },
    selectFloor(floor) {
      this.localFilters.maxFloor = floor;
    },
    floorClasses(floor) {
      return {
        "bg-white": this.localFilters.maxFloor === floor,
        "text-[#1c592f]": this.localFilters.maxFloor === floor,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": this.localFilters.maxFloor === floor,
      };
    },
    selectNumberOfRooms(number) {
      this.localFilters.numberOfRooms = number;
    },
    roomClasses(number) {
      return {
        "bg-white": this.localFilters.numberOfRooms === number,
        "text-[#1c592f]": this.localFilters.numberOfRooms === number,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": this.localFilters.numberOfRooms === number,
      };
    },
    removeArea(area) {
      this.selectedAreas = this.selectedAreas.filter((a) => a !== area);
      this.localFilters.areas = this.selectedAreas;
    },
    handleClickOutside(event) {
      const areaInput = this.$refs.areasAutocompleteInput;
      if (areaInput && !areaInput.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    initAutocomplete() {
      const input = document.getElementById("areasAutocompleteInput");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
        componentRestrictions: { country: "NL" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          const area = place.address_components[0].long_name;
          if (!this.selectedAreas.includes(area)) {
            this.selectedAreas.push(area);
            this.localFilters.areas = this.selectedAreas;
            input.value = "";
          }
        }
      });
    },
    loadGoogleMapsScript() {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.onload = this.initAutocomplete;
      document.head.appendChild(script);
    },
    async loadHouseFeatures() {
      this.loadingAmenities = true;
      try {
        const response = await getHouseFeatures();
        if (response.success) {
          this.amenities = response.result.map((feature) => ({
            id: feature.id,
            name: feature.name,
          }));
        } else {
          console.error("Failed to load house features:", response.message);
        }
      } catch (error) {
        console.error("Error loading house features:", error);
      } finally {
        this.loadingAmenities = false;
      }
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
  mounted() {
    this.loadGoogleMapsScript();
    this.loadHouseFeatures();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.input-field {
  @apply w-full p-2 border border-gray-300 rounded;
}
.input-field:focus {
  border-color: #1c592f;
  outline: none;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
.tags-container {
  @apply mt-2 flex flex-wrap;
}
.no-gap-list li {
  margin: 0 !important;
}
.room-item {
  transition: all 0.3s ease-in-out;
}
.room-item:hover {
  box-shadow: 0 0 10px #1c592f;
  border-color: #1c592f;
}
.selected-room {
  background-color: white !important;
  color: #1c592f !important;
  box-shadow: 0 0 10px #1c592f !important;
  border-color: #1c592f !important;
}
.dropdown-content {
  @apply absolute bg-white shadow-lg max-h-48 overflow-y-auto z-10 w-full mt-1 border border-gray-300 rounded;
}
.invalid-feedback {
  @apply text-red-600 text-sm;
}
</style>
