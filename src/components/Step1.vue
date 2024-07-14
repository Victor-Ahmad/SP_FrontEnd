<template>
  <div
    class="flex flex-col md:flex-row justify-between h-full"
    ref="formContainer"
  >
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-gray-300 py-2 mb-10">
        <h3 class="text-4xl font-bold text-[#1c592f]">I want to go to</h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">City</h3>
              <input
                type="text"
                id="interestsAutocompleteInput"
                placeholder="Enter a location of interest"
                class="input-field w-full p-2 border rounded"
              />
            </div>

            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <div class="tags-container flex flex-wrap mt-2">
                <span
                  v-for="(city, index) in selectedCities"
                  :key="index"
                  class="tag bg-gray-200 p-2 rounded-full mr-2 mb-2"
                >
                  {{ city }}
                  <span
                    @click="removeCity(city)"
                    class="cursor-pointer text-red-500 ml-1"
                    >&times;</span
                  >
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                House Type
              </h3>
              <div class="relative" ref="houseTypeDropdown">
                <input
                  type="text"
                  v-model="selectedHouseTypeName"
                  placeholder="Select an option"
                  readonly
                  class="input-field w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showDropdown')"
                />
                <ul v-show="showDropdown" class="dropdown-content">
                  <li
                    v-for="(type, index) in houseTypes"
                    :key="index"
                    @click="selectHouseType(type)"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ type.type }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.house_type_wish" class="invalid-feedback">
                {{ errors.house_type_wish }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                Max Rent Price (€)
              </h3>
              <input
                type="number"
                v-model="formData.wish.price"
                placeholder="Enter price"
                class="input-field w-full p-2 border rounded"
                step="0.01"
              />
              <div v-if="errors.price_wish" class="invalid-feedback">
                {{ errors.price_wish }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                Min Number of Rooms
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
              <div v-if="errors.number_of_rooms_wish" class="invalid-feedback">
                {{ errors.number_of_rooms_wish }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">Floor</h3>
              <!-- Correct v-model for wish.floor_number -->
              <input
                type="number"
                v-model="formData.wish.floor_number"
                placeholder="Enter floor number"
                class="input-field w-full p-2 border rounded"
                min="0"
                step="1"
              />

              <div v-if="errors.floor_wish" class="invalid-feedback">
                {{ errors.floor_wish }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                Min Area (m²)
              </h3>
              <div class="relative" ref="areaDropdown">
                <input
                  type="text"
                  v-model="formData.wish.area_wish"
                  placeholder="Select an option"
                  readonly
                  class="input-field w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showAreaDropdown')"
                />
                <ul v-show="showAreaDropdown" class="dropdown-content">
                  <li
                    v-for="(area, index) in areas"
                    :key="index"
                    @click="selectArea(area)"
                  >
                    {{ area }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.area_wish" class="invalid-feedback">
                {{ errors.area_wish }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                House Features
              </h3>
              <div class="relative" ref="featuresDropdown">
                <input
                  type="text"
                  v-model="selectedFeatureNames"
                  placeholder="Specify house features"
                  readonly
                  class="input-field w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showFeaturesDropdown')"
                />
                <ul v-show="showFeaturesDropdown" class="dropdown-content">
                  <li
                    v-for="(feature, index) in features"
                    :key="index"
                    @click="toggleFeature(feature)"
                    :class="{
                      'bg-gray-200': (formData.wish.features || []).includes(
                        feature.id
                      ),
                    }"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ feature.name }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.features_wish" class="invalid-feedback">
                {{ errors.features_wish }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
            Why do you wish to swap?
          </h3>
          <textarea
            v-model="formData.wish.reason_for_swap"
            placeholder="Explain your reason for the swap"
            class="input-field w-full p-2 border rounded"
            rows="4"
            style="resize: none"
          ></textarea>
          <div v-if="errors.reason_for_swap" class="invalid-feedback">
            {{ errors.reason_for_swap }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/5 hidden lg:flex items-start md:pl-6">
      <img :src="image" alt="Step 1 Image" class="w-full h-auto rounded" />
    </div>
  </div>
</template>

<script>
import { getHouseTypes, getHouseFeatures } from "@/services/apiService";

export default {
  props: ["formData", "image", "errors"],
  data() {
    return {
      houseTypes: [],
      features: [],
      selectedHouseTypeName: "",
      selectedFeatureNames: "",
      numberOfRooms: [1, 2, 3, 4, 5],
      areas: ["50", "100", "150", "200"],
      selectedCities: [],
      showDropdown: false,
      showAreaDropdown: false,
      showFeaturesDropdown: false,
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      if (dropdown === "showDropdown") {
        this.showDropdown = !this.showDropdown;
        this.showAreaDropdown = false;
        this.showFeaturesDropdown = false;
      } else if (dropdown === "showAreaDropdown") {
        this.showAreaDropdown = !this.showAreaDropdown;
        this.showDropdown = false;
        this.showFeaturesDropdown = false;
      } else if (dropdown === "showFeaturesDropdown") {
        this.showFeaturesDropdown = !this.showFeaturesDropdown;
        this.showDropdown = false;
        this.showAreaDropdown = false;
      }
    },
    selectHouseType(type) {
      this.formData.wish.house_type_id = type.id;
      this.selectedHouseTypeName = type.type;
      this.showDropdown = false;
    },
    selectNumberOfRooms(number) {
      this.formData.wish.number_of_rooms = number;
    },
    selectArea(area) {
      this.formData.wish.area = area;
      this.showAreaDropdown = false;
    },
    toggleFeature(feature) {
      const index = (this.formData.wish.features || []).indexOf(feature.id);
      if (index > -1) {
        this.formData.wish.features.splice(index, 1);
      } else {
        this.formData.wish.features.push(feature.id);
      }
      this.updateSelectedFeatureNames();
    },
    updateSelectedFeatureNames() {
      this.selectedFeatureNames = (this.formData.wish.features || [])
        .map((id) => {
          const feature = this.features.find((f) => f.id === id);
          return feature ? feature.name : "";
        })
        .join(", ");
    },
    removeCity(city) {
      this.selectedCities = this.selectedCities.filter((c) => c !== city);
      this.formData.wish.locations = this.selectedCities;
    },
    roomClasses(number) {
      return {
        "bg-white": this.formData.wish.number_of_rooms === number,
        "text-[#1c592f]": this.formData.wish.number_of_rooms === number,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": this.formData.wish.number_of_rooms === number,
      };
    },
    handleClickOutside(event) {
      const houseTypeDropdown = this.$refs.houseTypeDropdown;
      const areaDropdown = this.$refs.areaDropdown;
      const featuresDropdown = this.$refs.featuresDropdown;

      if (houseTypeDropdown && !houseTypeDropdown.contains(event.target)) {
        this.showDropdown = false;
      }
      if (areaDropdown && !areaDropdown.contains(event.target)) {
        this.showAreaDropdown = false;
      }
      if (featuresDropdown && !featuresDropdown.contains(event.target)) {
        this.showFeaturesDropdown = false;
      }
    },
    initAutocomplete() {
      const input = document.getElementById("interestsAutocompleteInput");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
        componentRestrictions: { country: "NL" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          const city = place.address_components[0].long_name;
          if (!this.selectedCities.includes(city)) {
            this.selectedCities.push(city);
            this.formData.wish.locations = this.selectedCities;
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
    async loadHouseTypes() {
      try {
        const response = await getHouseTypes();
        if (response.success) {
          this.houseTypes = response.result;
        } else {
          console.error("Failed to load house types:", response.message);
        }
      } catch (error) {
        console.error("Error loading house types:", error);
      }
    },
    async loadHouseFeatures() {
      try {
        const response = await getHouseFeatures();
        if (response.success) {
          this.features = response.result.map((feature) => ({
            id: feature.id,
            name: feature.name,
          }));
        } else {
          console.error("Failed to load house features:", response.message);
        }
      } catch (error) {
        console.error("Error loading house features:", error);
      }
    },
  },
  mounted() {
    this.loadGoogleMapsScript();
    this.loadHouseTypes();
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
.dropdown-content,
.multi-select-content {
  @apply absolute bg-white shadow-lg max-h-48 overflow-y-auto z-10 w-full mt-1 border border-gray-300 rounded;
}
.dropdown-content li,
.multi-select-content li {
  @apply cursor-pointer p-2 hover:bg-gray-100;
}
.invalid-feedback {
  @apply text-red-600 text-sm;
}
</style>
