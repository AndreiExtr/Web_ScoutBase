<template>
  <div class="sidebar">
    <h1>SCOUT<span>BASE</span></h1>
    <SectionMenu
      v-for="(section, index) in sections"
      :key="index"
      :icon="section.icon"
      :description="section.description"
      :is-active="activeIndex === index"
      @click="setActive(index)"
    />
  </div>
</template>

<script>
import SectionMenu from '@/components/SectionMenu.vue'

export default {
  name: 'SidebarMenu',
  components: {
    SectionMenu
  },
  data () {
    return {
      activeIndex: null,
      sections: [
        {
          icon: require('@/assets/icons/fire.svg'),
          description: 'Матчи'
        },
        {
          icon: require('@/assets/icons/users.svg'),
          description: 'Игроки'
        },
        {
          icon: require('@/assets/icons/rocket.svg'),
          description: 'Скауты'
        },
        {
          icon: require('@/assets/icons/location.svg'),
          description: 'Площадки'
        }
      ]
    }
  },
  methods: {
    setActive (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$text-color: #fff;
.sidebar{
  width: 250px;
  background-color: #141414;
  padding: 24px 0;

  h1{
    font-weight: 700;
    letter-spacing: .24em;
    font-size:24px;
    text-transform: uppercase;
    color: $text-color;
    margin-bottom: 24px;

    span{
      color: $primary-color;
    }
  }
}
</style>
