<template>
  <div
    v-if="!hideWhenNotInterested || isInterested"
    class="flex justify-center mb-4 hover:scale-[1.02] duration-300 rounded overflow-hidden shadow-lg custom_hover"
    @click="goToDetailPage"
  >
    <div
      class="flex flex-col w-full max-w-full bg-white cursor-pointer relative"
    >
      <!-- Swiper Component -->
      <div class="flex-shrink-0" style="width: 100%; height: 200px">
        <swiper
          :slides-per-view="1"
          class="swiper-container"
          style="height: 100%"
        >
          <swiper-slide v-for="(image, index) in house.images" :key="index">
            <img
              :src="getImageUrl(image.image_path)"
              class="w-full h-full object-cover"
            />
          </swiper-slide>
          <swiper-slide v-if="house.images.length === 0">
            <img
              src="@/assets/images/logo2.png"
              class="w-full h-full object-contain"
              :alt="$t('page.placeholder')"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!-- House Details -->
      <div
        class="px-2 py-2 flex flex-col justify-between w-full relative house-card-content"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="font-bold text-lg">{{ house.street || "" }}</div>
            <div class="text-xs mb-4">
              {{ house.location || "" }}, {{ house.post_code || "" }}
            </div>
            <div class="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 house-details">
              <div class="text-gray-700 text-sm flex items-center user-icon">
                <i class="fas fa-user mr-2 icon_custom_color"></i>
                {{ house.user.first_name || "" }}
                {{ house.user.last_name || "" }}
              </div>
              <div
                class="text-purple-custom text-base font-semibold flex items-center"
              >
                <i class="fas fa-euro-sign mr-2"></i> {{ house.price || "" }} /
                {{ $t("page.month") }}
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-home mr-2 icon_custom_color"></i>
                {{ house.house_type?.type || "" }}
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-door-open mr-2 icon_custom_color"></i>
                <strong>{{ $t("page.rooms") }}: </strong>
                {{ house.number_of_rooms || "" }}
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-map-marker-alt mr-2 icon_custom_color"></i>
                <strong>{{ $t("page.area") }}: </strong>
                {{ truncatedArea }} (m²)
              </div>
            </div>
            <div
              :class="{
                'border-t border-gray-200 pt-2': validProperties.length,
              }"
              class="flex flex-wrap space-x-2"
            >
              <span
                v-for="property in validProperties"
                :key="property.id"
                class="px-3 py-1 bg-purple-custom text-white rounded-full text-xs"
              >
                {{ property.specific_property.name || "" }}
              </span>
            </div>
          </div>
          <button
            @click="handleFavoriteClick($event)"
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none transition-transform transform"
          >
            <i
              :class="isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart'"
            ></i>
          </button>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex justify-between items-center mt-2 space-x-2 border-t border-gray-200 pt-2"
        >
          <button
            @click="handleInterestedClick($event)"
            :class="[
              'w-1/3 lg:w-4/12 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95',
              isInterested
                ? 'bg-interested-active text-white'
                : 'border border-interested-active text-interested-active',
            ]"
          >
            <i class="fas fa-thumbs-up mr-1"></i>
            <span class="hidden md:inline">{{ $t("page.interested") }}</span>
          </button>
          <button
            @click="toggleNotInterested($event)"
            :class="[
              'w-1/3 lg:w-5/12 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95 md:flex-2',
              isNotInterested
                ? 'bg-gray-custom text-white '
                : 'border border-red-custom text-red-custom',
            ]"
          >
            <i class="fas fa-thumbs-down mr-1"></i>
            <span class="hidden md:inline">{{ $t("page.notInterested") }}</span>
          </button>
          <button
            @click="startChat($event)"
            class="w-1/3 lg:w-3/12 px-4 py-2 rounded-full flex items-center justify-center text-xs transition-transform transform active:scale-95 bg-chat-custom2 text-white"
          >
            <i class="fas fa-comment mr-1"></i>
            <span class="hidden md:inline">{{ $t("page.chat") }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import anime from "animejs";
import {
  expressInterest,
  removeInterest,
  addToFavorites,
  removeFavorite,
  disinterest,
  removeNotInterest,
  isChatExisting,
} from "@/services/apiService";
import { useRouter } from "vue-router";

export default {
  name: "HouseCard",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    house: {
      type: Object,
      required: true,
    },
    hideWhenNotInterested: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFavorite: false,
      isInterested: false,
      isNotInterested: false,
    };
  },
  created() {
    this.isFavorite = this.house.is_favorite;
    this.isInterested = this.house.is_interested;
    this.isNotInterested = this.house.is_not_interested;
  },
  computed: {
    validProperties() {
      return (
        this.house.specific_properties?.filter(
          (property) =>
            property &&
            property.specific_property &&
            property.specific_property.name
        ) || []
      );
    },
    truncatedArea() {
      return Math.floor(this.house.area || 0);
    },
  },
  methods: {
    getImageUrl(path) {
      return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
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
          console.log("Deleted from favorites successfully:", response);
        } catch (error) {
          console.error("Error deleting from favorites:", error);
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
      this.isNotInterested = !this.isNotInterested;
      if (this.isNotInterested) {
        this.isInterested = false;
        try {
          const response = await disinterest(this.house.id);
          console.log("Not interested successfully:", response);
        } catch (error) {
          console.error("Error expressing disinterest:", error);
        }
      } else {
        try {
          const response = await removeNotInterest(this.house.id);
          console.log("Not Interest removed successfully:", response);
        } catch (error) {
          console.error("Error removing not interest:", error);
        }
      }
    },
    async startChat(event) {
      event.stopPropagation();
      try {
        const response = await isChatExisting(this.house.user.id);
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
                params: { chatId },
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
    goToDetailPage() {
      this.$router.push({ name: "HouseDetail", params: { id: this.house.id } });
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
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
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

.text-purple-custom {
  color: #1c592f;
}
.text-green-custom {
  color: #22893c;
}
.text-red-custom {
  color: #8a8a8a;
}
.border-red-custom {
  border: 1px solid #8a8a8a;
}
.custom_hover:hover {
  box-shadow: 0 0 10px #1c592f;
}
.bg-green-custom {
  background-color: #22893c;
}
.bg-purple-custom {
  background-color: #e4eee6;
  color: #000;
}
.bg-purple-custom2 {
  background-color: #1c592f;
  color: #fff;
}
.bg-chat-custom2 {
  background-color: #154aa8;
  border: 1px solid #154aa8;
  color: #fff;
}

.bg-gray-custom {
  background-color: #8a8a8a;
  border: 1px solid #8a8a8a;
}

.border-interested-active {
  border: 1px solid #1c592f;
}
.text-interested-active {
  color: #1c592f;
}
.bg-interested-active {
  background-color: #1c592f;
}

.user-icon i {
  color: #1c592f;
}

.icon_custom_color {
  color: #1c592f;
}

.house-card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.house-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 16px;
}

.border-t {
  border-top-width: 1px;
}

.pt-2 {
  padding-top: 0.5rem;
}
</style>
