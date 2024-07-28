<template>
  <router-link
    :to="{
      name: 'TriangleSwapDetails',
      query: { triangle: JSON.stringify(triangle) },
    }"
    class="flex flex-col items-center mb-10 space-y-8 shadow-lg py-8 lg:px-8 hover:scale-[1.02] duration-300 rounded custom_hover bg-white no-underline"
  >
    <!-- Mobile Only: Right Arrow -->
    <div class="flex justify-center items-center w-full lg:hidden">
      <img
        :src="rightArrow"
        :class="rightArrowClass"
        class="h-16 w-16"
        alt="Arrow Right"
      />
    </div>
    <div class="flex justify-center items-center space-x-4">
      <img
        :src="rightArrow"
        :class="rightArrowClass"
        class="h-16 w-16"
        alt="Arrow Up"
      />
      <button
        class="px-8 py-2 bg-[#1c592f] text-white text-lg font-bold rounded"
      >
        {{ myHouse.first_name }}
      </button>
      <img
        :src="downArrow"
        :class="downArrowClass"
        class="h-16 w-16"
        alt="Arrow Down"
      />
    </div>
    <!-- Top Row: House Cards with Arrow (Desktop Only) -->
    <div
      class="hidden md:flex md:flex-row lg:flex lg:flex-row items-center justify-center lg:items-start lg:w-full relative lg:p-10"
    >
      <!-- First House Card -->
      <div class="flex flex-col w-full lg:w-1/2 max-w-sm h-auto">
        <HouseCardTriangle :house="triangle.house_b" />
      </div>
      <!-- Curved Arrow (Desktop Only) -->
      <div class="flex justify-center items-center lg:mx-8">
        <img
          :src="upArrow"
          :class="upArrowClass"
          class="h-20 w-20"
          alt="Arrow Right"
        />
      </div>
      <!-- Second House Card -->

      <div class="flex flex-col w-full lg:w-1/2 max-w-sm h-auto">
        <HouseCardTriangle :house="triangle.house_a" />
      </div>
    </div>

    <!-- Mobile Only: House Cards Side by Side -->
    <div
      class="flex lg:hidden lg:flex-row items-center justify-center w-full space-x-4"
    >
      <!-- First House Card -->
      <div class="flex flex-col w-1/2 max-w-xs h-auto">
        <HouseCardTriangle :house="triangle.house_a" />
      </div>
      <!-- Second House Card -->
      <div class="flex flex-col w-1/2 max-w-xs h-auto">
        <HouseCardTriangle :house="triangle.house_b" />
      </div>
    </div>

    <!-- Bottom Row: Swap Button with Arrows -->
  </router-link>
</template>

<script>
import HouseCardTriangle from "@/components/HouseCardTriangle.vue";
import rightArrow from "../assets/icons/right.png";
import downArrow from "../assets/icons/down.png";
import upArrow from "../assets/icons/up.png";

export default {
  name: "TriangleSwapCard",
  components: {
    HouseCardTriangle,
  },
  props: {
    triangle: {
      type: Object,
      required: true,
    },
    myHouse: {
      type: Object,
      required: true,
    },
  },
  computed: {
    upArrow() {
      return upArrow;
    },
    rightArrow() {
      return rightArrow;
    },
    downArrow() {
      return downArrow;
    },
    rightArrowClass() {
      return this.triangle.is_a_interested_in_b
        ? "green-arrow "
        : "gray-arrow ";
    },
    downArrowClass() {
      return this.triangle.is_b_interested_in_c
        ? "green-arrow special_rotation"
        : "gray-arrow special_rotation";
    },
    upArrowClass() {
      return this.triangle.is_c_interested_in_a
        ? "green-arrow special_rotation2"
        : "gray-arrow special_rotation2";
    },
  },
};
</script>

<style scoped>
/* Custom styles for alignment and spacing */
.flex-row {
  display: flex;
  flex-direction: row;
}

.items-center {
  align-items: center;
}

.space-y-8 > * + * {
  margin-top: 2rem; /* Adjust for vertical spacing between rows */
}

.space-x-4 > * + * {
  margin-left: 1rem; /* Adjust for horizontal spacing between items */
}

.h-16 {
  height: 4rem;
}

.w-16 {
  width: 4rem;
}
.custom_hover:hover {
  box-shadow: 0 0 10px #1c592f;
}
.green-arrow {
  filter: brightness(0) saturate(100%) invert(33%) sepia(60%) saturate(1256%)
    hue-rotate(80deg) brightness(97%) contrast(92%);
}
.gray-arrow {
  filter: brightness(0) saturate(100%) invert(54%) sepia(6%) saturate(10%)
    hue-rotate(170deg) brightness(87%) contrast(88%);
}
.special_rotation {
  transform: rotate(-90deg);
}
.special_rotation2 {
  transform: rotate(-45deg);
}
</style>
