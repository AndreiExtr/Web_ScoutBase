<template>
  <div class="sidebar">
    <h1>SCOUT<span>BASE</span></h1>
    <div class="menu-container">
      <SectionMenu
        v-for="(section, index) in sections"
        :key="index"
        :icon="section.icon"
        :description="section.description"
        :is-active="activeIndex === index"
        @click="setActive(index)"
      />
    </div>
    <div class="logon-bt">
      <ButtonUI type="button" text="Выйти" @click="logout" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import SectionMenu from '@/components/SectionMenu.vue'
import ButtonUI from '@/components/ButtonUI.vue'

export default {
  name: 'SidebarMenu',
  components: {
    SectionMenu,
    ButtonUI
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
          icon: require('@/assets/icons/main.svg'),
          description: 'Главная'
        },
        {
          icon: require('@/assets/icons/fire.svg'),
          description: 'Матчи'
        },
        {
          icon: require('@/assets/icons/users.svg'),
          description: 'Игроки'
        },
        {
          icon: require('@/assets/icons/location.svg'),
          description: 'Площадки'
        }
      ]
    }
  },
  setup () {
    const router = useRouter() // useRouter для навигации

    const logout = () => {
      // Очищаются данные из localStorage
      localStorage.removeItem('activeTab')

      router.push({ name: 'LoginView' })
    }

    return {
      logout // Возвращаем метод logout
    }
  },
  watch: {
    // Отслеживание изменений activeTab
    activeTab: {
      handler (newTab) {
        this.activeIndex = newTab // Обновление activeIndex при изменении activeTab
      },
      immediate: true // Выполнение сразу при создании компонента
    }
  },
  // methods выполняются при вызове, например, при клике на элемент или событии
  methods: {
    setActive (index) {
      this.activeIndex = index
      this.$emit('update:activeTab', index)
      localStorage.setItem('activeTab', index)
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$text-color: #fff;
$bg-sidebar-color: #141414;
.sidebar{
  display: flex;
  flex-direction: column;
  align-items: center;
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

  .menu-container {
    flex-grow: 1;
    width: 100%;
  }

  .logon-bt {
    margin-top: auto;
    padding: 10px 0;
    width: 120px;
  }
}
</style>
