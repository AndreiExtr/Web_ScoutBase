<template>
  <div class="field-card">
    <img :src="fiel" alt="Field Image" class="field" />
    <div class="field-card__status">
      <span :class="statusClass"></span>
      <p>{{ status }}</p>
    </div>
    <div class="field-card__name">
      <p>
        <span>{{ location.split(',')[0] }}</span><br>
        {{ location.split(',').slice(1).join(',') }}
      </p>
    </div>
    <ButtonUI
      type="submit"
      text="Выбрать для матча"
      :disabled="status === 'занято'"/>
  </div>
</template>

<script>
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'FieldCard',
  components: {
    ButtonUI
  },
  props: {
    fieldId: Number,
    location: String,
    status: String,
    fiel: {
      type: String,
      required: true
    }
  },
  computed: {
    statusClass () {
      return {
        'status-free': this.status === 'свободно',
        'status-busy': this.status === 'занято'
      }
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;
.field-card{
  position: relative;
  height: auto;
  padding: 16px;
  background-color: #1A1A1A;
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
  gap: 32px;

  &:hover{
    box-shadow: 10px 10px 32px rgba(0, 255, 98, 0.089);
  }

  .field {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    width: 350px;
    height: 100%;

    mask-image: url('@/assets/icons/rectangle.svg');
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 350px auto;
    filter: brightness(40%); /* Затемнение изображения на 20% */
  }

  button {
    width: auto;
    font-size: 14px;
    padding: 8px 16px;
    border: 1px solid #3a4149;
    border-radius: 8px;
    background-color: #3a4149;
    color: $text-color;
    z-index: 6;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;

    &:hover {
      background-color: $primary-color;
      color: $bg-color;
    }

    &.active {
      background-color: $primary-color;
      border-color: $primary-color;
      color: $bg-color;
    }

    &:disabled {
      background-color: #2a2a2a;
      border-color: #555;
      color: #888;
      cursor: not-allowed;
    }
  }

  &__status{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: $text-color;

    .status-free {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgb(2, 196, 2);
    }

    .status-busy {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: red;
    }
  }

  &__name{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 4px;
    text-align: left;
    color: $text-color;
    z-index: 5;
    height: 100%;

    p{
      font-size: 16px;
      font-weight: 400;

      span{
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>
