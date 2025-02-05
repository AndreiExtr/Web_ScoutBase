<template>
  <div class="wrapper">
    <SidebarMenu />
    <div class="wrapper__content">
      <div class="wrapper__content-rows">
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
      <div class="wrapper__content-rows">
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
      <div class="wrapper__content-rows">
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
      <div class="wrapper__content-rows">
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </div>
    </div>
  </div>
</template>

<script>
import MatchCard from '@/components/MatchCard.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'
export default {
  name: 'HomeView',
  components: {
    SidebarMenu,
    MatchCard
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
      justify-content: space-between;
      flex-flow: row wrap;
      gap: 16px;
    }
  }
}
</style>
