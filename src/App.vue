<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'App',
  components: {
    LoadingSpinner
  }
};
</script>

<style>
/* Add global styles here */
</style>
