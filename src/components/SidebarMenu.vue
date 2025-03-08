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
  // props — это объект, который используется для определения свойств (или данных), которые компонент может принимать от родительского компонента
  props: {
    activeTab: Number
  },
  // data() - метод, который возвращает объект данных
  data () {
    return {
      activeIndex: this.activeTab || 0,
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
  created () {
    const savedIndex = sessionStorage.getItem('activeIndex')
    if (savedIndex !== null) {
      this.activeIndex = parseInt(savedIndex, 10)
    }
  },
  // methods выполняются при вызове, например, при клике на элемент или событии
  methods: {
    setActive (index) {
      this.activeIndex = index
      this.$emit('update:activeTab', index)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$text-color: #fff;
$bg-sidebar-color: #141414;
.sidebar{
  width: 200px;
  background-color: $bg-sidebar-color;
  padding: 24px 0;
  position: fixed;
  height: 100%;

  h1{
    font-weight: 700;
    letter-spacing: .24em;
    font-size:20px;
    text-transform: uppercase;
    color: $text-color;
    margin-bottom: 24px;

    span{
      color: $primary-color;
    }
  }
}
</style>
