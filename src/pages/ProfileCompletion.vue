<template>
  <div class="container mx-auto p-4 mb-40">
    <h1 class="text-2xl font-bold mb-4">{{ $t("completeProfile.title") }}</h1>

    <div v-if="isLoading" class="text-center">
      {{ $t("completeProfile.submitting") }}
    </div>
    <div v-else>
      <div v-if="showDescription" class="mb-4">
        <label for="description" class="block text-gray-700 font-bold mb-2">
          {{ $t("completeProfile.descriptionLabel") }}:
        </label>
        <textarea
          id="description"
          v-model="description"
          class="w-full p-2 border rounded"
          :class="{ 'error-border': validationErrors.description }"
          rows="4"
          :placeholder="$t('completeProfile.descriptionPlaceholder')"
          @input="validateInput($event, 'description')"
        ></textarea>
      </div>

      <div v-if="showWishes" class="mb-4">
        <!-- Start of the Wishes Content from Step1 -->
        <label for="city" class="block text-gray-700 font-bold mb-2">
          {{ $t("form.title") }}:
        </label>

        <div class="mb-6">
          <div class="form-group mb-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                  {{ $t("form.city") }}
                </h3>
                <input
                  type="text"
                  id="interestsAutocompleteInput"
                  :placeholder="$t('form.cityPlaceholder')"
                  class="input-field w-full p-2 border rounded"
                  :class="{ 'error-border': validationErrors.city }"
                  @input="validateInput($event, 'city')"
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
                  {{ $t("form.houseType") }}
                </h3>
                <div class="relative" ref="houseTypeDropdown">
                  <input
                    type="text"
                    v-model="selectedHouseTypeName"
                    :placeholder="$t('form.houseTypePlaceholder')"
                    readonly
                    class="input-field w-full p-2 border rounded cursor-pointer"
                    :class="{ 'error-border': validationErrors.houseType }"
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
                  {{ $t("form.maxRentPrice") }}
                </h3>
                <input
                  type="number"
                  v-model="formData.wish.price"
                  :placeholder="$t('form.pricePlaceholder')"
                  class="input-field w-full p-2 border rounded"
                  :class="{ 'error-border': validationErrors.price }"
                  step="0.01"
                  @input="validateInput($event, 'price')"
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
                  {{ $t("form.minRooms") }}
                </h3>
                <ul class="flex w-full no-gap-list">
                  <li
                    v-for="(number, index) in numberOfRooms"
                    :key="index"
                    @click="selectNumberOfRooms(number)"
                    class="flex-1 p-2 border border-gray-300 rounded cursor-pointer text-center room-item"
                    :class="[
                      roomClasses(number),
                      { 'error-border': validationErrors.rooms },
                    ]"
                  >
                    {{ number }}
                  </li>
                </ul>
                <div
                  v-if="errors.number_of_rooms_wish"
                  class="invalid-feedback"
                >
                  {{ errors.number_of_rooms_wish }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2">
                <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                  {{ $t("form.floor") }}
                </h3>
                <ul class="flex w-full no-gap-list">
                  <li
                    v-for="(floor, index) in floorOptions"
                    :key="index"
                    @click="selectFloor(floor)"
                    class="flex-1 p-2 border border-gray-300 rounded cursor-pointer text-center room-item"
                    :class="[
                      floorClasses(floor),
                      { 'error-border': validationErrors.floor },
                    ]"
                  >
                    {{ floor }}
                  </li>
                </ul>
                <div v-if="errors.floor_number" class="invalid-feedback">
                  {{ errors.floor_number }}
                </div>
              </div>
            </div>
          </div>

          <div class="form-group mb-4">
            <div class="flex flex-wrap -mx-2">
              <div class="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                  {{ $t("form.minArea") }}
                </h3>
                <div class="relative" ref="areaDropdown">
                  <input
                    type="text"
                    v-model="formData.wish.area"
                    :placeholder="$t('form.areaPlaceholder')"
                    readonly
                    class="input-field w-full p-2 border rounded cursor-pointer"
                    :class="{ 'error-border': validationErrors.area }"
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
                <div v-if="errors.area_wish" class="invalid-feedback">
                  {{ errors.area_wish }}
                </div>
              </div>
              <div class="w-full md:w-1/2 px-2">
                <h3 class="text-lg font-semibold text-[#1c592f] mb-2">
                  {{ $t("form.houseFeatures") }}
                </h3>
                <div class="relative" ref="featuresDropdown">
                  <input
                    type="text"
                    v-model="selectedFeatureNames"
                    :placeholder="$t('form.featuresPlaceholder')"
                    readonly
                    class="input-field w-full p-2 border rounded cursor-pointer"
                    :class="{ 'error-border': validationErrors.features }"
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
        </div>
        <!-- End of the Wishes Content from Step1 -->
      </div>

      <div v-if="showImages" class="mb-4">
        <label for="images" class="block text-gray-700 font-bold mb-2">
          {{ $t("completeProfile.uploadImagesLabel") }}
        </label>
        <input
          id="images"
          type="file"
          multiple
          @change="onImageChange"
          class="w-full p-2 border border-gray-300 rounded"
          :class="{ 'error-border': validationErrors.images }"
        />
      </div>

      <div v-if="images.length && showImages" class="image-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image relative"
        >
          <img :src="image" class="object-contain rounded-lg p-2" />
          <button
            @click="removeImage(index)"
            class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <button
        @click="submitForm"
        class="mt-4 complete-btn text-white p-2 rounded-lg"
      >
        {{ $t("completeProfile.completeButton") }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import {
  updateDescriptionAndImages,
  getHouseTypes,
  getHouseFeatures,
} from "@/services/apiService"; // Ensure the correct import path

export default {
  name: "ProfileCompletion",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const description = ref("");
    const images = ref([]);
    const showDescription = ref(route.query.showDescription === "true");
    const showImages = ref(route.query.showImages === "true");
    const showWishes = ref(route.query.showWishes === "true");
    const isLoading = computed(() => store.getters.isLoading);

    // Method to check flags and redirect if all are false
    const checkFlagsAndRedirect = () => {
      if (!showDescription.value && !showImages.value && !showWishes.value) {
        router.push({ path: "/home" });
      }
    };

    // Call checkFlagsAndRedirect on mount
    onMounted(() => {
      checkFlagsAndRedirect();
    });

    // Validation state
    const validationErrors = ref({});

    // State for wishes content
    const formData = ref({
      wish: {
        house_type_id: null,
        price: null,
        number_of_rooms: null,
        floor_number: null,
        area: null,
        features: [],
        locations: [],
      },
    });
    const errors = ref({});
    const houseTypes = ref([]);
    const features = ref([]);
    const selectedCities = ref([]);
    const numberOfRooms = [1, 2, 3, 4, 5, 6];
    const floorOptions = ["G", 1, 2, 3, 4, 5, 6];
    const areas = ["50", "100", "150", "200"];
    const selectedHouseTypeName = ref("");
    const selectedFeatureNames = ref("");
    const showDropdown = ref(false);
    const showAreaDropdown = ref(false);
    const showFeaturesDropdown = ref(false);

    const validateFields = () => {
      validationErrors.value = {};

      // if (showDescription.value && !description.value.trim()) {
      //   validationErrors.value.description = true;
      // }

      if (showWishes.value) {
        if (!selectedCities.value.length) validationErrors.value.city = true;
        if (!formData.value.wish.house_type_id)
          validationErrors.value.houseType = true;
        if (!formData.value.wish.price) validationErrors.value.price = true;
        if (!formData.value.wish.number_of_rooms)
          validationErrors.value.rooms = true;
        if (!formData.value.wish.floor_number)
          validationErrors.value.floor = true;
        if (!formData.value.wish.area) validationErrors.value.area = true;
        if (!formData.value.wish.features.length)
          validationErrors.value.features = true;
      }

      // if (showImages.value && !images.value.length) {
      //   validationErrors.value.images = true;
      // }

      return Object.keys(validationErrors.value).length === 0;
    };

    const clearError = (field) => {
      if (validationErrors.value[field]) {
        delete validationErrors.value[field];
      }
    };

    const onImageChange = (event) => {
      const files = event.target.files;
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length === files.length) {
            images.value = [...images.value, ...newImages];
            clearError("images");
          }
        };
        reader.readAsDataURL(files[i]);
      }
    };

    const removeImage = (index) => {
      images.value.splice(index, 1);
    };

    const submitForm = async () => {
      if (!validateFields()) {
        console.log("Validation failed:", validationErrors.value);
        return;
      }
      if (
        formData.value.wish.floor_number &&
        formData.value.wish.floor_number === "G"
      ) {
        formData.value.wish.floor_number = 0;
      }
      store.commit("setLoading", true); // Set loading state to true
      try {
        const response = await updateDescriptionAndImages(
          description.value,
          images.value,
          formData.value.wish
        );
        console.log("Response:", response);

        if (response.success == 1) {
          Swal.fire({
            icon: "success",
            title: "Profile Compeleted Succesfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.push({ path: "/home" });
          });
        } else {
          throw new Error(response.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to compelete profile data",
          text: error.message || "Something went wrong, try again later",
        });
      } finally {
        store.commit("setLoading", false); // Set loading state to false
      }
    };

    // Methods for wishes content
    const toggleDropdown = (dropdown) => {
      if (dropdown === "showDropdown") {
        showDropdown.value = !showDropdown.value;
        showAreaDropdown.value = false;
        showFeaturesDropdown.value = false;
      } else if (dropdown === "showAreaDropdown") {
        showAreaDropdown.value = !showAreaDropdown.value;
        showDropdown.value = false;
        showFeaturesDropdown.value = false;
      } else if (dropdown === "showFeaturesDropdown") {
        showFeaturesDropdown.value = !showFeaturesDropdown.value;
        showDropdown.value = false;
        showAreaDropdown.value = false;
      }
    };

    const selectHouseType = (type) => {
      formData.value.wish.house_type_id = type.id;
      selectedHouseTypeName.value = type.type;
      showDropdown.value = false;
      clearError("houseType");
    };

    const selectNumberOfRooms = (number) => {
      formData.value.wish.number_of_rooms = number;
      clearError("rooms");
    };

    const selectFloor = (floor) => {
      formData.value.wish.floor_number = floor;
      clearError("floor");
    };

    const selectArea = (area) => {
      formData.value.wish.area = area;
      showAreaDropdown.value = false;
      clearError("area");
    };

    const toggleFeature = (feature) => {
      const index = (formData.value.wish.features || []).indexOf(feature.id);
      if (index > -1) {
        formData.value.wish.features.splice(index, 1);
      } else {
        formData.value.wish.features.push(feature.id);
      }
      updateSelectedFeatureNames();
      clearError("features");
    };

    const updateSelectedFeatureNames = () => {
      selectedFeatureNames.value = (formData.value.wish.features || [])
        .map((id) => {
          const feature = features.value.find((f) => f.id === id);
          return feature ? feature.name : "";
        })
        .join(", ");
    };

    const removeCity = (city) => {
      selectedCities.value = selectedCities.value.filter((c) => c !== city);
      formData.value.wish.locations = selectedCities.value;
      clearError("city");
    };

    const roomClasses = (number) => {
      return {
        "bg-white": formData.value.wish.number_of_rooms === number,
        "text-[#1c592f]": formData.value.wish.number_of_rooms === number,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": formData.value.wish.number_of_rooms === number,
      };
    };

    const floorClasses = (floor) => {
      return {
        "bg-white": formData.value.wish.floor_number === floor,
        "text-[#1c592f]": formData.value.wish.floor_number === floor,
        "hover:bg-white": true,
        "hover:shadow-[0_0_10px_#1c592f]": true,
        "hover:text-[#1c592f]": true,
        "border-gray-300": true,
        "hover:border-[#1c592f]": true,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": formData.value.wish.floor_number === floor,
      };
    };

    const handleClickOutside = (event) => {
      const houseTypeEl = houseTypeDropdown.value;
      const areaDropdownEl = areaDropdown.value;
      const featuresDropdownEl = featuresDropdown.value;

      if (
        (!houseTypeEl || !houseTypeEl.contains(event.target)) &&
        (!areaDropdownEl || !areaDropdownEl.contains(event.target)) &&
        (!featuresDropdownEl || !featuresDropdownEl.contains(event.target))
      ) {
        showDropdown.value = false;
        showAreaDropdown.value = false;
        showFeaturesDropdown.value = false;
      }
    };

    const validateInput = (event, field) => {
      const regex = /^[a-zA-Z0-9\s]*$/;
      const inputValue = event.target.value;
      const filteredValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, "");

      if (inputValue !== filteredValue) {
        event.target.value = filteredValue;
      }

      if (!regex.test(filteredValue)) {
        validationErrors.value[field] = true;
      } else {
        clearError(field);
      }
    };

    const initAutocomplete = () => {
      const input = document.getElementById("interestsAutocompleteInput");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
        componentRestrictions: { country: "NL" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          const city = place.address_components[0].long_name;
          if (!selectedCities.value.includes(city)) {
            selectedCities.value.push(city);
            formData.value.wish.locations = selectedCities.value;
            input.value = "";
            clearError("city");
          }
        }
      });
    };

    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    const loadHouseTypes = async () => {
      try {
        const response = await getHouseTypes();
        if (response.success) {
          houseTypes.value = response.result;
        } else {
          console.error("Failed to load house types:", response.message);
        }
      } catch (error) {
        console.error("Error loading house types:", error);
      }
    };

    const loadHouseFeatures = async () => {
      try {
        const response = await getHouseFeatures();
        if (response.success) {
          features.value = response.result.map((feature) => ({
            id: feature.id,
            name: feature.name,
          }));
        } else {
          console.error("Failed to load house features:", response.message);
        }
      } catch (error) {
        console.error("Error loading house features:", error);
      }
    };

    // Initialize data and event listeners on mount
    onMounted(() => {
      loadGoogleMapsScript();
      loadHouseTypes();
      loadHouseFeatures();
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    // Create references for dropdowns
    const houseTypeDropdown = ref(null);
    const areaDropdown = ref(null);
    const featuresDropdown = ref(null);

    // Watch for changes in the flags and call checkFlagsAndRedirect
    watch([showDescription, showImages, showWishes], () => {
      checkFlagsAndRedirect();
    });

    return {
      description,
      images,
      onImageChange,
      removeImage,
      submitForm,
      showDescription,
      showImages,
      showWishes,
      isLoading, // Return loading state
      // Validation state
      validationErrors,
      clearError,
      validateInput, // Return validateInput method
      // Wishes content
      formData,
      errors,
      houseTypes,
      features,
      selectedCities,
      numberOfRooms,
      floorOptions,
      areas,
      selectedHouseTypeName,
      selectedFeatureNames,
      showDropdown,
      showAreaDropdown,
      showFeaturesDropdown,
      toggleDropdown,
      selectHouseType,
      selectNumberOfRooms,
      selectFloor,
      selectArea,
      toggleFeature,
      updateSelectedFeatureNames,
      removeCity,
      roomClasses,
      floorClasses,
      houseTypeDropdown,
      areaDropdown,
      featuresDropdown,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.complete-btn {
  background-color: #1c592f;
}

.image {
  height: 150px;
  position: relative;
  border: 2px solid #e2e8f0; /* Add border to grid cells */
  border-radius: 10px;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

button.absolute {
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.7);
  border: none;
  padding: 1px 5px;
  cursor: pointer;
  border-radius: 100%;
  font-size: 10px;
}

button.absolute i {
  color: white;
}

button.mt-4 {
  margin-top: 16px;
}

/* Wishes content styles */
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

/* New CSS for error border */
.error-border {
  border-color: red !important;
}
</style>
