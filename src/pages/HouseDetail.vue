<template>
  <div class="min-h-screen p-4 mb-10 md:p-8">
    <div v-if="isLoading" class="text-center">{{ $t("page.loading") }}</div>
    <div v-else-if="error" class="text-red-600 text-center">{{ error }}</div>
    <div v-else class="house-detail-page flex flex-col items-center">
      <div class="house-detail-images-container w-full pt-4 px-2 md:px-10">
        <div
          v-if="house.images.length"
          class="images-grid grid grid-cols-2 md:grid-cols-5 mb-10 gap-2 w-full"
        >
          <div
            class="leading-image col-span-2 row-span-2 relative w-full pb-[66.66%] overflow-hidden rounded-lg shadow-lg"
          >
            <img
              :src="getImageUrl(house.images[0].image_path)"
              class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
              :alt="$t('page.leadingImage')"
              @click="openImage(getImageUrl(house.images[0].image_path))"
            />
          </div>
          <div
            v-for="(image, index) in house.images.slice(1, 7)"
            :key="index"
            class="secondary-image relative w-full pb-[66.66%] overflow-hidden rounded-lg shadow-lg"
          >
            <img
              :src="getImageUrl(image.image_path)"
              :class="[
                shouldBlur(index) ? 'blur-no-opacity pointer-events-none' : '',
              ]"
              class="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
              :alt="$t('page.houseImage')"
              @click="openImage(getImageUrl(image.image_path))"
            />
            <LockOverlay v-if="shouldBlur(index)" />
          </div>
        </div>
        <button
          v-if="house.images.length"
          @click="openGallery"
          class="bg-[#1c592f] text-white w-full lg:w-1/6 py-2 px-4 rounded-lg mb-4"
        >
          {{ $t("page.viewAllImages") }}
        </button>

        <!-- Image Gallery Popup component -->
        <ImageGalleryPopup
          :images="house.images.map((img) => getImageUrl(img.image_path))"
          :visible="isGalleryVisible"
          @close="isGalleryVisible = false"
        />
        <hr
          class="border-t-2 border-[#1c592f] mb-10 rounded-full"
          v-if="house.images.length"
        />
      </div>

      <div
        class="house-detail-info-wrapper flex flex-col md:flex-row justify-between w-full md:w-[75vw] mb-10 px-2 md:px-0"
      >
        <div
          class="house-detail-info-container bg-white lg:p-4 md:p-5 w-full md:w-[74%] mb-4 md:mb-0"
        >
          <!-- Progress Bar Section -->
          <div
            v-if="showProgress && progress < 100"
            class="progress-background col-span-full w-full rounded-full shadow-lg h-min"
          >
            <div class="progress-container">
              <div class="progress-circle">
                <svg viewBox="0 0 100 100">
                  <circle class="background" cx="50" cy="50" r="45"></circle>
                  <circle class="foreground" cx="50" cy="50" r="45"></circle>
                </svg>
                <div class="progress-text">{{ progress }}%</div>
              </div>
              <div class="missing-steps">
                <p>{{ $t("page.completeAccount") }}</p>
                <router-link :to="profileCompletionLink">{{
                  $t("page.goToProfile")
                }}</router-link>
              </div>
            </div>
          </div>
          <!-- End of Progress Bar Section -->
          <div
            class="house-detail-header flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-gray-300 pb-2"
          >
            <div class="text-2xl md:text-4xl font-bold text-gray-700">
              {{ house.street }}, {{ house.location }}
            </div>
            <div class="text-lg text-[#1c592f] font-bold mt-2 md:mt-0">
              {{ Math.floor(house.price) }} / {{ $t("page.month") }}
            </div>
          </div>
          <div class="house-detail-info mt-5">
            <div class="info-section p-4 rounded-lg">
              <h2 class="text-xl font-bold text-gray-800 mb-4">
                {{ $t("page.houseDetails") }}
              </h2>
              <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                <span class="font-medium text-gray-700"
                  >{{ $t("page.type") }}:</span
                >
                <span>{{ house.house_type.type }}</span>
              </div>
              <hr class="border-t border-gray-300 my-2" />
              <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                <span class="font-medium text-gray-700"
                  >{{ $t("page.numberOfRooms") }}:</span
                >
                <span>{{ house.number_of_rooms }}</span>
              </div>
              <hr class="border-t border-gray-300 my-2" />
              <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                <span class="font-medium text-gray-700"
                  >{{ $t("page.area") }}:</span
                >
                <span
                  >{{ Math.floor(house.area || 0) || $t("page.na") }} m²</span
                >
              </div>
            </div>
          </div>

          <div class="house-detail-info mt-5">
            <div class="info-section p-4 rounded-lg">
              <h2 class="text-xl font-bold text-gray-800 mb-4">
                {{ $t("page.description") }}
              </h2>
              <div class="info-item py-2">
                <span>{{ house.description || $t("page.noDescription") }}</span>
              </div>
            </div>
          </div>

          <div class="house-detail-info mt-5">
            <div class="info-section p-4 rounded-lg">
              <h2 class="text-xl font-bold text-gray-800 mb-4">
                {{ $t("page.wishes") }}
              </h2>
              <div
                v-for="wish in houseOwner.wishes"
                :key="wish.id"
                class="wish-item mt-3"
              >
                <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                  <span class="font-medium text-gray-700"
                    >{{ $t("page.houseType") }}:</span
                  >
                  <span>{{
                    wish.house_type ? wish.house_type.type : $t("page.na")
                  }}</span>
                </div>
                <hr class="border-t border-gray-300 my-2" />
                <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                  <span class="font-medium text-gray-700"
                    >{{ $t("page.numberOfRooms") }}:</span
                  >
                  <span>{{ wish.number_of_rooms || $t("page.na") }}</span>
                </div>
                <hr class="border-t border-gray-300 my-2" />
                <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                  <span class="font-medium text-gray-700"
                    >{{ $t("page.price") }}:</span
                  >
                  <span
                    >{{ wish.price || $t("page.na") }} /
                    {{ $t("page.month") }}</span
                  >
                </div>
                <hr class="border-t border-gray-300 my-2" />
                <div class="info-item py-2 grid grid-cols-1 md:grid-cols-2">
                  <span class="font-medium text-gray-700"
                    >{{ $t("page.area") }}:</span
                  >
                  <span
                    >{{ Math.floor(wish.area || 0) || $t("page.na") }} m²</span
                  >
                </div>
                <hr class="border-t border-gray-300 my-2" />
                <div
                  v-if="wish.wish_locations.length"
                  class="info-item py-2 grid grid-cols-1 md:grid-cols-2"
                >
                  <span class="font-medium text-gray-700"
                    >{{ $t("page.preferredLocations") }}:</span
                  >
                  <div>
                    <ul class="list-disc pl-5">
                      <li
                        v-for="location in wish.wish_locations"
                        :key="location.id"
                      >
                        {{ location.location }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="contact-info-container bg-white p-4 md:p-5 rounded-lg shadow-lg w-full md:w-[25%] self-start"
        >
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              {{ $t("page.contactInfo") }}
            </h2>
            <button
              class="favorite-button w-10 h-10 bg-white text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition"
              @click="handleFavoriteClick($event)"
            >
              <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
          </div>
          <div
            class="info-item py-2 flex flex-col md:flex-row justify-between md:justify-evenly"
          >
            <span class="font-medium text-gray-700"
              >{{ $t("page.name") }}:</span
            >
            <span>{{ houseOwner.first_name }} {{ houseOwner.last_name }}</span>
          </div>
          <hr class="border-t border-gray-300 my-2" />
          <div class="info-item py-2">
            <button
              class="chat-button w-full py-3 bg-[#154aa8] text-white rounded-lg hover:bg-green-600 mb-4"
              @click="startChat($event)"
            >
              <i class="fas fa-comment mr-1"></i>
              {{ $t("page.chat") }}
            </button>
          </div>
          <div
            class="info-item py-2 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 space-x-0 md:space-x-2"
          >
            <button
              @click="handleInterestedClick($event)"
              :class="[
                'w-full md:w-1/2 py-3 flex items-center justify-center rounded-lg transition-transform transform active:scale-95',
                isInterested
                  ? 'bg-interested-active text-white'
                  : 'border border-interested-active text-interested-active',
              ]"
            >
              <i class="fas fa-thumbs-up mr-1"></i>
              {{ $t("page.interested") }}
            </button>
            <button
              @click="toggleNotInterested($event)"
              :class="[
                'w-full md:w-1/2 py-3 flex items-center justify-center rounded-lg transition-transform transform active:scale-95',
                isNotInterested
                  ? 'bg-red-custom text-white'
                  : 'border border-red-custom text-red-custom',
              ]"
            >
              <i class="fas fa-thumbs-down mr-1"></i>
              {{ $t("page.notInterested") }}
            </button>
          </div>
          <div class="info-item py-2 mt-4">
            <button
              @click="copyLink"
              class="share-button w-full py-3 bg-[#1c592f] text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
            >
              <i class="fas fa-share-alt mr-2"></i> {{ $t("page.share") }}
            </button>
          </div>
        </div>
      </div>
      <ImagePopup
        :imageSrc="selectedImage"
        :visible="isPopupVisible"
        @close="isPopupVisible = false"
      />
    </div>

    <!-- Fixed Bottom Navbar -->
    <div
      class="bottom-nav-bar fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center z-50 gap-3 px-3"
    >
      <button
        @click="handleInterestedClick"
        :class="[
          'w-1/3 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95',
          isInterested
            ? 'bg-interested-active text-white'
            : 'border border-interested-active text-interested-active',
        ]"
      >
        <i class="fas fa-thumbs-up"></i>
      </button>
      <button
        @click="toggleNotInterested"
        :class="[
          'w-1/3 px-4 py-2  rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95',
          isNotInterested
            ? 'bg-gray-custom text-white'
            : 'border border-red-custom text-red-custom',
        ]"
      >
        <i class="fas fa-thumbs-down"></i>
      </button>
      <button
        @click="startChat"
        class="w-1/3 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95 bg-[#154aa8] text-white"
      >
        <i class="fas fa-comment"></i>
      </button>
    </div>
  </div>
</template>

<script>
import {
  getHouseById,
  expressInterest,
  addToFavorites,
  removeInterest,
  removeFavorite,
  isChatExisting,
  disinterest,
  removeNotInterest,
} from "@/services/apiService";
import ImagePopup from "@/components/ImagePopup.vue"; // Adjust the import path as necessary
import ImageGalleryPopup from "@/components/ImageGalleryPopup.vue"; // Import the new component
import LockOverlay from "@/components/LockOverlay.vue"; // Import the LockOverlay component
import anime from "animejs"; // Import animejs
import Swal from "sweetalert2"; // Import SweetAlert2
import { getProfileProgress } from "@/services/apiService"; // Import the progress API

export default {
  name: "HouseDetail",
  components: {
    ImagePopup,
    ImageGalleryPopup,
    LockOverlay, // Register the LockOverlay component
  },
  data() {
    return {
      house: {},
      houseOwner: {},
      isFavorite: false,
      isInterested: false,
      isNotInterested: false,
      selectedImage: "",
      isPopupVisible: false,
      isGalleryVisible: false,
      isLoading: true,
      error: null,
      showCopyMessage: false,
      // Progress related data
      progress: 0,
      showDescription: false,
      showImages: false,
      showWishes: false,
      showProgress: true,
    };
  },
  async created() {
    const houseId = this.$route.params.id;
    try {
      const response = await getHouseById(houseId);
      console.log(response.result);
      if (response.success) {
        this.house = response.result.house;
        this.houseOwner = response.result.house_owner;
        this.isFavorite = response.result.is_favorite;
        this.isInterested = response.result.is_interested;
        this.isNotInterested = response.result.is_not_interested;
      } else {
        this.error = "Failed to fetch house details: " + response.message;
      }
    } catch (error) {
      this.error = "API call failed: " + error.message;
    } finally {
      this.isLoading = false;
      this.fetchProfileProgress(); // Fetch profile progress when the component is created
    }
  },
  methods: {
    getImageUrl(path) {
      return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
    },
    openGallery() {
      this.isGalleryVisible = true;
    },
    async startChat(event) {
      event.stopPropagation();
      try {
        const response = await isChatExisting(this.houseOwner.id);
        console.log(response.result);
        let chatId;
        if (response.success) {
          if (response.result && response.result.chat) {
            chatId = response.result?.chat?.id;
          } else {
            chatId = response.result.id;
          }

          if (chatId) {
            if (window.innerWidth <= 768) {
              this.$router.push({
                name: "MessageInterfacePage",
                params: { chatId: chatId },
                query: { otherPersonHouseId: this.house.id },
              });
            } else {
              this.$router.push({
                path: "/chatPage",
                query: { chatId },
              });
            }
          } else {
            console.error("Chat ID not found in the response:", response);
          }
        } else {
          console.error("Failed to check chat existence:", response.message);
        }
      } catch (error) {
        console.error("Failed to start chat:", error);
      }
    },
    async handleFavoriteClick(event) {
      event.stopPropagation();
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        try {
          const response = await addToFavorites(this.house.id);
          console.log("Added to favorites successfully:", response);
        } catch (error) {
          console.error("Error adding to favorites:", error);
        }
      } else {
        try {
          const response = await removeFavorite(this.house.id);
          console.log("Removed from favorites successfully:", response);
        } catch (error) {
          console.error("Error removing from favorites:", error);
        }
      }
    },
    async handleInterestedClick(event) {
      event.stopPropagation();
      this.isInterested = !this.isInterested;
      if (this.isInterested) {
        this.isNotInterested = false;
        try {
          const response = await expressInterest(this.house.id);
          console.log("Interest expressed successfully:", response);
          // Trigger the exploding button effect
          this.triggerExplodingButton(event.target);
        } catch (error) {
          console.error("Error expressing interest:", error);
        }
      } else {
        try {
          const response = await removeInterest(this.house.id);
          console.log("Interest removed successfully:", response);
        } catch (error) {
          console.error("Error removing interest:", error);
        }
      }
    },
    async toggleNotInterested(event) {
      event.stopPropagation();
      await this.handleNotInterested();
    },
    async handleNotInterested() {
      if (this.isNotInterested) {
        this.isNotInterested = false;
        try {
          const response = await removeNotInterest(this.house.id);
          console.log("Not interested removed successfully:", response);
        } catch (error) {
          console.error("Error removing not interested:", error);
        }
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "This card will be hidden, you can check the hidden cards using the filter",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.isNotInterested = true;
            this.isInterested = false;
            try {
              const response = await disinterest(this.house.id);
              this.$router.push({ path: "/home" });
              console.log("Not interested successfully:", response);
            } catch (error) {
              console.error("Error expressing disinterest:", error);
            }
          }
        });
      }
    },
    openImage(image) {
      this.selectedImage = image;
      this.isPopupVisible = true;
    },
    triggerExplodingButton(target) {
      anime({
        targets: target,
        scale: [
          { value: 1.1, duration: 150 },
          { value: 1, duration: 200 },
        ],
        rotate: {
          value: "+=3turn",
          duration: 600,
          easing: "easeInOutSine",
        },
        easing: "easeInOutQuad",
        duration: 800,
      });
    },
    async copyLink() {
      const link = window.location.href;
      try {
        await navigator.clipboard.writeText(link);
        Swal.fire({
          icon: "success",
          title: this.$t("page.linkCopied"),
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to copy link",
          text: error.message,
        });
      }
    },
    // Progress related methods
    async fetchProfileProgress() {
      try {
        const response = await getProfileProgress();
        if (response.success) {
          const progressPercentage = parseInt(response.result.progress);
          this.progress = progressPercentage;
          this.updateProgress(progressPercentage);
          this.processMissingSteps(response.result.missing_steps);
        } else if (response == "no access token") {
          this.showProgress = false;
        }
      } catch (error) {
        console.error("Error fetching profile progress:", error);
      }
    },
    processMissingSteps(missingSteps) {
      this.showDescription = missingSteps.some((step) =>
        step.toLowerCase().includes("description")
      );
      this.showImages = missingSteps.some((step) =>
        step.toLowerCase().includes("image")
      );
      this.showWishes = missingSteps.some((step) =>
        step.toLowerCase().includes("wish")
      );
    },
    updateProgress() {
      const progressValue = this.progress;
      const circumference = 2 * Math.PI * 45;
      const offset = circumference - (progressValue / 100) * circumference;
      const foregroundCircle = document.querySelector(
        ".progress-circle .foreground"
      );
      if (foregroundCircle) {
        foregroundCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        foregroundCircle.style.strokeDashoffset = offset;
      }
    },
    shouldBlur(index) {
      return this.$store.getters.hasMoreThanTwoImages === false && index >= 0;
    },
  },
  computed: {
    profileCompletionLink() {
      return {
        name: "ProfileCompletion",
        query: {
          showDescription: this.showDescription,
          showImages: this.showImages,
          showWishes: this.showWishes,
        },
      };
    },
  },
  mounted() {
    this.updateProgress();
  },
  watch: {
    progress: "updateProgress",
  },
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
  color: #1c592f;
}

.text-green-custom {
  color: #22893c;
}

.text-orange-custom {
  color: #ff6500;
}

.custom_hover:hover {
  border-color: #ff6500;
}

.bg-green-custom {
  background-color: #22893c;
}

.bg-purple-custom {
  background-color: #1c592f;
}

.bg-red-custom {
  background-color: #8a8a8a;
}

.bg-blue-custom {
  background-color: #154aa8;
}

.bg-orange-custom {
  background-color: #ff6500;
}

/* Additional CSS for the grid layout */

/* Background for the progress section */
.progress-background {
  padding: 20px;
  margin-bottom: 40px !important;
  display: flex;
  align-items: center;
}

.progress-container {
  display: flex;
  align-items: center;
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
  stroke: #e4eee6;
}

.progress-circle .foreground {
  stroke: #1c592f;
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
  color: #1c592f;
  text-decoration: none;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9em;
}

.missing-steps a:hover {
  text-decoration: underline;
  color: #1c592f;
}

/* Underlined Tabs Styling */
.underlined-tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  border-bottom: 2px solid #ccc;
}

.underlined-tabs button {
  flex: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 3px solid transparent;
  margin: 0;
}

.underlined-tabs button:hover {
  background-color: #ebebeb;
}

.underlined-tabs .active-tab {
  border-bottom: 3px solid #1c592f;
  font-weight: 700;
  background-color: #e4eee6;
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
  background-color: #1c592f;
  color: #fff;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Transition for the filter drawer */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

/* Filter Drawer Styling */
.filter-drawer {
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  padding-bottom: 80px; /* Ensure space for close button */
}

/* Ensure fixed height for the swiper */
.swiper-container {
  height: 100%;
}

button i.fas.fa-heart,
button i.far.fa-heart {
  transition: color 0.3s;
  font-size: 24px;
}

button i.fas,
button i.far {
  font-size: 16px;
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
  color: #1c592f;
}

.text-green-custom {
  color: #22893c;
}

.text-orange-custom {
  color: #ff6500;
}

.custom_hover:hover {
  border-color: #ff6500;
}

.bg-green-custom {
  background-color: #22893c;
}

.bg-purple-custom {
  background-color: #1c592f;
}

.bg-red-custom {
  background-color: #8a8a8a;
}

.bg-blue-custom {
  background-color: #154aa8;
}

.bg-orange-custom {
  background-color: #ff6500;
}

/* Additional CSS for the grid layout */

/* Background for the progress section */
.progress-background {
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.progress-container {
  display: flex;
  align-items: center;
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
  stroke: #e4eee6;
}

.progress-circle .foreground {
  stroke: #1c592f;
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
  color: #1c592f;
  text-decoration: none;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9em;
}

.missing-steps a:hover {
  text-decoration: underline;
  color: #1c592f;
}

/* Styles for blur and overlay */
.blur-no-opacity {
  filter: blur(10px);
  opacity: 1 !important;
  transform: scale(1.5);
  transition: transform 0.3s ease;
}

.lock-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.lock-overlay i {
  font-size: 24px;
  margin-bottom: 8px;
}

.lock-overlay p {
  font-size: 12px;
  margin: 0;
}
.bg-interested-active {
  background-color: #1c592f;
}
.border-interested-active {
  border: 1px solid #1c592f;
}
.text-interested-active {
  color: #1c592f;
}
.border-red-custom {
  border: 1px solid #8a8a8a;
}
.text-red-custom {
  color: #8a8a8a;
}
</style>
