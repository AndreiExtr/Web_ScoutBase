<template>
  <div class="pagination">
    <!-- Директива v-for используется для рендеринга списка элементов путем итерации по массиву или объекту -->
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationUI',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToPage (page) {
      this.$emit('update:currentPage', page)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$text-color: #fff;
.pagination {
  display: flex;
  gap: 10px;

  button {
    padding: 5px 10px;
    cursor: pointer;
    border: none;
    color: $text-color;
    border: 4px;

    &.active {
      background-color: $primary-color;
      color: $text-color;
      border-radius: 4px;
    }
  }
}
</style>
