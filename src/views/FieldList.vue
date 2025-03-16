<template>
  <div class="content-list">

  </div>
</template>

<script>
export default {
  name: 'FieldList',
  components: {
  }
}
</script>

<style lang="scss">
.content-list{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  gap: 16px;
  flex-grow: 1;
  margin-left: 200px;
  width: calc(100% - 200px);
}
</style>
