<template>
  <div class="wrapper">
    <SidebarMenu
      :key="activeTab"
      :activeTab="activeTab"
      @update:activeTab="setActiveTab"/>

    <!-- МАТЧИ -->
    <div class="wrapper__content" v-if="activeTab === 0 && !showMatchView">
      <h1>Ближайший матч</h1>
      <div class="wrapper__content-match" v-if="liveMatch">
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
      </div>
      <div class="wrapper__content-list" v-if="activeTabs === 0">
        <div class="rows">
          <MatchCard
            v-for="match in displayedMatches(0)"
            :key="match.id"
            :matchId="match.id"
            :date="match.date"
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
    </div>

    <!-- MatchView (появляется после клика) -->
    <div class="match-view-container" v-if="showMatchView">
      <MatchView @close="closeMatchView"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MatchView from '@/views/MatchView.vue'
import MatchCard from '@/components/MatchCard.vue'
import PaginationUI from '@/components/PaginationUI.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
import ButtonUI from '@/components/ButtonUI.vue'

export default {
  name: 'HomeView',
  components: {
    SidebarMenu,
    MatchCard,
    PaginationUI,
    ButtonUI,
    MatchView
  },
  mounted () {
    // Восстановление значения activeTabs из sessionStorage
    const savedTab = sessionStorage.getItem('activeTabs')
    if (savedTab !== null) {
      this.activeTabs = parseInt(savedTab)
    }

    // Восстановление текущей страницы из sessionStorage
    const savedPage = sessionStorage.getItem('currentPage')
    if (savedPage !== null) {
      this.currentPage = parseInt(savedPage)
    }
  },
  computed: {
    ...mapGetters(['getMatches']),
    liveMatch () {
      // Поиск первого матча "сегодня"
      return this.getMatches.find(match => match.status === 'сегодня')
    },
    matches () {
      return this.getMatches
    }
  },
  data () {
    return {
      showMatchView: false,
      activeTabs: 0,
      currentPage: 1,
      activeTab: 0,
      matchesPerPage: 8,
      placeIcon: require('@/assets/icons/users.svg'),
      addressIcon: require('@/assets/icons/location.svg')
    }
  },
  methods: {
    setActiveTab (tab) {
      this.activeTab = tab
    },
    setActiveTabs (tab) {
      this.activeTabs = tab
      this.currentPage = 1
      sessionStorage.setItem('activeTabs', tab) // Сохранение вкладки в sessionStorage
      sessionStorage.setItem('currentPage', 1)
    },
    openMatchView (match) {
      this.showMatchView = true
      this.$router.push({
        name: 'MatchView',
        state: {
          date: match.date,
          price: match.price,
          organizer: { name: match.organizer.name, position: match.organizer.position },
          time: match.time,
          placesLeft1: match.placesLeft1,
          placesLeft2: match.placesLeft2,
          location: match.location
        },
        params: { matchId: match.id }
      })
      sessionStorage.setItem('showMatchView', 'true')
    },
    closeMatchView () {
      this.showMatchView = false
    },
    changePage (page) {
      this.currentPage = page
      sessionStorage.setItem('currentPage', page)
    },
    goToMatch (liveMatch) {
      // Переход на страницу матча с передачей данных через query параметры
      this.$router.push({
        name: 'MatchView',
        state: {
          date: liveMatch.date,
          price: liveMatch.price,
          organizer: { name: liveMatch.organizer.name, position: liveMatch.organizer.position },
          time: liveMatch.time,
          placesLeft1: liveMatch.placesLeft1,
          placesLeft2: liveMatch.placesLeft2,
          location: liveMatch.location
        },
        params: { matchId: liveMatch.id }
      })
    },
    totalPages (tab) {
      const totalMatches = this.matches.filter(match => {
        if (tab === 0) return match.status === 'сегодня' && match.id !== this.liveMatch?.id
        if (tab === 1) return match.status === 'предстоящие'
        return false
      }).length
      return Math.ceil(totalMatches / this.matchesPerPage)
    },
    displayedMatches (tab) {
      let filteredMatches = []

      if (tab === 0) {
        filteredMatches = this.matches.filter(match => match.status === 'сегодня' && match.id !== this.liveMatch?.id)
      } else if (tab === 1) {
        filteredMatches = this.matches.filter(match => match.status === 'предстоящие')
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
    width: calc(100% - 250px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 250px;

    h1{
      text-align: left;
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
    }

    &-match{
      width: 100%;
      min-height: 350px;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
      background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("@/assets/img/поле2.png");
      background-repeat:no-repeat;
      background-size: cover ;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title-top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: $text-color;
        text-align: left;

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
