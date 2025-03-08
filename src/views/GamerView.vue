<template>
  <div class="content-list">
    <div class="rows">
      <GamerCard v-for="player in players"
        :key="player.id"
        :player="player"
        :lastName="player.lastName"
        :firstName="player.firstName"
        :middleName="player.middleName"
        :age="player.age"
        :position="player.position"
        :goals="player.goals" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GamerCard from '@/components/GamerCard.vue'

export default {
  name: 'GamerView',
  components: {
    GamerCard
  },
  computed: {
    ...mapGetters(['getPlayers']), // Список игроков из Vuex
    players () {
      return this.getPlayers
    }
  }
}
</script>

<style lang="scss">
.content-list{
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;

  .rows {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;

    & > * {
      flex: 1 1 calc(25% - 12px); /* 4 плитки в ряд с учетом отступов */
      max-width: calc(25% - 12px);
    }

    @media (max-width: 1400px) {
      & > * {
        flex: 1 1 calc(33% - 8px); /* 3 плитки в ряд на средних экранах */
        max-width: calc(33% - 8px);
      }
    }

    @media (max-width: 1024px) {
      & > * {
        flex: 1 1 calc(50% - 8px); /* 2 плитки в ряд на средних экранах */
        max-width: calc(50% - 8px);
      }
    }

    @media (max-width: 768px) {
      & > * {
        flex: 1 1 100%; /* 1 плитка в ряд на маленьких экранах */
        max-width: 100%;
      }
    }
  }
}
</style>
