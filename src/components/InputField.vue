<template>
  <div class="input-field">
    <label :for="id" class="input-field__label">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-model="modelValue"
      class="input-field__input"
    />
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    label: { type: String, required: true },
    type: { type: String, default: 'text' },
    id: { type: String, required: true },
    placeholder: { type: String, default: '' }
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss">
$primary-color: #75efb0;
$text-color: #fff;
$text-label: #6d6f74;
.input-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  &__label {
    color: $text-label;
    margin-bottom: 8px;
    font-size: 14px;
  }

  &__input {
    background-color: #21262c;
    border: 1px solid #3a4149;
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    color: $text-color;
    outline: none;
    width: 100%;

    &:focus {
      border-color: $primary-color;
    }
  }
}
</style>
