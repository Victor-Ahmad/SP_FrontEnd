<template>
  <div class="pagination-container">
    <button
      @click="changePage(1)"
      :disabled="currentPage <= 1"
      class="font-medium"
    >
      First
    </button>
    <button
      class="hidden sm:block font-medium"
      @click="previousPage"
      :disabled="currentPage <= 1"
    >
      Previous
    </button>
    <button
      v-for="page in pagesToShow"
      :key="page"
      :class="{ active: page === currentPage, 'font-medium': true }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button
      class="hidden sm:block font-medium"
      @click="nextPage"
      :disabled="currentPage >= totalPages"
    >
      Next
    </button>
    <button
      @click="changePage(totalPages)"
      :disabled="currentPage >= totalPages"
      class="font-medium"
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
  data() {
    return {
      maxVisiblePages: 3,
    };
  },
  computed: {
    pagesToShow() {
      let visiblePages = this.maxVisiblePages;
      if (this.totalPages < this.maxVisiblePages) {
        visiblePages = this.totalPages;
      }

      let startPage = Math.max(
        this.currentPage - Math.floor(visiblePages / 2),
        1
      );
      let endPage = startPage + visiblePages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(endPage - visiblePages + 1, 1);
      }
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    updateMaxVisiblePages() {
      this.maxVisiblePages = window.innerWidth < 640 ? 3 : 10;
    },
    previousPage() {
      this.changePage(this.currentPage - 1);
    },
    nextPage() {
      this.changePage(this.currentPage + 1);
    },
    changePage(page) {
      this.$emit("changePage", page);
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.updateMaxVisiblePages();
    window.addEventListener("resize", this.updateMaxVisiblePages);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMaxVisiblePages);
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
