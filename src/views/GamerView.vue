<template>
  <div class="content-list">
    <div class="rows">
      <GamerCard v-for="player in paginatedPlayers"
        :key="player.id"
        :playerId="player.id"
        :avatar="player.avatar"
        :lastName="player.lastName"
        :firstName="player.firstName"
        :middleName="player.middleName"
        :age="player.age"
        :position="player.position"
        :goals="player.goals"
        @player-card-click="openPlayerView(player)"/>
    </div>
    <PaginationUI
      v-if="totalPages > 1"
      :total-pages="totalPages"
      :current-page="currentPage"
      @update:currentPage="changePage"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import GamerCard from '@/components/GamerCard.vue'
import PaginationUI from '@/components/PaginationUI.vue'

export default {
  name: 'GamerView',
  components: {
    PaginationUI,
    GamerCard
  },
  data () {
    return {
      showGamerView: false,
      currentPage: 1,
      perPage: 16 // Количество карточек на странице
    }
  },
  mounted () {
    const savedPage = sessionStorage.getItem('currentPage')
    if (savedPage !== null) {
      this.currentPage = parseInt(savedPage)
    }
  },
  computed: {
    ...mapGetters(['getPlayers']),
    players () {
      return this.getPlayers
    },
    selectedPlayer () {
      return this.$store.state.selectedPlayer // Выбранный игрок из Vuex
    },
    totalPages () {
      return Math.ceil(this.players.length / this.perPage)
    },
    paginatedPlayers () {
      const start = (this.currentPage - 1) * this.perPage
      return this.players.slice(start, start + this.perPage)
    }
  },
  methods: {
    ...mapMutations(['setSelectedPlayer']), // Список игроков из Vuex
    selectPlayer (player) {
      this.setSelectedPlayer(player)
    },
    changePage (page) {
      this.currentPage = page
      sessionStorage.setItem('currentPage', page)
    },
    setActiveTab (tab) {
      this.$emit('update:activeTab', tab) // Передача события в App.vue
    },
    openPlayerView (player) {
      // Сохранение ID матча и дополнительные данные в sessionStorage
      sessionStorage.setItem('selectedPlayerId', player.id)
      sessionStorage.setItem('selectedPlayer', JSON.stringify(player))

      this.setSelectedPlayer(player) // Сохранение выбранного игрока в хранилище
      this.$router.push({
        name: 'PlayerView',
        params: { playerId: player.id }
      })
    }
  }
}
</script>

<style lang="scss">
.content-list{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  gap: 16px;
  flex-grow: 1;
  margin-left: 200px;
  width: calc(100% - 200px);

  .rows {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
    align-content: flex-start;

    & > * {
      flex: 1 1 calc(25% - 12px); /* 4 плитки в ряд*/
      max-width: calc(25% - 12px);
    }

    @media (max-width: 1400px) {
      & > * {
        flex: 1 1 calc(33% - 8px); /* 3 плитки в ряд */
        max-width: calc(33% - 8px);
      }
    }

    @media (max-width: 1024px) {
      & > * {
        flex: 1 1 calc(50% - 8px); /* 2 плитки в ряд*/
        max-width: calc(50% - 8px);
      }
    }

    @media (max-width: 768px) {
      & > * {
        flex: 1 1 100%; /* 1 плитка в ряд*/
        max-width: 100%;
      }
    }
  }
}
</style>
