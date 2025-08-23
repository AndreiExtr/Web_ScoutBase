<!-- <template>
  <SidebarMenu
    :isOrganizer="isOrganizer"
    :activeTab="activeTab"
    @update:activeTab="setActiveTab" />
  <router-view />
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
      activeTab: 0,
      isOrganizer: false
    }
  },
  computed: {
    currentRole () {
      return localStorage.getItem('currentRole')
    }
  },
  watch: {
    currentRole: {
      handler (newRole) {
        this.isOrganizer = newRole === 'organizer' // Обновляем isOrganizer при изменении роли
      },
      immediate: true
    }
  },
  mounted () {
    const savedTab = sessionStorage.getItem('activeTab')
    if (savedTab !== null) {
      this.activeTab = parseInt(savedTab)
    } else {
      sessionStorage.setItem('activeTab', 0) // По умолчанию вкладка 0
    }
  },
  methods: {
    setActiveTab (tab) {
      this.activeTab = tab
      sessionStorage.setItem('activeTab', tab)

      // Переход на соответствующую страницу
      if (tab === 0) this.$router.push({ name: 'MainView' })
      if (tab === 1) this.$router.push({ name: 'MatchList' })
      if (tab === 2) this.$router.push({ name: 'GamerList' })
      if (tab === 3) this.$router.push({ name: 'FieldList' })
    }
  }
}
</script> -->
<template>
  <SidebarMenu
    :isOrganizer="isOrganizer"
    :activeTab="activeTab"
    @update:activeTab="setActiveTab" />
  <router-view />
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
      activeTab: parseInt(localStorage.getItem('activeTab')) || 0,
      isOrganizer: localStorage.getItem('currentRole') === 'organizer'
    }
  },
  mounted () {
    // Восстанавливаем активную вкладку при загрузке
    const savedTab = sessionStorage.getItem('activeTab')
    if (savedTab !== null) {
      this.activeTab = parseInt(savedTab)
    } else {
      sessionStorage.setItem('activeTab', 0)
    }
  },
  methods: {
    setActiveTab (tab) {
      this.activeTab = tab
      sessionStorage.setItem('activeTab', tab)

      // Переход на соответствующую страницу
      if (tab === 0) this.$router.push({ name: 'MainView' })
      if (tab === 1) this.$router.push({ name: 'MatchList' })
      if (tab === 2) this.$router.push({ name: 'GamerList' })
      if (tab === 3) this.$router.push({ name: 'FieldList' })
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
