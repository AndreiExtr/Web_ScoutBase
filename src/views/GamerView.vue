<template>
  <div class="content-list">
    <div class="rows">
      <GamerCard/>
      <GamerCard/>
      <GamerCard/>
      <GamerCard/>
    </div>
    <div class="rows">
      <GamerCard/>
      <GamerCard/>
      <GamerCard/>
      <GamerCard/>
    </div>
  </div>
</template>

<script>
import GamerCard from '@/components/GamerCard.vue'

export default {
  name: 'GamerView',
  components: {
    GamerCard
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
