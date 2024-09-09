<template>
  <div
    class="flex justify-center mb-4 duration-300 rounded overflow-hidden shadow-lg hover:scale-[1.02] custom_hover max-w-40 md:max-w-full"
    @click="handleCardClick"
  >
    <div class="flex flex-col w-full bg-white cursor-pointer relative">
      <!-- Swiper Component -->
      <div class="flex-shrink-0 w-full max-h-20 lg:max-h-64">
        <swiper :slides-per-view="1" class="swiper-container h-full">
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
        class="p-1 md:px-2 md:py-2 flex flex-col justify-between w-full relative house-card-content lg:min-h-[210px]"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="font-large-custom font-bold">
              {{ house?.street || "" }}
            </div>
            <div class="font-small-custom mb-4">
              {{ house?.location || "" }}, {{ house?.post_code || "" }}
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 mb-1 md:gap-x-4 md:gap-y-2 md:mb-2 house-details"
            >
              <div
                class="text-gray-700 font-small-custom flex items-center user-icon"
              >
                <i
                  class="fas fa-user mr-2 icon_custom_color font-small-custom"
                ></i>
                {{ house?.user?.first_name || "" }}
                {{ house?.user?.last_name || "" }}
              </div>
              <div
                class="text-purple-custom font-medium-custom flex items-center"
              >
                <i class="fas fa-euro-sign mr-2 font-small-custom"></i>
                {{ Math.floor(house?.price) || "" }} / month
              </div>
              <div class="text-gray-700 font-small-custom flex items-center">
                <i
                  class="fas fa-home mr-2 icon_custom_color font-small-custom"
                ></i>
                {{ house?.house_type?.type || "" }}
              </div>
              <div class="text-gray-700 font-small-custom flex items-center">
                <i
                  class="fas fa-door-open mr-2 icon_custom_color font-small-custom"
                ></i>
                <strong>Kamers: </strong> {{ house?.number_of_rooms || "" }}
              </div>
              <div class="text-gray-700 font-small-custom flex items-center">
                <i
                  class="fas fa-map-marker-alt mr-2 icon_custom_color font-small-custom"
                ></i>
                <strong>Area: </strong> {{ Math.floor(house?.area) || "" }} (m²)
              </div>
            </div>
            <div class="flex flex-wrap space-x-2 border-t border-gray-200 pt-2">
              <span
                v-for="property in validProperties"
                :key="property.id"
                class="px-3 py-1 bg-purple-custom text-white rounded-full font-small-custom"
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
import { ref, computed } from "vue";
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

button i.fas.fa-heart,
button i.far.fa-heart {
  transition: color 0.3s;
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
}

.custom_hover:hover {
  box-shadow: 0 0 10px #1c592f;
}

.house-details {
  grid-template-columns: repeat(2, 1fr); /* Two columns for larger screens */
}
</style>
