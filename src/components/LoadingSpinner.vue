<template>
    <Loading :active="isActive" :can-cancel="false" :is-full-page="true" :color="'#2a81b2'"
        :background-color="'rgba(255, 255, 255, 0.9)'" />
</template>

<script>
import { defineComponent, computed } from 'vue';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'LoadingSpinner',
    components: { Loading },
    setup() {
        const store = useStore();
        const isActive = computed(() => store.getters.isLoading);
        return { isActive };
    }
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>