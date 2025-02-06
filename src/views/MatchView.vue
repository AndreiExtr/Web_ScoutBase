<template>
  <div class="main" >
    <ButtonUI text="Назад" @click="closeMatchView" />
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

  .back-button {
    width: 200px;
    padding: 10px 20px;
    background: #13e66e;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
