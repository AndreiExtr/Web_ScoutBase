<template>
  <SidebarMenu :activeTab="activeTab" @update:activeTab="setActiveTab" />
  <router-view/>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data () {
    return {
      activeTab: 0
    }
  },
  mounted () {
    const savedTab = sessionStorage.getItem('activeTab')
    if (savedTab !== null) {
      this.activeTab = parseInt(savedTab)
    }
  },
  methods: {
    setActiveTab (tab) {
      this.activeTab = tab
      sessionStorage.setItem('activeTab', tab)
      if (tab === 0) {
        this.$router.push({ name: 'HomeView' })
      } else if (tab === 1) {
        this.$router.push({ name: 'GamerView' })
      } else if (tab === 2) {
        this.$router.push({ name: 'FieldView' })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Play, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1F1F1F;
  height: 100%;
}
</style>
