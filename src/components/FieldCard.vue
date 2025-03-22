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
    <div class="field-card__badge">
      <div class="iconItems">
        <img :src="require('@/assets/icons/video.svg')" alt="badge-icon"/>
      </div>
      <div class="iconItems">
        <img :src="require('@/assets/icons/wifi.svg')" alt="badge-icon"/>
      </div>
      <div class="iconItems">
        <img :src="require('@/assets/icons/restaurant.svg')" alt="badge-icon"/>
      </div>
      <div class="iconItems">
        <img :src="require('@/assets/icons/parking.svg')" alt="badge-icon"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldCard',
  components: {},
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
  height: 200px;
  padding: 16px;
  background-color: #1A1A1A;
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  overflow: hidden;
  gap: 16px;

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
    gap: 4px;
    text-align: left;
    color: $text-color;
    z-index: 5;

    p{
      font-size: 16px;
      font-weight: 400;

      span{
        font-size: 18px;
        font-weight: 700;
      }
    }
  }

  &__badge{
    display: flex;
    flex-direction: row;
    gap: 16px;
    z-index: 5;

    .iconItems{
      width: 40px;
      height: 40px;
      background-color: #414141;
      border-radius: 50%;
      padding: 10px;

      img{
        filter: brightness(0) invert(1);
      }
    }
  }
}
</style>
