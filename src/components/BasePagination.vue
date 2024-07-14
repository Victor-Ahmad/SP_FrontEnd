<template>
  <div class="pagination-container">
    <button @click="fetchPage(1)" :disabled="currentPage <= 1">First</button>
    <button
      class="hidden sm:block"
      @click="previousPage"
      :disabled="currentPage <= 1"
    >
      Previous
    </button>
    <button
      v-for="page in pagesToShow"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="fetchPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="hidden sm:block"
      @click="nextPage"
      :disabled="currentPage >= totalPages"
    >
      Next
    </button>
    <button
      @click="fetchPage(totalPages)"
      :disabled="currentPage >= totalPages"
    >
      Last
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    pagesToShow() {
      const maxVisiblePages = 3;
      let startPage = Math.max(
        this.currentPage - Math.floor(maxVisiblePages / 2),
        1
      );
      let endPage = startPage + maxVisiblePages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    previousPage() {
      this.$emit("changePage", this.currentPage - 1);
    },
    nextPage() {
      this.$emit("changePage", this.currentPage + 1);
    },
    fetchPage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.pagination-container button {
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.pagination-container button.active {
  background-color: #1c592f;
  color: #fff;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
