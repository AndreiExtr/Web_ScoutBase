<template>
  <div class="wrapper">
    <SidebarMenu />
    <div class="wrapper__content">
      <div class="wrapper__content-rows">
        <MatchCard v-for="match in displayedMatches" :key="match.id" />
      </div>
      <PaginationUI
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:currentPage="changePage"
      />
    </div>
  </div>
</template>

<script>
import MatchCard from '@/components/MatchCard.vue'
import PaginationUI from '@/components/PaginationUI.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
export default {
  name: 'HomeView',
  components: {
    SidebarMenu,
    MatchCard,
    PaginationUI
  },
  data () {
    return {
      currentPage: 1,
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
      matchesPerPage: 8
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.matches.length / this.matchesPerPage)
    },
    displayedMatches () {
      const startIndex = (this.currentPage - 1) * this.matchesPerPage
      const endIndex = startIndex + this.matchesPerPage
      return this.matches.slice(startIndex, endIndex)
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
    }
  }
}
</script>

<style lang="scss">
$bg-color: #1F1F1F;
.wrapper {
  width: 100%;
  background-color: $bg-color;
  display: flex;
  flex-direction: row;

  &__content{
    width: calc(100% - 250px);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 250px;

    &-rows{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-flow: wrap;
      gap: 16px;
    }
  }
}
</style>
