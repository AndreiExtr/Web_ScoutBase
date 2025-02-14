<template>
  <button class="button" @click="onClick">
    <img v-if="icon" class="icon" :src="icon" alt="icon" />
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ButtonUI',
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
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
$primary-color: #13e66e;
.button {
  width: 100%;
  height: 40px;
  padding: 8px;
  border: 1px solid $primary-color;
  border-radius: 8px;
  color: $primary-color;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  .icon {
    width: 24px;
    height: 24px;
    max-width: 100%;
    max-height: 100%;
    filter: brightness(0) saturate(100%) invert(48%) sepia(71%) saturate(597%) hue-rotate(92deg) brightness(95%) contrast(87%);
  }

  &:hover .icon{
    filter: none;
  }

  &:hover {
    background-color: $primary-color;
    border: 1px solid $primary-color;
    color: #293038;
    filter: none;
  }

  &:active {
    background-color: #218d30;
    border: 1px solid #218d30;
    color: #293038;
  }
}

</style>
