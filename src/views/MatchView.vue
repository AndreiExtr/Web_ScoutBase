<template>
  <div class="main" >
    <div class="title">
      <ButtonUI text="Назад" :style="{ width: 'auto' }" @click="closeMatchView" />
      <h1>Матч</h1>
    </div>
  </div>
</template>

<script>
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'MatchView',
  components: {
    ButtonUI
  },
  methods: {
    closeMatchView () {
      this.$emit('close')
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
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 16px;

  .title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

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
