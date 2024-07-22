<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Triangle Swap Details</h1>
    <div v-if="triangle">
      <h2 class="text-xl font-semibold mb-2">House A:</h2>
      <HouseDetailClone :house="triangle.house_a" :index="0" />
      <h2 class="text-xl font-semibold mb-2 mt-8">House B:</h2>
      <HouseDetailClone :house="triangle.house_b" :index="1" />
    </div>
  </div>
</template>

<script>
import HouseDetailClone from "@/components/HouseDetailClone.vue";

export default {
  name: "TriangleSwapDetails",
  components: {
    HouseDetailClone,
  },
  data() {
    return {
      triangle: this.parseTriangleData(this.$route.query.triangle),
    };
  },
  methods: {
    parseTriangleData(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Error parsing triangle data:", e);
        return null;
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
