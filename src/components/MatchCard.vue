<template>
  <div class="match-card">
    <div class="match-card__title">
      <p>03 июля <br>  12:00 - 13:30</p>
      <h3>1200 ₽</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchCard',
  props: {
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
  height: 160px;
  cursor: pointer;

  @media (max-width: 1500px) {
    flex-basis: calc(50% - 10px);
  }

  &__title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p{
      text-align: left;
      color: $text-color;
    }

    h3{
      color: $primary-color;
      font-size: 24px;
      font-weight: 700;
    }
  }
}
</style>
