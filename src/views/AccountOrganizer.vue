<template>
  <div class="content-organizer">
    <div class="content-organizer__fields">
      <div class="tabs">
        <a href="#" :class="{ active: fieldTabs === 0 }" @click.prevent="setActive(0)">Мои выбранные площадки</a>
        <a href="#" :class="{ active: fieldTabs === 1 }" @click.prevent="setActive(1)">Записи</a>
      </div>
      <div v-if="fieldTabs === 0">
        <p>Здесь будут выбранные площадки...</p>
      </div>
      <div v-if="fieldTabs === 1">
        <p>Здесь будут видеозаписи матчей...</p>
      </div>
    </div>
    <div class="content-organizer__organizator">
      <img class="organizer__img" alt="" src="@/assets/img/avatar.png">
      <p><strong style="font-size: 18px;">Организатор:</strong></p>
      <p v-if="organizerName" style="margin-bottom: 24px;">
        {{ organizerName.split(' ')[0] }}<br> <!-- Фамилия -->
        <span>{{ organizerName.split(' ')[1] }} {{ organizerName.split(' ')[2] }}</span><!-- Имя и Отчество -->
      </p>
      <p><strong style="font-size: 18px;">Должность:</strong></p>
      <p class="position">{{ organizerPosition }}</p>
    </div>
  </div>
</template>

<script>
// import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'AccountOrganizer',
  components: {
  },
  props: {},
  data () {
    return {
      fieldTabs: 0
    }
  },
  methods: {
    setActive (tab) {
      this.fieldTabs = tab
      sessionStorage.setItem('fieldTabs', tab)
    }
  },
  created () {
    const savedTab = sessionStorage.getItem('fieldTabs')
    if (savedTab !== null) {
      this.fieldTabs = parseInt(savedTab)
    }
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
  flex-direction: row;
  gap: 16px;
  width: 100%;
  height: 100vh;
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 16px;

  &__fields{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;

    .tabs {
      display: flex;
      flex-direction: row;
      gap: 32px;

      a{
        text-decoration: none;
        color: #666;
        font-size: 16px;
        position: relative;

        &.active {
          color: $primary-color;
        }
      }
    }
  }

  &__organizator{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    gap: 16px;
    padding: 16px;
    z-index: 1;
    min-width: 260px;
    height: 400px;
    border-radius: 8px;
    box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
    background-color: #1f1f1f;

    .position{
      color: #ff6600;
      text-transform: uppercase;
    }

    &__img{
      width: 150px;
      height: 150px;
    }

    h1{
      font-size: 18px;
      color: $text-color;
      font-weight: 700;
    }

    p{
      font-size: 16px;
      color: $text-color;
      width: 100%;
    }
  }
}
</style>
