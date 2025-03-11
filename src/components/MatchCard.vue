<template>
  <div class="match-card"
    @click="goToMatchPage">

    <!-- Изображение поля -->
    <img :src="field" alt="Field Image" class="field-image" />
    <div class="match-card__title">
      <p>{{ date }} <br> {{ time }}</p>
      <h3>{{ price }} ₽</h3>
    </div>
    <div class="match-card__info">
      <div class="place">
        <img :src="placeIcon" alt="place-icon" />
        {{ placesLeft1 + placesLeft2 === 0 ? 'Мест нет' : 'Свободно позиции: ' + (placesLeft1 + placesLeft2) }}
      </div>
      <div class="address">
        <img :src="addressIcon" alt="address-icon" />
        <p>
          {{ location.split(',')[0] }}<br>
          {{ location.split(',').slice(1).join(',') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchCard',
  props: {
    matchId: Number,
    location: String,
    date: String,
    time: String,
    placesLeft1: Number,
    placesLeft2: Number,
    price: Number,
    organizer: Object,
    field: {
      type: String,
      required: true
    },
    placeIcon: {
      type: String,
      required: true
    },
    addressIcon: {
      type: String,
      required: true
    }
  },
  methods: {
    goToMatchPage () {
      this.$emit('match-card-click', this.matchId)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$text-color: #fff;
.match-card {
  flex: 0 0 calc(25% - 12px);
  position: relative;
  padding: 16px;
  font-size: 16px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #2b2b2b;
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  .field-image {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0%, -50%);
    width: 350px;
    height: auto;

    mask-image: url('@/assets/icons/rectangle.svg');
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 350px auto;
    filter: brightness(40%); /* Затемнение изображения на 20% */
  }

  &:hover{
    box-shadow: 10px 10px 32px rgba(0, 255, 98, 0.089);
  }

  @media (max-width: 1500px) {
    flex-basis: calc(50% - 8px);
  }

  @media (max-width: 1024px) {
    flex-basis: calc(100%);
  }

  &__title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1;

    p{
      text-align: left;
      color: $text-color;
      font-weight: 700;
    }

    h3{
      color: $primary-color;
      font-size: 24px;
      font-weight: 700;
    }
  }

  &__info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: $text-color;
    gap: 12px;
    z-index: 1;

    .place{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;

      img {
        filter: brightness(0) saturate(100%) invert(48%) sepia(71%) saturate(597%) hue-rotate(92deg) brightness(95%) contrast(87%);
      }
    }

    .address{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;

      img {
        filter: brightness(0) saturate(100%) invert(48%) sepia(71%) saturate(597%) hue-rotate(92deg) brightness(95%) contrast(87%);
      }

      p{
        text-align: left;
      }
    }
  }
}
</style>
