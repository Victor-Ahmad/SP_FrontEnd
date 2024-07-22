<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Complete Your Profile</h1>

    <div v-if="isLoading" class="text-center">Submitting...</div>
    <div v-else>
      <div v-if="showDescription" class="mb-4">
        <label for="description" class="block text-gray-700 font-bold mb-2"
          >Description:</label
        >
        <textarea
          id="description"
          v-model="description"
          class="w-full p-2 border border-gray-300 rounded"
          rows="4"
          placeholder="Enter your description"
        ></textarea>
      </div>

      <div v-if="showImages" class="mb-4">
        <label for="images" class="block text-gray-700 font-bold mb-2"
          >Upload Images:</label
        >
        <input
          id="images"
          type="file"
          multiple
          @change="onImageChange"
          class="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div v-if="images.length && showImages" class="image-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image relative"
        >
          <img :src="image" class="object-contain rounded-lg p-2" />
          <button
            @click="removeImage(index)"
            class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <button
        @click="submitForm"
        class="mt-4 complete-btn text-white p-2 rounded-lg"
      >
        Complete
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { updateDescriptionAndImages } from "@/services/apiService"; // Ensure the correct import path

export default {
  name: "ProfileCompletion",
  setup() {
    const store = useStore();
    const description = ref("");
    const images = ref([]);
    const route = useRoute();
    const showDescription = ref(route.query.showDescription === "true");
    const showImages = ref(route.query.showImages === "true");
    const isLoading = computed(() => store.getters.isLoading);

    const onImageChange = (event) => {
      const files = event.target.files;
      const newImages = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          // Push new images after reading all
          if (newImages.length === files.length) {
            images.value = [...images.value, ...newImages];
          }
        };
        reader.readAsDataURL(files[i]);
      }
    };

    const removeImage = (index) => {
      images.value.splice(index, 1);
    };

    const submitForm = async () => {
      store.commit("setLoading", true); // Set loading state to true
      try {
        const response = await updateDescriptionAndImages(
          description.value,
          images.value
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        store.commit("setLoading", false); // Set loading state to false
      }
    };

    return {
      description,
      images,
      onImageChange,
      removeImage,
      submitForm,
      showDescription,
      showImages,
      isLoading, // Return loading state
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.complete-btn {
  background-color: #5e1675;
}

.image {
  height: 150px;
  position: relative;
  border: 2px solid #e2e8f0; /* Add border to grid cells */
  border-radius: 10px;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

button.absolute {
  top: 8px;
  right: 8px;
  background: rgba(255, 0, 0, 0.7);
  border: none;
  padding: 1px 5px;
  cursor: pointer;
  border-radius: 100%;
  font-size: 10px;
}

button.absolute i {
  color: white;
}

button.mt-4 {
  margin-top: 16px;
}
</style>
