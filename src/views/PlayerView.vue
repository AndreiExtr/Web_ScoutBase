<template>
  <div class="main" v-if="activeTab === 0 && showPlayerView">
    <div class="title">
      <ButtonUI
        :icon="require('@/assets/icons/arrow-left.svg')"
        :style="{ width: 'auto' }"
        @click="closeGamerView" />
      <h1>Игрок</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'MatchView',
  components: {
    ButtonUI
  },
  data () {
    return {
      activeTab: 0,
      showPlayerView: true
    }
  },
  computed: {
    ...mapGetters(['selectedPlayer']),
    playerId () {
      return this.selectedPlayer.id
    }
  },
  methods: {
    closeGamerView () {
      // Удаление данных о текущем матче из sessionStorage
      // sessionStorage.removeItem('selectedMatch')
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

  .title{
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
}
</style>
