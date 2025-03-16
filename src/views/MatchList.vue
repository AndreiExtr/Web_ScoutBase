<template>
  <div class="wrapper">

    <!-- МАТЧИ -->
    <div class="wrapper__content" v-if="activeTab === 0 && !showMatchView">
      <h1>Ближайший матч</h1>
      <div class="wrapper__content-match" v-if="liveMatch">
        <img :src="matchField" alt="Поле" class="field">
        <div class="title-top">
          <p> <span style="font-size: 20px;font-weight: 700;">{{ liveMatch.date }}</span><br> {{ liveMatch.time }}</p>

          <div class="user">
            <p><span style="font-size: 20px;font-weight: 700;">{{ liveMatch.organizer.name }}</span><br>Организатор</p>
            <img class="avatar" alt="" src="@/assets/img/avatar.png">
          </div>
        </div>
        <div class="title-center">
          <div class="shield-1-group">
            <img class="shield-1" alt="" src="@/assets/img/shield1.png">
            <p style="font-size: 24px;">{{ liveMatch.placesLeft1 }}</p>
          </div>
          <div class="team">
            <p>VS</p>
            <ButtonUI
              text="Перейти к матчу"
              :date="liveMatch.date"
              :price="liveMatch.price"
              :time="liveMatch.time"
              @click="goToMatch(liveMatch)" />
          </div>
          <div class="shield-2-group">
            <img class="shield-2" alt="" src="@/assets/img/shield2.png">
            <p style="font-size: 24px;">{{ liveMatch.placesLeft2 }}</p>
          </div>
        </div>
        <div class="title-bottom">
          <p style="font-size: 20px;font-weight: 400;">
            {{ liveMatch.location.split(',')[0] }}<br>
            {{ liveMatch.location.split(',').slice(1).join(',') }}
          </p>

          <div class="price">
            <p style="font-size: 32px;font-weight: 700;">{{ liveMatch.price }} ₽</p>
          </div>
        </div>
      </div>
      <div class="wrapper__content-tabs">
        <a href="#" :class="{ active: activeTabs === 0 }" @click.prevent="setActiveTabs(0)">сегодня<div class="vibrate"></div></a>
        <a href="#" :class="{ active: activeTabs === 1 }" @click.prevent="setActiveTabs(1)">предстоящие</a>
        <a href="#" :class="{ active: activeTabs === 2 }" @click.prevent="setActiveTabs(2)">мои заявки</a>
      </div>
      <div class="wrapper__content-list" v-if="activeTabs === 0">
        <div class="rows">
          <MatchCard
            v-for="match in displayedMatches(0)"
            :key="match.id"
            :matchId="match.id"
            :date="match.date"
            :field="match.field"
            :price="match.price"
            :time="match.time"
            :placesLeft1="match.placesLeft1"
            :placesLeft2="match.placesLeft2"
            :location="match.location"
            :organizer="match.organizer"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"
            @match-card-click="openMatchView(match)"/>
        </div>
        <PaginationUI
          v-if="totalPages(activeTabs) > 1"
          :total-pages="totalPages(activeTabs)"
          :current-page="currentPage"
          @update:currentPage="changePage"
        />
      </div>
      <div class="wrapper__content-list" v-if="activeTabs === 1">
        <div class="rows">
          <MatchCard
            v-for="match in displayedMatches(1)"
            :key="match.id"
            :matchId="match.id"
            :date="match.date"
            :field="match.field"
            :price="match.price"
            :time="match.time"
            :placesLeft1="match.placesLeft1"
            :placesLeft2="match.placesLeft2"
            :location="match.location"
            :organizer="match.organizer"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"
            @match-card-click="openMatchView(match)"/>
        </div>
        <PaginationUI
          v-if="totalPages(1) > 1"
          :total-pages="totalPages(1)"
          :current-page="currentPage"
          @update:currentPage="changePage"
        />
      </div>
      <div class="wrapper__content-list" v-if="activeTabs === 2">
        <div class="rows">
          <MatchCard
            v-for="match in myMatches"
            :key="match.id"
            :matchId="match.id"
            :date="match.date"
            :field="match.field"
            :price="match.price"
            :time="match.time"
            :placesLeft1="match.placesLeft1"
            :placesLeft2="match.placesLeft2"
            :location="match.location"
            :organizer="match.organizer"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"
            @match-card-click="openMatchView(match)"
          />
        </div>
        <PaginationUI
          v-if="totalPages(2) > 1"
          :total-pages="totalPages(2)"
          :current-page="currentPage"
          @update:currentPage="changePage"
        />
      </div>
    </div>

    <!-- СТРАНИЦА ПРОСМОТРА МАТЧА -->
    <div v-if="activeTab === 0 && showMatchView">
      <MatchView @close="closeMatchView"/>
    </div>

    <!-- ИГРОКИ -->
    <div  v-if="activeTab === 1 && showPlayerView">
      <GamerView @close="closeGamerView"/>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MatchView from '@/views/MatchView.vue'
import MatchCard from '@/components/MatchCard.vue'
import PaginationUI from '@/components/PaginationUI.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import GamerView from '@/views/GamerList.vue'

export default {
  name: 'MatchList',
  components: {
    MatchCard,
    PaginationUI,
    ButtonUI,
    MatchView,
    GamerView
  },
  mounted () {
    // Восстановление значения activeTabs из sessionStorage
    const savedActiveTabs = sessionStorage.getItem('activeTabs')
    if (savedActiveTabs !== null) {
      this.activeTabs = parseInt(savedActiveTabs)
    } else {
      this.activeTabs = 0 // По умолчанию вкладка "сегодня"
    }

    // Восстановление текущей страницы из sessionStorage
    const savedPage = sessionStorage.getItem('currentPage')
    if (savedPage !== null) {
      this.currentPage = parseInt(savedPage)
    }

    // Загружка данные о ближайшем матче из sessionStorage
    const savedLiveMatch = sessionStorage.getItem('liveMatch')
    if (savedLiveMatch) {
      const liveMatch = JSON.parse(savedLiveMatch)
      this.setSelectedMatch(liveMatch) // Сохраняем данные в хранилище Vuex
    }
  },
  computed: {
    ...mapGetters(['getMatches', 'getJoinedMatches']),
    liveMatch () {
      // Поиск первого матча "сегодня"
      return this.getMatches.find(match => match.status === 'сегодня')
    },
    matches () {
      return this.getMatches
    },
    matchField () {
      return this.liveMatch.field
    },
    selectedMatch () {
      return this.$store.state.selectedMatch // Выбранный матч из Vuex
    },
    myMatches () {
      const joinedMatchIds = this.getJoinedMatches.map(m => m.matchId)
      return this.getMatches.filter(match => joinedMatchIds.includes(match.id))
    }
  },
  data () {
    return {
      showPlayerView: false,
      activeTabs: 0,
      currentPage: 1,
      activeTab: 0,
      matchesPerPage: 8,
      placeIcon: require('@/assets/icons/users.svg'),
      addressIcon: require('@/assets/icons/location.svg')
    }
  },
  methods: {
    ...mapMutations(['setSelectedMatch']),
    selectMatch (match) {
      this.setSelectedMatch(match)
    },
    setActiveTab (tab) {
      this.$emit('update:activeTab', tab) // Передача события в App.vue
    },
    setActiveTabs (tab) {
      this.activeTabs = tab
      this.currentPage = 1
      sessionStorage.setItem('activeTabs', tab) // Сохранение вкладки в sessionStorage
      sessionStorage.setItem('currentPage', 1)
    },
    openMatchView (match) {
      // Сохранение ID матча и дополнительные данные в sessionStorage
      sessionStorage.setItem('selectedMatchId', match.id)
      sessionStorage.setItem('selectedMatch', JSON.stringify(match))

      this.setSelectedMatch(match) // Сохранение выбранного матча в хранилище
      this.$router.push({
        name: 'MatchView',
        params: { matchId: match.id }
      })
    },
    closeMatchView () {
      this.showMatchView = false
    },
    changePage (page) {
      this.currentPage = page
      sessionStorage.setItem('currentPage', page)
    },
    goToMatch (liveMatch) {
      sessionStorage.setItem('selectedMatchId', liveMatch.id)
      sessionStorage.setItem('selectedMatch', JSON.stringify(liveMatch))

      this.showMatchView = true
      this.$router.push({
        name: 'MatchView',
        params: { matchId: liveMatch.id }
      })
      sessionStorage.setItem('showMatchView', 'true')
    },
    totalPages (tab) {
      let totalMatches = 0
      if (tab === 0) {
        totalMatches = this.matches.filter(match => match.status === 'сегодня' && match.id !== this.liveMatch?.id).length // фильтрация всех матчей во вкладке "Сегодня" кроме "Ближайший матч" (liveMatch)
      } else if (tab === 1) {
        totalMatches = this.matches.filter(match => match.status === 'предстоящие').length
      } else if (tab === 2) {
        totalMatches = this.myMatches.length
      }
      return Math.ceil(totalMatches / this.matchesPerPage)
    },
    displayedMatches (tab) {
      let filteredMatches = []

      if (tab === 0) {
        filteredMatches = this.matches.filter(match => match.status === 'сегодня' && match.id !== this.liveMatch?.id)
      } else if (tab === 1) {
        filteredMatches = this.matches.filter(match => match.status === 'предстоящие')
      } else if (tab === 2) {
        filteredMatches = this.myMatches
      }

      const startIndex = (this.currentPage - 1) * this.matchesPerPage
      const endIndex = startIndex + this.matchesPerPage
      return filteredMatches.slice(startIndex, endIndex)
    }
  }
}
</script>

<style lang="scss">
$bg-color: #1F1F1F;
$primary-color: #13e66e;
$text-color: #fff;
.wrapper {
  width: 100%;
  background-color: $bg-color;
  display: flex;
  flex-direction: row;
  height: 100%;

  &__content{
    width: calc(100% - 200px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 200px;
    height: 100%;

    h1{
      text-align: left;
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
    }

    &-match{
      position: relative;
      width: 100%;
      min-height: 350px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
      background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8));
      background-repeat:no-repeat;
      background-size: cover ;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      .field {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        min-height: 350px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        filter: brightness(40%);
        transform: translateY(-50%);
      }

      .title-top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: $text-color;
        text-align: left;
        z-index: 1;

        .user{
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 16px;
          text-align: right;

          .avatar {
            border-radius: 40px;
            width: 46px;
            height: 46px;
            object-fit: cover;
            mix-blend-mode: normal;
          }
        }
      }

      .title-center{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
        color: $text-color;
        gap: 32px;
        z-index: 1;

        .shield-1-group,
        .shield-2-group{
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .team{
          display: flex;
          flex-direction: column;
          gap: 32px;
          font-size: 40px;
          font-weight: 700;
        }
      }

      .title-bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: $text-color;
        text-align: left;
        z-index: 1;

        .price{
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 16px;
          text-align: right;
        }
      }
    }

    &-tabs {
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

      .vibrate {
        position: absolute;
        top: -2px;
        right: -10px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ff6600;
        transform: scale(1);
        box-shadow: 0 0 0 rgba(0, 0, 0, 1);
        animation: anim-vibrate 2s cubic-bezier(0, 0, 0, 1.11) infinite;
      }

      @keyframes anim-vibrate {
        0% {
          transform: scale(0.65);
          box-shadow: 0 0 0 0 #ff660042;
        }

        70% {
          transform: scale(1);
          box-shadow: 0 0 0 0.6rem rgba(0, 0, 0, 0);
        }

        100% {
          transform: scale(0.65);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
      }
    }

    &-list{
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      gap: 16px;

      .rows{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-start;
        flex-flow: wrap;
        gap: 16px;
        flex-grow: 1;
        height: 100%;

        @media (max-width: 1024px) {
          height: auto;
        }
      }
    }
  }

  .match-view-container{
    width: 100%;
  }
}
</style>
