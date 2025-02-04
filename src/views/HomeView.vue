<template>
  <div class="home">
    <SidebarMenu />
  </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'
export default {
  name: 'HomeView',
  components: {
    SidebarMenu
  }
}
</script>

<style lang="scss">
.home {
  width: 100%;
  background-color: #1F1F1F;
}
</style>
