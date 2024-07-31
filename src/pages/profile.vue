<template>
  <div
    class="profile-page flex flex-col items-center pb-20 lg:p-6 min-h-screen bg-white"
  >
    <div v-if="profile" class="w-full max-w-7xl bg-white p-8 mb-36">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <div class="profile-header flex flex-col md:flex-row items-center">
          <img
            :src="profile.profile_picture || 'https://via.placeholder.com/150'"
            :alt="$t('profile.alt.profilePicture')"
            class="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6 border-4 border-[#1c592f]"
          />
          <div class="text-center md:text-left">
            <h1 class="text-2xl md:text-4xl font-bold text-[#1c592f]">
              {{ profile.first_name }} {{ profile.last_name }}
            </h1>
            <p class="text-gray-700">{{ profile.email }}</p>
            <p class="text-gray-700">{{ profile.number }}</p>
          </div>
        </div>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <button
            @click="toggleEdit"
            class="bg-[#1c592f] text-white px-4 py-2 rounded shadow hover:bg-[#06826e] transition"
          >
            {{
              isEditable
                ? $t("profile.buttons.save")
                : $t("profile.buttons.edit")
            }}
          </button>
          <button
            v-if="isEditable"
            @click="cancelEdit"
            class="bg-gray-400 text-white px-4 py-2 rounded shadow hover:bg-gray-500 transition"
          >
            {{ $t("profile.buttons.cancel") }}
          </button>
        </div>
      </div>
      <div
        class="tabs flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8"
      >
        <button @click="setActiveTab('details')" :class="tabClass('details')">
          {{ $t("profile.tabs.details") }}
        </button>
        <button @click="setActiveTab('house')" :class="tabClass('house')">
          {{ $t("profile.tabs.house") }}
        </button>
        <button @click="setActiveTab('wishes')" :class="tabClass('wishes')">
          {{ $t("profile.tabs.wishes") }}
        </button>
      </div>
      <div v-if="activeTab === 'details'" class="user-details">
        <h2 class="text-2xl md:text-3xl font-semibold text-[#1c592f] mb-4">
          {{ $t("profile.details.title") }}
        </h2>
        <div>
          <div class="grid grid-cols-1 gap-4">
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.details.firstName") }}:</strong
              >
              <input
                :readonly="true"
                :class="inputClass"
                v-model="profile.first_name"
                class="input-noneditable w-full"
              />
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.details.lastName") }}:</strong
              >
              <input
                :readonly="true"
                :class="inputClass"
                v-model="profile.last_name"
                class="input-noneditable w-full"
              />
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.details.email") }}:</strong
              >
              <input
                :readonly="true"
                :class="inputClass"
                v-model="profile.email"
                class="input-noneditable w-full"
              />
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.details.phone") }}:</strong
              >
              <input
                :readonly="true"
                :class="inputClass"
                v-model="profile.number"
                class="input-noneditable w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'house'" class="house-details">
        <h2 class="text-2xl md:text-3xl font-semibold text-[#1c592f] mb-4">
          {{ $t("profile.house.title") }}
        </h2>
        <div class="grid grid-cols-1 gap-4">
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.type") }}:</strong
            >
            <input
              :readonly="true"
              :class="inputClass"
              v-model="profile.one_to_one_swap_house.house_type.type"
              class="input-noneditable w-full"
            />
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.location") }}:</strong
            >
            <input
              :readonly="true"
              :class="inputClass"
              v-model="profile.one_to_one_swap_house.location"
              class="input-noneditable w-full"
            />
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.numberOfRooms") }}:</strong
            >
            <div class="w-full flex items-center">
              <ul class="flex w-full no-gap-list">
                <li
                  v-for="number in numberOfRooms"
                  :key="number"
                  @click="isEditable ? selectNumberOfRooms(number) : null"
                  class="flex-1 p-2 border border-gray-300 rounded text-center room-item"
                  :class="[
                    getRoomClasses(
                      profile.one_to_one_swap_house.number_of_rooms,
                      number
                    ),
                    { 'cursor-pointer': isEditable },
                  ]"
                >
                  {{ number }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.floorNumber") }}:</strong
            >
            <div class="w-full flex items-center">
              <ul class="flex w-full no-gap-list">
                <li
                  v-for="number in floorOptions"
                  :key="number"
                  :class="[
                    'flex-1 p-2 border border-gray-300 rounded text-center room-item',
                    getFloorClasses(
                      profile.one_to_one_swap_house.floor_number,
                      number
                    ),
                    { 'cursor-pointer': isEditable },
                  ]"
                  @click="isEditable ? selectFloorNumber(number) : null"
                >
                  {{ number === 0 ? "G" : number }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.price") }}:</strong
            >
            <input
              :readonly="!isEditable"
              :class="inputClass"
              v-model="profile.one_to_one_swap_house.price"
              class="input-editable w-full"
            />
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.description") }}:</strong
            >
            <textarea
              :readonly="!isEditable"
              :class="inputClass"
              v-model="profile.one_to_one_swap_house.description"
              class="input-editable w-full"
            ></textarea>
          </div>
          <div
            class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
          >
            <strong class="w-full md:w-1/3 mb-2 md:mb-0"
              >{{ $t("profile.house.specificProperties") }}:</strong
            >
            <div class="w-full flex flex-wrap">
              <span
                v-for="(property, propertyIndex) in profile
                  .one_to_one_swap_house.specific_properties"
                :key="property.id"
                :class="isEditable ? 'w-auto' : 'w-fit'"
                class="bg-[#e4eee6] text-black px-3 py-1 m-1 rounded-full relative"
                :style="isEditable ? { paddingRight: '1.5rem' } : {}"
              >
                {{ property.specific_property.name }}
                <button
                  v-if="isEditable"
                  @click="removeHouseProperty(propertyIndex)"
                  class="absolute -top-1 right-2 text-red-500 rounded-full text-lg"
                >
                  x
                </button>
              </span>
              <div v-if="isEditable" class="relative w-full mt-2">
                <input
                  type="text"
                  v-model="selectedFeatureNames"
                  :placeholder="$t('profile.house.addProperties')"
                  readonly
                  class="input-editable w-full p-2 border rounded cursor-pointer"
                  @click="toggleDropdown('showFeaturesDropdown')"
                />
                <ul v-show="showFeaturesDropdown" class="dropdown-content">
                  <li
                    v-for="(feature, index) in features"
                    :key="index"
                    @click="toggleFeature(feature)"
                    :class="{
                      'bg-gray-200':
                        profile.one_to_one_swap_house.specific_properties.some(
                          (property) =>
                            property.specific_property.id === feature.id
                        ),
                    }"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ feature.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-2xl md:text-3xl font-semibold text-[#1c592f] mt-8 mb-4">
          {{ $t("profile.house.gallery.title") }}
        </h3>
        <div>
          <div class="mb-8">
            <h4 class="text-xl md:text-2xl font-semibold text-[#1c592f] mb-2">
              {{ $t("profile.house.gallery.leadingImage") }}
            </h4>
            <div class="relative">
              <img
                v-if="leadingImage"
                :src="leadingImage"
                class="w-full h-64 md:h-96 object-cover cursor-pointer rounded-lg"
                :alt="$t('profile.house.gallery.leadingImageAlt')"
                @click="openImage(leadingImage)"
              />
              <div
                v-if="!leadingImage"
                class="w-full h-64 md:h-96 flex items-center justify-center bg-gray-100"
              >
                {{ $t("profile.house.gallery.noLeadingImage") }}
              </div>
              <button
                v-if="isEditable && leadingImage"
                @click="removeLeadingImage"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              >
                X
              </button>
              <input
                v-if="isEditable"
                type="file"
                @change="uploadLeadingImage"
                class="mt-4"
                accept="image/*"
              />
            </div>
          </div>
          <div v-if="profile.one_to_one_swap_house.images.length > 0">
            <h4 class="text-xl md:text-2xl font-semibold text-[#1c592f] mb-2">
              {{ $t("profile.house.gallery.otherImages") }}
            </h4>
            <div
              class="images-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <div
                v-for="(image, index) in profile.one_to_one_swap_house.images"
                :key="image.id"
                class="relative w-full pb-[66.66%] overflow-hidden"
              >
                <img
                  :src="getImageUrl(image.image_path)"
                  class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer rounded-lg"
                  :alt="$t('profile.house.gallery.houseImageAlt')"
                  @click="openImage(getImageUrl(image.image_path))"
                />
                <button
                  v-if="isEditable"
                  @click="removeImage(index)"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
                >
                  X
                </button>
              </div>
            </div>
            <input
              v-if="isEditable"
              type="file"
              @change="uploadNewImages"
              class="mt-4"
              multiple
              accept="image/*"
            />
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'wishes'" class="wishes">
        <h2 class="text-2xl md:text-3xl font-semibold text-[#1c592f] mb-4">
          {{ $t("profile.wishes.title") }}
        </h2>
        <div
          v-for="(wish, wishIndex) in profile.wishes"
          :key="wishIndex"
          class="mb-4"
        >
          <div class="grid grid-cols-1 gap-4">
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.wishes.location") }}:</strong
              >
              <div class="w-full flex flex-wrap">
                <span
                  v-for="(location, locationIndex) in wish.wish_locations"
                  :key="locationIndex"
                  :class="isEditable ? 'w-auto' : 'w-fit'"
                  class="bg-[#e4eee6] text-black px-3 py-1 m-1 rounded-full relative"
                  :style="isEditable ? { paddingRight: '1.5rem' } : {}"
                >
                  {{ location.location }}
                  <button
                    v-if="isEditable"
                    @click="removeWishLocation(wishIndex, locationIndex)"
                    class="absolute -top-1 right-2 text-red-500 rounded-full text-lg"
                  >
                    x
                  </button>
                </span>
                <div v-if="isEditable" class="w-full mt-2">
                  <input
                    type="text"
                    :id="'wishAutocompleteInput' + wishIndex"
                    :placeholder="$t('profile.wishes.locationPlaceholder')"
                    class="input-editable w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.wishes.numberOfRooms") }}:</strong
              >
              <div class="w-full">
                <ul class="flex w-full no-gap-list">
                  <li
                    v-for="number in numberOfRooms"
                    :key="number"
                    @click="
                      isEditable
                        ? selectWishNumberOfRooms(wishIndex, number)
                        : null
                    "
                    class="flex-1 p-2 border border-gray-300 rounded text-center room-item"
                    :class="[
                      getRoomClasses(wish.number_of_rooms, number),
                      { 'cursor-pointer': isEditable },
                    ]"
                  >
                    {{ number }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.wishes.floorNumber") }}:</strong
              >
              <div class="w-full flex items-center">
                <ul class="flex w-full no-gap-list">
                  <li
                    v-for="number in floorOptions"
                    :key="number"
                    :class="[
                      'flex-1 p-2 border border-gray-300 rounded text-center room-item',
                      getFloorClasses(wish.floor_number, number),
                      { 'cursor-pointer': isEditable },
                    ]"
                    @click="
                      isEditable
                        ? selectWishFloorNumber(wishIndex, number)
                        : null
                    "
                  >
                    {{ number === 0 ? "G" : number }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.wishes.price") }}:</strong
              >
              <input
                :readonly="!isEditable"
                :class="inputClass"
                v-model="wish.price"
                class="input-editable w-full"
              />
            </div>
            <div
              class="flex flex-col md:flex-row items-start md:items-center border-b py-2"
            >
              <strong class="w-full md:w-1/3 mb-2 md:mb-0"
                >{{ $t("profile.wishes.specificProperties") }}:</strong
              >
              <div class="w-full flex flex-wrap">
                <span
                  v-for="(property, propertyIndex) in wish.specific_properties"
                  :key="property.id"
                  :class="isEditable ? 'w-auto' : 'w-fit'"
                  class="bg-[#e4eee6] text-black px-3 py-1 m-1 rounded-full relative"
                  :style="isEditable ? { paddingRight: '1.5rem' } : {}"
                >
                  {{ property.specific_property.name }}
                  <button
                    v-if="isEditable"
                    @click="removeWishProperty(wishIndex, propertyIndex)"
                    class="absolute -top-1 right-2 text-red-500 rounded-full text-lg"
                  >
                    x
                  </button>
                </span>
                <div v-if="isEditable" class="relative w-full mt-2">
                  <input
                    type="text"
                    v-model="wish.selectedFeatureNames"
                    :placeholder="$t('profile.wishes.addProperties')"
                    readonly
                    class="input-editable w-full p-2 border rounded cursor-pointer"
                    @click="toggleWishDropdown(wishIndex)"
                  />
                  <ul
                    v-show="wish.showFeaturesDropdown"
                    class="dropdown-content"
                  >
                    <li
                      v-for="(feature, index) in features"
                      :key="index"
                      @click="toggleWishFeature(wishIndex, feature)"
                      :class="{
                        'bg-gray-200': wish.specific_properties.some(
                          (property) =>
                            property.specific_property.id === feature.id
                        ),
                      }"
                      class="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {{ feature.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full max-w-7xl bg-white p-8 text-center">
      <p>{{ $t("profile.loading") }}</p>
    </div>
    <ImagePopup
      :imageSrc="selectedImage"
      :visible="isPopupVisible"
      @close="isPopupVisible = false"
    />
  </div>
</template>

<script>
import {
  getProfile,
  updateProfile,
  getHouseFeatures,
} from "@/services/apiService";
import Swal from "sweetalert2";
import ImagePopup from "@/components/ImagePopup.vue"; // Adjust the import path as necessary

export default {
  name: "ProfilePage",
  components: {
    ImagePopup,
  },
  data() {
    return {
      profile: null,
      originalProfile: null,
      activeTab: "details",
      isEditable: false,
      error: null,
      wishLocations: [],
      removedImages: [],
      removedLeadingImage: null,
      newImages: [],
      newLeadingImage: null,
      leadingImage: null,
      selectedImage: "",
      isPopupVisible: false,
      features: [],
      delete_images: [],
      selectedFeatureNames: "",
      showFeaturesDropdown: false,
      numberOfRooms: [1, 2, 3, 4, 5, 6], // Ensure this matches the form component
      floorOptions: [0, 1, 2, 3, 4, 5, 6], // Ensure this matches the form component
    };
  },
  async created() {
    try {
      const response = await getProfile();
      if (response.success) {
        this.profile = response.result;
        this.originalProfile = JSON.parse(JSON.stringify(this.profile)); // Deep copy of the profile object
        this.wishLocations = this.profile.wishes.map((wish) =>
          wish.wish_locations.map((location) => location.location)
        );
        this.leadingImage =
          this.profile.one_to_one_swap_house.images.length > 0
            ? this.getImageUrl(
                this.profile.one_to_one_swap_house.images[0].image_path
              )
            : null;
        this.profile.wishes.forEach((wish) => {
          this.$set(wish, "showFeaturesDropdown", false);
          this.$set(
            wish,
            "selectedFeatureNames",
            wish.specific_properties
              .map((property) => property.specific_property.name)
              .join(", ")
          );
        });
      } else {
        this.error = response.message;
      }
    } catch (error) {
      this.error = "Failed to load profile data.";
    }
    this.loadGoogleMapsScript();
  },
  computed: {
    inputClass() {
      return "bg-transparent py-2 px-3";
    },
  },
  methods: {
    loadGoogleMapsScript() {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&libraries=places`;
        script.onload = () => {
          this.profile.wishes.forEach((wish, wishIndex) => {
            this.initWishAutocomplete(wishIndex);
          });
        };
        document.head.appendChild(script);
      } else {
        this.profile.wishes.forEach((wish, wishIndex) => {
          this.initWishAutocomplete(wishIndex);
        });
      }
    },
    initWishAutocomplete(wishIndex) {
      this.$nextTick(() => {
        const inputId = `wishAutocompleteInput${wishIndex}`;
        const input = document.getElementById(inputId);
        if (input) {
          const autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["(cities)"],
            componentRestrictions: { country: "NL" },
          });

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.address_components) {
              const city = place.address_components[0].long_name;
              if (
                !this.profile.wishes[wishIndex].wish_locations.some(
                  (location) => location.location === city
                )
              ) {
                this.profile.wishes[wishIndex].wish_locations.push({
                  location: city,
                });
                input.value = "";
              }
            }
          });
        }
      });
    },
    getImageUrl(path) {
      // Do not add base URL for local images
      return path.startsWith("data:image")
        ? path
        : `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    tabClass(tab) {
      return this.activeTab === tab
        ? "bg-[#1c592f] text-white px-4 py-2 rounded shadow"
        : "bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition";
    },
    async loadHouseTypesAndFeatures() {
      try {
        const featuresResponse = await getHouseFeatures();

        if (featuresResponse.success) {
          this.features = featuresResponse.result.map((feature) => ({
            id: feature.id,
            name: feature.name,
          }));
        } else {
          console.error(
            "Failed to load house features:",
            featuresResponse.message
          );
        }
      } catch (error) {
        console.error("Error loading house types or features:", error);
      }
    },

    toggleEdit() {
      if (this.isEditable) {
        const modifiedProfileData = this.getModifiedProfileData();
        if (this.newImages.length > 0) {
          modifiedProfileData.images = this.newImages;
        }
        if (this.removedImages.length > 0) {
          modifiedProfileData.delete_images = this.removedImages;
        }
        updateProfile(modifiedProfileData) // Save the profile data
          .then((response) => {
            if (response.success) {
              this.profile = response.result;
              this.originalProfile = JSON.parse(JSON.stringify(this.profile)); // Update original profile with saved data
              this.removedImages = [];
              this.newImages = [];
              this.newLeadingImage = null;
              this.removedLeadingImage = null;
              this.leadingImage =
                this.profile.one_to_one_swap_house.images.length > 0
                  ? this.getImageUrl(
                      this.profile.one_to_one_swap_house.images[0].image_path
                    )
                  : null;
              Swal.fire({
                icon: "success",
                title: "Profile Updated Successfully",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {});
            } else {
              this.error = response.message;
            }
          })
          .catch(() => {
            this.error = "Failed to save profile data.";
          });
      } else {
        this.loadHouseTypesAndFeatures();
        this.profile.wishes.forEach((wish, wishIndex) => {
          this.$nextTick(() => {
            this.initWishAutocomplete(wishIndex);
          });
        });
      }
      this.isEditable = !this.isEditable;
    },

    // initWishAutocomplete(wishIndex) {
    //   this.$nextTick(() => {
    //     const inputId = `wishAutocompleteInput${wishIndex}`;
    //     const input = document.getElementById(inputId);
    //     if (input) {
    //       const autocomplete = new google.maps.places.Autocomplete(input, {
    //         types: ["(cities)"],
    //         componentRestrictions: { country: "NL" },
    //       });

    //       autocomplete.addListener("place_changed", () => {
    //         const place = autocomplete.getPlace();
    //         if (place && place.address_components) {
    //           const city = place.address_components[0].long_name;
    //           if (
    //             !this.profile.wishes[wishIndex].wish_locations.some(
    //               (location) => location.location === city
    //             )
    //           ) {
    //             this.profile.wishes[wishIndex].wish_locations.push({
    //               location: city,
    //             });
    //             input.value = "";
    //           }
    //         }
    //       });
    //     }
    //   });
    // },
    removeWishLocation(wishIndex, locationIndex) {
      this.profile.wishes[wishIndex].wish_locations.splice(locationIndex, 1);
    },
    selectNumberOfRooms(number) {
      this.profile.one_to_one_swap_house.number_of_rooms = number;
    },
    selectWishNumberOfRooms(wishIndex, number) {
      this.profile.wishes[wishIndex].number_of_rooms = number;
    },
    selectFloorNumber(number) {
      if (this.isEditable) {
        this.profile.one_to_one_swap_house.floor_number = number;
      }
    },
    selectWishFloorNumber(wishIndex, number) {
      if (this.isEditable) {
        this.profile.wishes[wishIndex].floor_number = number;
      }
    },
    getRoomClasses(selectedNumber, number) {
      return {
        "bg-white": selectedNumber === number,
        "text-[#1c592f]": selectedNumber === number,
        "hover:bg-white": this.isEditable,
        "hover:shadow-[0_0_10px_#1c592f]": this.isEditable,
        "hover:text-[#1c592f]": this.isEditable,
        "border-gray-300": true,
        "hover:border-[#1c592f]": this.isEditable,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": selectedNumber === number,
      };
    },
    getFloorClasses(selectedNumber, number) {
      return {
        "bg-white": selectedNumber == number,
        "text-[#1c592f]": selectedNumber == number,
        "hover:bg-white": this.isEditable,
        "hover:shadow-[0_0_10px_#1c592f]": this.isEditable,
        "hover:text-[#1c592f]": this.isEditable,
        "border-gray-300": true,
        "hover:border-[#1c592f]": this.isEditable,
        transition: true,
        "duration-300": true,
        "ease-in-out": true,
        "selected-room": selectedNumber == number,
      };
    },

    toggleWishDropdown(wishIndex) {
      this.profile.wishes[wishIndex].showFeaturesDropdown =
        !this.profile.wishes[wishIndex].showFeaturesDropdown;
    },
    toggleWishFeature(wishIndex, feature) {
      const wish = this.profile.wishes[wishIndex];
      const index = wish.specific_properties.findIndex(
        (property) => property.specific_property.id === feature.id
      );
      if (index > -1) {
        wish.specific_properties.splice(index, 1);
      } else {
        wish.specific_properties.push({
          id: feature.id,
          specific_property: feature,
        });
      }
      this.updateWishSelectedFeatureNames(wishIndex);
    },
    updateWishSelectedFeatureNames(wishIndex) {
      const wish = this.profile.wishes[wishIndex];
      wish.selectedFeatureNames = wish.specific_properties
        .map((property) => property.specific_property.name)
        .join(", ");
    },
    removeWishProperty(wishIndex, propertyIndex) {
      this.profile.wishes[wishIndex].specific_properties.splice(
        propertyIndex,
        1
      );
    },

    toggleDropdown(dropdown) {
      if (dropdown === "showDropdown") {
        this.showDropdown = !this.showDropdown;
        this.showFeaturesDropdown = false;
      } else if (dropdown === "showFeaturesDropdown") {
        this.showFeaturesDropdown = !this.showFeaturesDropdown;
        this.showDropdown = false;
      }
    },
    toggleFeature(feature) {
      const index =
        this.profile.one_to_one_swap_house.specific_properties.findIndex(
          (property) => property.specific_property.id === feature.id
        );
      if (index > -1) {
        this.profile.one_to_one_swap_house.specific_properties.splice(index, 1);
      } else {
        this.profile.one_to_one_swap_house.specific_properties.push({
          id: feature.id,
          specific_property: feature,
        });
      }
      this.updateSelectedFeatureNames();
    },
    updateSelectedFeatureNames() {
      this.selectedFeatureNames =
        this.profile.one_to_one_swap_house.specific_properties
          .map((property) => property.specific_property.name)
          .join(", ");
    },
    removeHouseProperty(propertyIndex) {
      this.profile.one_to_one_swap_house.specific_properties.splice(
        propertyIndex,
        1
      );
    },
    cancelEdit() {
      this.profile = JSON.parse(JSON.stringify(this.originalProfile)); // Revert to original profile
      this.removedImages = [];
      this.newImages = [];
      this.newLeadingImage = null;
      this.removedLeadingImage = null;
      this.leadingImage =
        this.profile.one_to_one_swap_house.images.length > 0
          ? this.getImageUrl(
              this.profile.one_to_one_swap_house.images[0].image_path
            )
          : null;
      this.isEditable = false;
    },
    getModifiedProfileData() {
      const modifiedData = {};

      if (this.profile.first_name !== this.originalProfile.first_name) {
        modifiedData.first_name = this.profile.first_name;
      }
      if (this.profile.last_name !== this.originalProfile.last_name) {
        modifiedData.last_name = this.profile.last_name;
      }
      if (this.profile.email !== this.originalProfile.email) {
        modifiedData.email = this.profile.email;
      }
      if (this.profile.number !== this.originalProfile.number) {
        modifiedData.phone_number = this.profile.number;
      }

      modifiedData.one_to_one_swap_house = {};

      if (
        this.profile.one_to_one_swap_house.house_type.type !==
        this.originalProfile.one_to_one_swap_house.house_type.type
      ) {
        modifiedData.one_to_one_swap_house.house_type =
          this.profile.one_to_one_swap_house.house_type.type;
      }
      if (
        this.profile.one_to_one_swap_house.location !==
        this.originalProfile.one_to_one_swap_house.location
      ) {
        modifiedData.one_to_one_swap_house.location =
          this.profile.one_to_one_swap_house.location;
      }
      if (
        this.profile.one_to_one_swap_house.number_of_rooms !==
        this.originalProfile.one_to_one_swap_house.number_of_rooms
      ) {
        modifiedData.one_to_one_swap_house.number_of_rooms =
          this.profile.one_to_one_swap_house.number_of_rooms;
      }
      if (
        this.profile.one_to_one_swap_house.floor_number !==
        this.originalProfile.one_to_one_swap_house.floor_number
      ) {
        modifiedData.one_to_one_swap_house.floor_number =
          this.profile.one_to_one_swap_house.floor_number;
      } else {
        modifiedData.one_to_one_swap_house.floor_number =
          this.originalProfile.one_to_one_swap_house.floor_number;
      }
      if (
        this.profile.one_to_one_swap_house.price !==
        this.originalProfile.one_to_one_swap_house.price
      ) {
        modifiedData.one_to_one_swap_house.price =
          this.profile.one_to_one_swap_house.price;
      }
      if (
        this.profile.one_to_one_swap_house.description !==
        this.originalProfile.one_to_one_swap_house.description
      ) {
        modifiedData.one_to_one_swap_house.description =
          this.profile.one_to_one_swap_house.description;
      }
      if (
        this.profile.one_to_one_swap_house.swap_reason !==
        this.originalProfile.one_to_one_swap_house.swap_reason
      ) {
        modifiedData.one_to_one_swap_house.swap_reason =
          this.profile.one_to_one_swap_house.swap_reason;
      }
      if (
        this.profile.one_to_one_swap_house.specific_properties !==
        this.originalProfile.one_to_one_swap_house.specific_properties
      ) {
        modifiedData.one_to_one_swap_house.specific_properties =
          this.profile.one_to_one_swap_house.specific_properties.map(
            (property) => property.specific_property.id
          );
      }

      modifiedData.wishes = this.profile.wishes.map((wish, index) => {
        const originalWish = this.originalProfile.wishes[index];
        const modifiedWish = {};

        if (wish.house_type_id !== originalWish.house_type_id) {
          modifiedWish.house_type_id = wish.house_type_id;
        }
        if (wish.price !== originalWish.price) {
          modifiedWish.price = wish.price;
        }
        if (wish.number_of_rooms !== originalWish.number_of_rooms) {
          modifiedWish.number_of_rooms = wish.number_of_rooms;
        }
        if (wish.floor_number !== originalWish.floor_number) {
          modifiedWish.floor_number = wish.floor_number;
        } else {
          modifiedWish.floor_number = originalWish.floor_number;
        }
        if (wish.specific_properties !== originalWish.specific_properties) {
          modifiedWish.features = wish.specific_properties.map(
            (property) => property.specific_property.id
          );
        }
        if (
          wish.wish_locations.length &&
          wish.wish_locations[0].location !==
            originalWish.wish_locations[0].location
        ) {
          modifiedWish.locations = wish.wish_locations.map(
            (location) => location.location
          );
        }

        return modifiedWish;
      });

      return modifiedData;
    },
    removeImage(index) {
      const removedImage = this.profile.one_to_one_swap_house.images.splice(
        index,
        1
      )[0];
      this.removedImages.push(removedImage.id);
    },
    removeLeadingImage() {
      this.removedLeadingImage =
        this.profile.one_to_one_swap_house.images[0].id;
      this.profile.one_to_one_swap_house.images.splice(0, 1);
      this.leadingImage = null;
    },
    uploadNewImages(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.newImages.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.one_to_one_swap_house.images.push({
            id: null,
            image_path: e.target.result, // Directly use base64 image path
          });
          this.$forceUpdate(); // Ensure the component updates and renders the new image
        };
        reader.readAsDataURL(file);
      }
    },
    uploadLeadingImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.newLeadingImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.leadingImage = e.target.result; // Directly use base64 image path
          this.$forceUpdate(); // Ensure the component updates and renders the new image
        };
        reader.readAsDataURL(file);
      }
    },
    openImage(image) {
      this.selectedImage = image;
      this.isPopupVisible = true;
    },
  },
};
</script>

<style scoped>
.input-field,
.input-noneditable {
  @apply w-full p-2 border border-gray-300 rounded border-none text-lg w-full transition duration-300 bg-transparent;
}

.input-noneditable:focus {
  @apply outline-none;
}

.input-editable {
  @apply w-full p-2 border border-gray-300 rounded;
}
.input-field:focus,
.input-editable:focus {
  border-color: #1c592f;
  outline: none;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
.tags-container {
  @apply mt-2 flex flex-wrap;
}
.dropdown-content {
  @apply absolute bg-white shadow-lg max-h-48 overflow-y-auto z-10 w-full mt-1 border border-gray-300 rounded;
}
.dropdown-content li {
  @apply cursor-pointer p-2 hover:bg-gray-100;
}
.invalid-feedback {
  @apply text-red-600 text-sm;
}

.dropdown-content {
  @apply absolute bg-white shadow-lg max-h-48 overflow-y-auto z-10 w-full mt-1 border border-gray-300 rounded;
}
.dropdown-content li {
  @apply cursor-pointer p-2 hover:bg-gray-100;
}
.input-editable {
  @apply border-none text-lg w-full transition duration-300;
}
.input-editable[readonly] {
  @apply bg-transparent;
}
.input-editable:focus {
  @apply outline-none bg-[#e7f7f4];
}
.no-gap-list li {
  margin: 0 !important;
}
.room-item {
  transition: all 0.3s ease-in-out;
}
/* .room-item:hover {
  box-shadow: 0 0 10px #1c592f;
  border-color: #1c592f;
} */
.selected-room {
  background-color: white !important;
  color: #1c592f !important;
  box-shadow: 0 0 10px #1c592f !important;
  border-color: #1c592f !important;
}
</style>
