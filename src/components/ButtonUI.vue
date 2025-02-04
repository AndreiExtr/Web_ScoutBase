<template>
  <button class="button" @click="onClick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonUI',
  props: {
    text: { type: String, required: true }
  },
  emits: ['click'],
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
$primary-color: #75efb0;
.button {
  width: 100%;
  padding: 12px;
  background-color: #293038;
  border: 1px solid $primary-color;
  border-radius: 8px;
  color: $primary-color;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    color: #293038;
  }

  &:active {
    background-color: #4fc288;
    border: 1px solid #4fc288;
    color: #293038;
  }
}

</style>
