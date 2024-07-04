<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" @click.self="close">
      <div class="relative max-w-screen max-h-screen  rounded-lg shadow-lg">
        <img :src="imageSrc" alt="Full Size" class="max-w-full max-h-full rounded-lg">
        <button @click="close" class="absolute top-0 right-4  text-5xl  p-1 ">&times;</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
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
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  .p-4 {
    padding: 1rem;
  }
  .bg-white {
    background-color: white;
  }
  .absolute {
    position: absolute;
  }
  .text-white {
    color: white;
  }
  .text-2xl {
    font-size: 1.5rem;
  }

  </style>
  