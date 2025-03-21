<template>
  <div class="content-organizer">
    <h1>Добро пожаловать, Организатор!</h1>
  </div>
</template>

<script>
export default {
  name: 'AccountOrganizer',
  components: {},
  props: {},
  data () {
    return {}
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;
.content-organizer{
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100vh;
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 16px;
}
</style>
