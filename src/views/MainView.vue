<template>
  <div class="main">
    <div v-if="isPlayer"><!-- Контент для игрока -->
      <h1>Добро пожаловать, Игрок!</h1>
      <p>Ваши матчи и статистика</p>
    </div>
    <div v-else-if="isOrganizer"><!-- Контент для организатора -->
      <h1>Добро пожаловать, Организатор!</h1>
      <p>Управление матчами и игроками</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  computed: {
    // Получаем текущую роль из localStorage
    currentRole () {
      return localStorage.getItem('currentRole')
    },
    // Проверяем, авторизован ли пользователь как игрок
    isPlayer () {
      return this.currentRole === 'player'
    },
    // Проверяем, авторизован ли пользователь как организатор
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

.main{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  width: calc(100% - 200px);
  gap: 16px;
  height: 100%;
}
</style>
