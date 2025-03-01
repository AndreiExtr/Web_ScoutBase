<template>
  <div class="wrapper">
    <SidebarMenu
      :activeTab="activeTab"
      @update:activeTab="setActiveTab"/>

    <!-- МАТЧИ -->
    <div class="wrapper__content" v-if="activeTab === 0 && !showMatchView">
      <h1>Ближайший матч</h1>
      <div class="wrapper__content-match">
        <div class="title-top">
          <p> <span style="font-size: 20px;font-weight: 700;">{{ date }}</span><br> {{ time }}</p>

          <div class="user">
            <p><span style="font-size: 20px;font-weight: 700;">Семенов Иван</span><br>Организатор</p>
            <img class="avatar" alt="" src="@/assets/img/avatar.png">
          </div>
        </div>
        <div class="title-center">
          <div class="shield-1-group">
            <img class="shield-1" alt="" src="@/assets/img/shield1.png">
            <p>{{ placesLeft1 }}</p>
          </div>
          <div class="team">
            <p>{{ team1 }} VS {{ team2 }}</p>
            <ButtonUI
              text="Перейти к матчу" />
          </div>
          <div class="shield-2-group">
            <img class="shield-2" alt="" src="@/assets/img/shield2.png">
            <p>{{ placesLeft2 }}</p>
          </div>
        </div>
        <div class="title-bottom">
          <p style="font-size: 20px;font-weight: 400;"> {{ location }}</p>

          <div class="price">
            <p style="font-size: 32px;font-weight: 700;">{{ price }} ₽</p>
          </div>
        </div>
      </div>
      <div class="wrapper__content-tabs">
        <a href="#" :class="{ active: activeTabs === 0 }" @click.prevent="setActiveTabs(0)">live<div class="vibrate"></div></a>
        <a href="#" :class="{ active: activeTabs === 1 }" @click.prevent="setActiveTabs(1)">предстоящие</a>
        <a href="#" :class="{ active: activeTabs === 2 }" @click.prevent="setActiveTabs(2)">завершенные</a>
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
            :team1="match.team1"
            :team2="match.team2"
            :placesLeft1="match.placesLeft1"
            :placesLeft2="match.placesLeft2"
            :location="match.location"
            :organizer="match.organizer"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"
            @match-card-click="openMatchView(match)"/>
        </div>
        <PaginationUI
          v-if="totalPages(0) > 1"
          :total-pages="totalPages(0)"
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
            :team1="match.team1"
            :team2="match.team2"
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
            v-for="match in displayedMatches(2)"
            :key="match.id"
            :matchId="match.id"
            :date="match.date"
            :price="match.price"
            :time="match.time"
            :team1="match.team1"
            :team2="match.team2"
            :placesLeft1="match.placesLeft1"
            :placesLeft2="match.placesLeft2"
            :location="match.location"
            :organizer="match.organizer"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"
            @match-card-click="openMatchView(match)"/>
        </div>
        <PaginationUI
          v-if="totalPages(2) > 1"
          :total-pages="totalPages(2)"
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
  computed: {
    ...mapGetters(['getMatches']),
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
    },
    openMatchView (match) {
      this.showMatchView = true
      this.$router.push({
        name: 'MatchView',
        state: { date: match.date, price: match.price, organizer: { name: match.organizer.name, position: match.organizer.position }, team1: match.team1, team2: match.team2, time: match.time, placesLeft1: match.placesLeft1, placesLeft2: match.placesLeft2, location: match.location },
        params: { matchId: match.id }
      })
    },
    closeMatchView () {
      this.showMatchView = false
    },
    changePage (page) {
      this.currentPage = page
    },
    totalPages (tab) {
      const matches = this.displayedMatches(tab)
      return Math.ceil(matches.length / this.matchesPerPage)
    },
    displayedMatches (tab) {
      if (tab === 0) {
        return this.matches.filter(match => match.status === 'live')
      } else if (tab === 1) {
        return this.matches.filter(match => match.status === 'предстоящие')
      } else if (tab === 2) {
        return this.matches.filter(match => match.status === 'завершенные')
      }
      return []
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
