<template>
  <div class="main" v-if="activeTab === 1 && showPlayerView">
    <div class="main__header">
      <ButtonUI
        :icon="require('@/assets/icons/arrow-left.svg')"
        :style="{ width: 'auto' }"
        @click="closeGamerView" />
      <h1>Игрок</h1>
    </div>
    <div class="main__player">
      <div class="info">
        <img :src="playerAvatar" alt="Аватар игрока">
        <div class="info__name">
          <p><span>{{ playerLast }}</span> <br>
            {{ playerFirst }} {{ playerMiddle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'PlayerView',
  components: {
    ButtonUI
  },
  data () {
    return {
      activeTab: 1,
      showPlayerView: true
    }
  },
  computed: {
    ...mapGetters(['selectedPlayer']),
    playerId () {
      return this.selectedPlayer.id
    },
    playerLast () {
      return this.selectedPlayer.lastName
    },
    playerFirst () {
      return this.selectedPlayer.firstName
    },
    playerMiddle () {
      return this.selectedPlayer.middleName
    },
    playerAvatar () {
      return this.selectedPlayer.avatar
    }
  },
  methods: {
    closeGamerView () {
      // Удаление данных о текущем игроке из sessionStorage
      sessionStorage.removeItem('selectedPlayer')
      this.$router.push({ name: 'GamerView' })
    }
  },
  mounted () {
    const savedPlayer = sessionStorage.getItem('selectedPlayer')
    if (!savedPlayer) {
      this.$router.push({ name: 'GamerView' })
    } else {
      this.$store.commit('setSelectedPlayer', JSON.parse(savedPlayer))
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  width: calc(100% - 200px);
  gap: 16px;

  &__header{
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: #1f1f1f;
    height: 80px;
    width: 100%;
    box-shadow: 10px 5px 24px rgba(0, 0, 0, 0.315);
    z-index: 5;

    h1{
      text-align: left;
      width: 100%;
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
    }
  }

  &__player{
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
    padding: 0 16px 16px 16px;
    margin-top: 100px;

    .info{
      width: 100%;
      min-height: 250px;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
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
    }
  }
}
</style>
