<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
    @click.self="close"
  >
    <div
      class="relative max-w-screen max-h-screen bg-transparent flex justify-center items-center"
    >
      <img
        :src="currentImage"
        alt="Full Size"
        class="max-w-full max-h-full rounded-lg"
      />
      <button
        @click="prevImage"
        class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 text-3xl px-2 py-1 rounded-full"
      >
        &larr;
      </button>
      <button
        @click="nextImage"
        class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 text-3xl px-2 py-1 rounded-full"
      >
        &rarr;
      </button>
      <button
        @click="close"
        class="absolute top-2 right-2 text-5xl p-1 rounded-full"
      >
        &times;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      }
    },
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-black {
  background-color: black;
}
.bg-opacity-75 {
  background-color: rgba(0, 0, 0, 0.75);
}
.z-50 {
  z-index: 50;
}
.max-w-full {
  max-width: 100%;
}
.max-h-full {
  max-height: 95vh;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.absolute {
  position: absolute;
}
.transform {
  transform: translate(0, -50%);
}
.text-white {
  color: white;
}
.bg-gray-700 {
  background-color: #4a5568;
}
.p-2 {
  padding: 0.5rem;
}
.rounded-full {
  border-radius: 9999px;
}
</style>
