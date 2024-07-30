<template>
  <div
    class="flex justify-center mb-4 duration-300 rounded overflow-hidden shadow-lg hover:scale-[1.02] custom_hover"
    @click="handleCardClick"
  >
    <div
      class="flex flex-col w-full max-w-full bg-white cursor-pointer relative min-h-full"
    >
      <!-- Swiper Component -->
      <div class="flex-shrink-0" style="width: 100%; height: 200px">
        <swiper
          :slides-per-view="1"
          class="swiper-container"
          style="height: 100%"
        >
          <swiper-slide
            v-for="(image, index) in house?.images || []"
            :key="index"
          >
            <img
              :src="getImageUrl(image?.image_path)"
              class="w-full h-full object-cover"
            />
          </swiper-slide>
          <swiper-slide v-if="(house?.images || []).length === 0">
            <img
              src="@/assets/images/logo2.png"
              class="w-full h-full object-contain"
              alt="Placeholder"
            />
          </swiper-slide>
        </swiper>
      </div>

      <!-- House Details -->
      <div
        class="px-2 py-2 flex flex-col justify-between w-full relative house-card-content min-h-[210px]"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="font-bold text-lg">{{ house?.street || "" }}</div>
            <div class="text-xs mb-4">
              {{ house?.location || "" }}, {{ house?.post_code || "" }}
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-2 house-details"
            >
              <div class="text-gray-700 text-sm flex items-center user-icon">
                <i class="fas fa-user mr-2 icon_custom_color"></i>
                {{ house?.user?.first_name || "" }}
                {{ house?.user?.last_name || "" }}
              </div>
              <div
                class="text-purple-custom text-base font-semibold flex items-center"
              >
                <i class="fas fa-euro-sign mr-2"></i> {{ house?.price || "" }} /
                month
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-home mr-2 icon_custom_color"></i>
                {{ house?.house_type?.type || "" }}
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-door-open mr-2 icon_custom_color"></i>
                <strong>Kamers: </strong> {{ house?.number_of_rooms || "" }}
              </div>
              <div class="text-gray-700 text-sm flex items-center">
                <i class="fas fa-map-marker-alt mr-2 icon_custom_color"></i>
                <strong>Area: </strong> {{ house?.area || "" }} (m²)
              </div>
            </div>
            <div class="flex flex-wrap space-x-2 border-t border-gray-200 pt-2">
              <span
                v-for="property in validProperties"
                :key="property.id"
                class="px-3 py-1 bg-purple-custom text-white rounded-full text-xs"
              >
                {{ property?.specific_property?.name || "" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"; // Import computed here
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

export default {
  name: "HouseCardTriangle",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    house: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleCardClick() {
      this.goToDetailPage();
    },
    goToDetailPage() {
      this.$router.push({ name: "HouseDetail", params: { id: this.house.id } });
    },
  },
  setup(props) {
    const isInterested = ref(props.house.is_interested);
    const isNotInterested = ref(props.house.is_not_interested);
    const showConfirmationPopup = ref(false);

    const validProperties = computed(() => {
      return (
        props.house?.specific_properties?.filter(
          (property) =>
            property &&
            property.specific_property &&
            property.specific_property.name
        ) || []
      );
    });

    const getImageUrl = (path) => {
      return `https://phplaravel-1239567-4600161.cloudwaysapps.com/${path}`;
    };

    return {
      isInterested,
      isNotInterested,
      validProperties,
      getImageUrl,
    };
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
  grid-template-columns: repeat(1, 1fr); /* One column for mobile */
  gap: 4px 16px;
}
.custom_hover:hover {
  box-shadow: 0 0 10px #1c592f;
}
@media (min-width: 640px) {
  .house-details {
    grid-template-columns: repeat(2, 1fr); /* Two columns for larger screens */
  }
}
</style>
