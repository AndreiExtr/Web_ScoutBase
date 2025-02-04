<template>
  <div
  class="section"
  :class="{ active: isActive }"
  @click="$emit('click')">
    <div class="section__icon">
      <img :src="icon" alt="section-icon" />
    </div>
    <div class="section__content">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionMenu',
  props: {
    icon: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    isActive: { type: Boolean, default: false }
  }
}
</script>

<style lang="scss">
.section {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;

  &__icon img {
    width: 22px;
    height: 22px;
    margin-right: 16px;
    filter: brightness(0) saturate(100%) invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(90%);
  }

  &__content p {
    margin: 0;
    font-size: 18px;
    color: #666666;
    transition: color 0.2s ease-in-out;
  }

  &:hover {
    background: linear-gradient(90deg, #25A45B, 3%, #141414);
    border-left: solid 4px #13e66e;
    padding-left: 12px;
  }

  &:hover p,
  &:hover img {
    filter: brightness(0) saturate(100%) invert(48%) sepia(71%) saturate(597%) hue-rotate(92deg) brightness(95%) contrast(87%);
  }

  &.active {
    background: linear-gradient(90deg, #1F1F1F, #1F1F1F);
    border-left: solid 4px #13e66e;
    padding-left: 12px;

    & p {
      color: #25A45B;
    }

    & img {
      filter: brightness(0) saturate(100%) invert(48%) sepia(71%) saturate(597%) hue-rotate(92deg) brightness(95%) contrast(87%); // Зеленая иконка
    }
  }
}
</style>
