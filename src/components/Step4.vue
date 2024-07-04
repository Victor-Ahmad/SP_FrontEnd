<template>
  <div class="flex flex-col md:flex-row justify-between h-full p-6">
    <div class="w-full md:w-3/5 mb-6 md:mb-0 md:pr-6">
      <div class="text-center border-t-2 border-b-2 border-gray-300 py-2 mb-4">
        <h3 class="text-2xl font-bold text-[#07A984]">More About Your House</h3>
      </div>

      <div class="mb-6">
        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#07A984] mb-2">House Description</h3>
          <textarea v-model="formData.house_description" placeholder="Describe your house" class="input-field w-full p-2 border rounded" rows="4" style="resize: none;"></textarea>
        </div>

        <div class="form-group mb-4">
          <h3 class="text-lg font-semibold text-[#07A984] mb-2">House Gallery</h3>
          <p class="mt-4">Add house pictures</p>
          <input type="file" id="gallery" multiple class="input-field mt-4" @change="previewImages">
          <div class="preview-container flex flex-col items-center mt-4">
            <div class="preview-slideshow flex" id="previewSlideshow" :style="slideshowStyle">
              <div v-for="(image, index) in images" :key="index" class="relative mr-4">
                <img :src="image" alt="House Image" class="w-32 h-32 object-cover">
                <button @click="removeImage(index)" class="remove-image absolute top-1 right-1">&times;</button>
              </div>
            </div>
            <div class="preview-controls flex mt-2">
              <button @click="prevSlide" :disabled="currentSlide === 0" class="bg-gray-300 p-2 rounded-full mx-2">&larr;</button>
              <button @click="nextSlide" :disabled="currentSlide >= images.length - 5" class="bg-gray-300 p-2 rounded-full mx-2">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-2/5 flex items-center justify-center md:pl-6">
      <img :src="image" alt="Step 4 Image" class="w-full h-auto rounded">
    </div>
  </div>
</template>

<script>
export default {
  props: ['formData', 'image'],
  data() {
    return {
      images: [],
      currentSlide: 0,
    };
  },
  computed: {
    slideshowStyle() {
      return {
        transform: `translateX(-${this.currentSlide * 100}%)`
      };
    }
  },
  methods: {
    previewImages(event) {
      const files = Array.from(event.target.files);
      this.images = files.map(file => URL.createObjectURL(file));
      this.currentSlide = 0;
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.images.length - 5) {
        this.currentSlide++;
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
      if (this.currentSlide >= this.images.length - 5 && this.currentSlide > 0) {
        this.currentSlide--;
      }
    }
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full p-2 border border-gray-300 rounded;
}
.input-field:focus {
  border-color: #07A984;
  outline: none;
  box-shadow: 0 0 5px rgba(7, 169, 132, 0.5);
}
.preview-container {
  @apply flex flex-col items-center;
}
.preview-slideshow {
  @apply flex;
  transition: transform 0.5s ease;
}
.remove-image {
  @apply absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center;
}
.preview-controls {
  @apply flex mt-2;
}
</style>
