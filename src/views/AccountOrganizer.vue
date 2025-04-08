<template>
  <div class="content-organizer">
    <div class="info">
      <img :src="organizerAvatar" alt="Аватар игрока">
      <div class="info__name">
        <p><span>Иванов</span> <br>
          Иван Сергеевич</p>
      </div>
      <div class="actions">
        <ButtonUI
          :icon="require('@/assets/icons/more.svg')"
          :style="{ width: '40px' }"
          @click="toggleMenu" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'AccountOrganizer',
  components: {
    ButtonUI
  },
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
.content-organizer{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100vh;
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 16px;

  .info{
    position: relative;
    width: 100%;
    min-height: 250px;
    padding: 24px;
    border-radius: 8px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("@/assets/img/player/background.png");
    background-repeat:no-repeat;
    background-size: cover ;
    background-position: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;

    img{
      width: 140px;
      height: 140px;
      border-radius: 100px;
      object-fit: cover;
    }

    p{
      font-size: 20px;
      color: $text-color;
      text-align: left;
      line-height: 140%;

      span{
        font-size: 32px;
        color: $text-color;
        font-weight: 700;
      }
    }

    .actions{
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 24px;
      right: 24px;
      gap: 16px;

      button[type="add"] {
        border: 1px solid $primary-color;
        color: $primary-color;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background-color: $primary-color;
          color: $bg-color;
        }
      }
    }
  }
}
</style>
