<template>
  <div v-if="isPlayer" class="main-player"><!-- Контент для игрока -->
    <AccountPlayer />
  </div>
  <div v-else-if="isOrganizer"><!-- Контент для организатора -->
    <h1>Добро пожаловать, Организатор!</h1>
    <p>Управление матчами и игроками</p>
  </div>
</template>

<script>
import AccountPlayer from './AccountPlayer.vue'

export default {
  name: 'MainView',
  components: {
    AccountPlayer
  },
  computed: {
    // Получаем текущую роль из localStorage
    currentRole () {
      return localStorage.getItem('currentRole')
    },
    // Проверка, авторизован ли пользователь как игрок
    isPlayer () {
      return this.currentRole === 'player'
    },
    // Проверка, авторизован ли пользователь как организатор
    isOrganizer () {
      return this.currentRole === 'organizer'
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;

.main-player{
  height: 100vh;
}
</style>
