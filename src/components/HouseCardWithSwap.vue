<template>
  <div v-if="house && house.one_to_one_swap_house">
    <HouseCard
      :house="house.one_to_one_swap_house"
      :hideWhenNotInterested="hideWhenNotInterested"
      :hideWhenUnclickInterested="hideWhenUnclickInterested"
      @confirmUnclickInterested="confirmUnclickInterested"
      @confirmUnfavorite="confirmUnfavorite"
      :updateCounts="updateCounts"
    />
  </div>
</template>

<script>
import HouseCard from "@/components/HouseCard.vue";

export default {
  name: "HouseCardWithSwap",
  components: {
    HouseCard,
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
    hideWhenUnclickInterested: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async confirmUnclickInterested(confirm) {
      if (confirm) {
        if (this.hideWhenUnclickInterested) {
          this.$emit("uninterested", this.house.id);
        }
        await this.handleInterestedClick();
        this.$emit("updateCounts"); // Emit updateCounts after confirming
      }
    },
    async confirmUnfavorite(confirm) {
      if (confirm) {
        this.$emit("unfavorite", this.house.id);
        this.$emit("updateCounts"); // Emit updateCounts after unfavorite
      }
    },
    updateCounts() {
      this.$emit("updateCounts");
    },
  },
};
</script>
