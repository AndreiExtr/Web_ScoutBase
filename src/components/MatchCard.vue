<template>
  <div class="match-card" @click="goToMatchPage">
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
    id: Number,
    matchId: Number,
    location: String,
    date: String,
    time: String,
    placesLeft1: Number,
    placesLeft2: Number,
    price: Number,
    organizer: Object,
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
  padding: 16px;
  font-size: 16px;
  object-fit: cover;
  background-image: url(@/assets/icons/rectangle.svg);
  background-repeat: no-repeat;
  background-position: right;
  border-radius: 8px;
  background-color: #2b2b2b;
  box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
  height: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
