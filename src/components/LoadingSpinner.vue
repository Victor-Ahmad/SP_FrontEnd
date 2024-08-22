<!-- <template>
  <Loading
    :active="isActive"
    :can-cancel="false"
    :is-full-page="true"
    :color="'#1c592f'"
    :loader="'spinner'"
    :lock-scroll="true"
  />
</template>

<script>
import { defineComponent, computed } from "vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoadingSpinner",
  components: { Loading },
  setup() {
    const store = useStore();
    const isActive = computed(() => store.getters.isLoading);
    return { isActive };
  },
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style> -->

<template>
  <Loading
    :active="isActive"
    :can-cancel="false"
    :is-full-page="true"
    :lock-scroll="true"
    :background-color="'rgba(255, 255, 255, 0.8)'"
  >
    <template #default>
      <img src="@/assets/loading.gif" alt="Loading..." class="loading-gif" />
    </template>
  </Loading>
</template>

<script>
import { defineComponent, computed } from "vue";
import Loading from "vue3-loading-overlay";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoadingSpinner",
  components: { Loading },
  setup() {
    const store = useStore();
    const isActive = computed(() => store.getters.isLoading);
    return { isActive };
  },
});
</script>

<style scoped>
.loading-gif {
  height: 700px;
  width: auto;
}
</style>
