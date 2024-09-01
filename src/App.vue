<template>
  <div id="app">
    <router-view />
    <LoadingSpinner />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { resetFirebase } from "@/services/firebaseService";

export default {
  name: "App",
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapGetters(["token"]),
  },
  watch: {
    token(newToken, oldToken) {
      if (!newToken && oldToken) {
        resetFirebase();
      }
    },
  },
};
</script>

<style></style>
