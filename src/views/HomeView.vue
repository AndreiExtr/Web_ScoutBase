<template>
  <div class="wrapper">
    <SidebarMenu
      :activeTab="activeTab"
      @update:activeTab="setActiveTab"/>

    <!-- МАТЧИ -->
    <div class="wrapper__content" v-if="activeTab === 0">
      <h1>Ближайший матч</h1>
      <div class="wrapper__content-match">
        <div class="title-top">
          <p> <span style="font-size: 20px;font-weight: 700;">Вт, 03 июля</span><br> 12:00 - 13:30</p>

          <div class="user">
            <p><span style="font-size: 20px;font-weight: 700;">Семенов Иван</span><br>Организатор</p>
            <img class="avatar" alt="" src="@/assets/img/avatar.png">
          </div>
        </div>
        <div class="title-center">
          <div class="shield-1-group">
            <img class="shield-1" alt="" src="@/assets/img/shield1.png">
            <p>4 места</p>
          </div>
          <div class="team">
            <p>10 VS 10</p>
            <ButtonUI text="Перейти к матчу" />
          </div>
          <div class="shield-2-group">
            <img class="shield-2" alt="" src="@/assets/img/shield2.png">
            <p>1 место</p>
          </div>
        </div>
        <div class="title-bottom">
          <p style="font-size: 20px;font-weight: 400;"> г.Москва<br>Центральный стадион "Локомотив"</p>

          <div class="price">
            <p style="font-size: 32px;font-weight: 700;">1300 ₽</p>
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
            :placeIcon="placeIcon"
            :addressIcon="addressIcon"/>
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
            :placeIcon="placeIcon"
            :addressIcon="addressIcon" />
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
            :placeIcon="placeIcon"
            :addressIcon="addressIcon" />
        </div>
        <PaginationUI
          v-if="totalPages(2) > 1"
          :total-pages="totalPages(2)"
          :current-page="currentPage"
          @update:currentPage="changePage"
        />
      </div>
    </div>

    <!-- ИГРОКИ -->
    <div class="wrapper__content" v-if="activeTab === 1">
      <h1>Игроки</h1>
      <div class="wrapper__content-list">
        <div class="rows">
          <MatchCard
            v-for="match in displayedMatches(3)"
            :key="match.id"
            :placeIcon="placeIcon"
            :addressIcon="addressIcon" />
        </div>
        <PaginationUI
          :total-pages="totalPages(3) > 1"
          :current-page="currentPage"
          @update:currentPage="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
    ButtonUI
  },
  data () {
    return {
      activeTabs: 0,
      currentPage: 1,
      activeTab: 0,
      matches: [
        { id: 1, name: 'Match 1' },
        { id: 2, name: 'Match 2' },
        { id: 3, name: 'Match 3' },
        { id: 4, name: 'Match 4' },
        { id: 5, name: 'Match 5' },
        { id: 6, name: 'Match 6' },
        { id: 7, name: 'Match 7' },
        { id: 8, name: 'Match 8' },
        { id: 9, name: 'Match 9' },
        { id: 10, name: 'Match 10' },
        { id: 11, name: 'Match 11' },
        { id: 12, name: 'Match 12' },
        { id: 13, name: 'Match 13' }
      ],
      matchesPerPage: 8,
      placeIcon: require('@/assets/icons/users.svg'),
      addressIcon: require('@/assets/icons/map.svg')
    }
  },
  computed: {
    totalPages () {
      return (tab) => {
        let filteredMatches = this.matches
        if (tab === 0) {
          filteredMatches = this.matches.slice(0, 5)
        } else if (tab === 1) {
          filteredMatches = this.matches.slice(0, 12)
        } else if (tab === 2) {
          filteredMatches = this.matches.slice(0, 3)
        }
        return Math.ceil(filteredMatches.length / this.matchesPerPage)
      }
    },
    displayedMatches () {
      return (tab) => {
        let filteredMatches = this.matches
        if (tab === 0) {
          filteredMatches = this.matches.slice(0, 5)
        } else if (tab === 1) {
          filteredMatches = this.matches.slice(0, 12)
        } else if (tab === 2) {
          filteredMatches = this.matches.slice(0, 3)
        }

        const startIndex = (this.currentPage - 1) * this.matchesPerPage
        const endIndex = startIndex + this.matchesPerPage
        return filteredMatches.slice(startIndex, endIndex)
      }
    }
  },
  created () {
    const savedIndex = sessionStorage.getItem('activeIndex')
    if (savedIndex !== null) {
      this.activeTab = parseInt(savedIndex, 10)
    }

    const savedPage = sessionStorage.getItem('currentPage')
    if (savedPage !== null) {
      this.currentPage = parseInt(savedPage, 10)
    }

    const savedActiveTabs = sessionStorage.getItem('activeTabs')
    if (savedActiveTabs !== null) {
      this.activeTabs = parseInt(savedActiveTabs, 10)
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
      sessionStorage.setItem('currentPage', page)
    },
    setActiveTab (index) {
      this.activeTab = index
      this.currentPage = 1
      sessionStorage.setItem('activeIndex', index)
      sessionStorage.setItem('currentPage', 1)
    },
    setActiveTabs (index) {
      this.activeTabs = index
      this.currentPage = 1
      sessionStorage.setItem('activeTabs', index)
      sessionStorage.setItem('currentPage', 1)
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
      background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("@/assets/img/background.png");
      background-repeat:no-repeat;
      background-size: cover ;
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
}
</style>
