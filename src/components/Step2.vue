<template>
  <div
    class="flex flex-col md:flex-row justify-between h-full"
    ref="formContainer"
  >
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-gray-300 py-2 mb-4">
        <h3 class="text-4xl font-bold text-[#1c592f]">
          {{ $t("myHouse.title") }}
        </h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.postCode") }}
              </h3>
              <input
                type="text"
                v-model="formData.post_code"
                :placeholder="$t('myHouse.postCodePlaceholder')"
                class="input-field w-full p-2 border rounded"
                @input="fetchCityFromPostCode"
              />
              <div v-if="errors.post_code" class="invalid-feedback">
                {{ errors.post_code }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.houseNumber") }}
              </h3>
              <input
                type="text"
                v-model="formData.house_number"
                :placeholder="$t('myHouse.houseNumberPlaceholder')"
                class="input-field w-full p-2 border rounded"
                @input="fetchStreetFromPostCodeAndHouseNumber"
              />
              <div v-if="errors.house_number" class="invalid-feedback">
                {{ errors.house_number }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.location") }}
              </h3>
              <input
                type="text"
                v-model="formData.location_name"
                :placeholder="$t('myHouse.locationPlaceholder')"
                class="input-field w-full p-2 border rounded"
                readonly
              />
              <div v-if="errors.location_name" class="invalid-feedback">
                {{ errors.location_name }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.street") }}
              </h3>
              <input
                type="text"
                v-model="formData.street"
                :placeholder="$t('myHouse.streetPlaceholder')"
                class="input-field w-full p-2 border rounded"
                readonly
              />
              <div v-if="errors.street" class="invalid-feedback">
                {{ errors.street }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.houseType") }}
              </h3>
              <div class="relative" ref="houseTypeDropdown">
                <input
                  type="text"
                  v-model="selectedHouseTypeName"
                  :placeholder="$t('myHouse.houseTypePlaceholder')"
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
              <div v-if="errors.house_type" class="invalid-feedback">
                {{ errors.house_type }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.rentPrice") }}
              </h3>
              <input
                type="number"
                v-model="formData.price"
                :placeholder="$t('myHouse.pricePlaceholder')"
                class="input-field w-full p-2 border rounded"
                step="0.01"
              />
              <div v-if="errors.price" class="invalid-feedback">
                {{ errors.price }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.numberOfRooms") }}
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
              <div v-if="errors.number_of_rooms" class="invalid-feedback">
                {{ errors.number_of_rooms }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.floor") }}
              </h3>
              <input
                type="number"
                v-model="formData.floor"
                :placeholder="$t('myHouse.floorPlaceholder')"
                class="input-field w-full p-2 border rounded"
                min="0"
                step="1"
              />
              <div v-if="errors.floor" class="invalid-feedback">
                {{ errors.floor }}
              </div>
            </div>
          </div>
        </div>

        <div class="form-group mb-4">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.area") }}
              </h3>
              <div class="relative" ref="areaDropdown">
                <input
                  type="text"
                  v-model="formData.area"
                  :placeholder="$t('myHouse.areaPlaceholder')"
                  readonly
                  class="input-field w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showAreaDropdown')"
                />
                <ul v-show="showAreaDropdown" class="dropdown-content">
                  <li
                    v-for="(area, index) in areas"
                    :key="index"
                    @click="selectArea(area)"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ area }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.area" class="invalid-feedback">
                {{ errors.area }}
              </div>
            </div>
            <div class="w-full md:w-1/2 px-2">
              <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                {{ $t("myHouse.houseFeatures") }}
              </h3>
              <div class="relative" ref="featuresDropdown">
                <input
                  type="text"
                  v-model="selectedFeatureNames"
                  :placeholder="$t('myHouse.featuresPlaceholder')"
                  readonly
                  class="input-field w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showFeaturesDropdown')"
                />
                <ul v-show="showFeaturesDropdown" class="multi-select-content">
                  <li
                    v-for="(feature, index) in features"
                    :key="index"
                    @click="toggleFeature(feature)"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                    :class="{
                      'bg-gray-200': formData.features.includes(feature.id),
                    }"
                  >
                    {{ feature.name }}
                  </li>
                </ul>
              </div>
              <div v-if="errors.features" class="invalid-feedback">
                {{ errors.features }}
              </div>
            </div>
          </div>
        </div>
        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
            {{ $t("myHouse.housingCorporation") }}
          </h3>
          <input
            type="text"
            v-model="formData.swap_company"
            :placeholder="$t('myHouse.housingCorporationPlaceholder')"
            class="input-field w-full p-2 border rounded"
          />
          <div v-if="errors.swap_company" class="invalid-feedback">
            {{ errors.swap_company }}
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/5 hidden lg:flex items-center md:pl-6">
      <img
        :src="image"
        :alt="$t('myHouse.stepImageAlt')"
        class="w-full h-auto rounded"
      />
    </div>
  </div>
</template>

<script>
import { getHouseTypes, getHouseFeatures } from "@/services/apiService"; // Adjust the path as necessary

export default {
  props: ["formData", "image"],
  data() {
    return {
      houseTypes: [],
      selectedHouseTypeName: "",
      numberOfRooms: [1, 2, 3, 4, 5],
      areas: ["50", "100", "150", "200"],
      features: [],
      selectedFeatureNames: "",
      showDropdown: false,
      showAreaDropdown: false,
      showFeaturesDropdown: false,
      errors: {},
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
      this.formData.house_type = type.id;
      this.selectedHouseTypeName = type.type;
      this.showDropdown = false;
    },
    selectNumberOfRooms(number) {
      this.formData.number_of_rooms = number;
    },
    selectArea(area) {
      this.formData.area = area;
      this.showAreaDropdown = false;
    },
    toggleFeature(feature) {
      const index = this.formData.features.indexOf(feature.id);
      if (index > -1) {
        this.formData.features.splice(index, 1);
      } else {
        this.formData.features.push(feature.id);
      }
      this.updateSelectedFeatureNames();
    },
    updateSelectedFeatureNames() {
      this.selectedFeatureNames = this.formData.features
        .map((id) => {
          const feature = this.features.find((f) => f.id === id);
          return feature ? feature.name : "";
        })
        .join(", ");
    },
    roomClasses(number) {
      return {
        "bg-white": this.formData.number_of_rooms === number,
        "text-[#1c592f]": this.formData.number_of_rooms === number,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": this.formData.number_of_rooms === number,
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
          this.features = response.result;
        } else {
          console.error("Failed to load house features:", response.message);
        }
      } catch (error) {
        console.error("Error loading house features:", error);
      }
    },
    async fetchCityFromPostCode() {
      const postCode = this.formData.post_code;
      if (!this.validatePostCode(postCode)) {
        this.errors.post_code = "Invalid Post Code";
        return;
      }

      this.errors.post_code = null;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&components=country:NL&key=${
            import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          let city = "";
          let localityFound = false;

          data.results[0].address_components.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
              localityFound = true;
            } else if (
              component.types.includes("administrative_area_level_2") ||
              component.types.includes("administrative_area_level_3")
            ) {
              if (!localityFound) {
                city = component.long_name;
              }
            }
          });

          if (city) {
            this.formData.location_name = city;
            this.errors.location_name = null;
          }
        } else {
          this.errors.location_name = "Failed to fetch location name";
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        this.errors.location_name = "Failed to fetch location name";
      }
    },
    async fetchStreetFromPostCodeAndHouseNumber() {
      const postCode = this.formData.post_code;
      const houseNumber = this.formData.house_number;
      if (!this.validatePostCode(postCode)) {
        this.errors.post_code = "Invalid Post Code";
        return;
      }

      this.errors.post_code = null;

      const address = `${houseNumber} ${postCode}, Netherlands`;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const lat = location.lat;
          const lng = location.lng;

          const streetResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }`
          );
          const streetData = await streetResponse.json();

          if (streetData.status === "OK" && streetData.results.length > 0) {
            let street = "";
            streetData.results[0].address_components.forEach((component) => {
              if (component.types.includes("route")) {
                street = component.long_name;
              }
            });

            this.formData.street = street || "Street not found";
            this.errors.street = null;
          } else {
            this.errors.street = "Failed to fetch street details";
          }
        } else {
          this.errors.street = "Failed to fetch street details";
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        this.errors.street = "Failed to fetch street details";
      }
    },
    validatePostCode(postCode) {
      const regex = /^[0-9]{4}[A-Za-z]{2}$/;
      return regex.test(postCode);
    },
  },
  mounted() {
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
