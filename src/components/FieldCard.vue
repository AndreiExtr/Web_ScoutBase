<template>
  <div class="field-card">
    <div class="field-card__status">
      <span class="status-indicator"></span>
      <p>Свободно</p>
    </div>
    <div class="field-card__name">
      <h3>Стадион "Зенит"</h3>
      <p>Футбольная аллея, 1, Санкт-Петербург</p>
    </div>
    <div class="field-card__badge">
      dfsfsfd
    </div>
  </div>
</template>

<script>
export default {
  name: 'FieldCard',
  components: {},
  props: {},
  data () {
    return {}
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;
.field-card{
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
  gap: 16px;

  &:hover{
    box-shadow: 10px 10px 32px rgba(0, 255, 98, 0.089);
  }

  &__status{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    color: $text-color;

    .status-indicator {
      display: inline-block;
      width: 10px; // Размер круга
      height: 10px; // Размер круга
      background-color: rgb(17, 255, 17); // Цвет круга
      border-radius: 50%; // Делаем элемент круглым
    }
  }

  &__name{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    text-align: left;
    color: $text-color;

    h3{
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
