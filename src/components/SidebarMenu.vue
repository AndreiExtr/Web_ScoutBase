<!-- <template>
  <div class="sidebar">
    <h1>SCOUT<span>BASE</span></h1>
    <div class="menu-container">
      <SectionMenu
        v-for="(section, index) in filteredSections"
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
// import { useRouter } from 'vue-router'

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
    activeTab: {
      type: Number,
      default: 0 // По умолчанию активная вкладка — "Главная"
    },
    isOrganizer: {
      type: Boolean,
      default: false
    }
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
    // const router = useRouter() // useRouter для навигации

    const logout = () => {
      // Очищаются данные из localStorage и sessionStorage
      localStorage.removeItem('activeTab')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('currentRole')
      sessionStorage.removeItem('activeTab')
      sessionStorage.removeItem('activTabs')
      sessionStorage.removeItem('activeTabs')

      // router.push({ name: 'LoginView' })
      window.location.replace('/')

      // // Перезагружаем страницу через небольшой таймаут
      // setTimeout(() => {
      //   window.location.reload()
      // }, 200)
    }

    return {
      logout
    }
  },
  watch: {
    activeTab: {
      handler (newTab) {
        this.activeIndex = newTab
      },
      immediate: true
    }
  },
  // methods выполняются при вызове, например, при клике на элемент или событии
  methods: {
    setActive (index) {
      this.activeIndex = index
      this.$emit('update:activeTab', index)
      localStorage.setItem('activeTab', index)
    }
  },
  computed: {
    filteredSections () {
      if (this.isOrganizer) {
        return this.sections
      } else {
        return this.sections.filter(section => section.description !== 'Площадки')
      }
    }
  }
}
</script> -->
<template>
  <div class="sidebar">
    <h1>SCOUT<span>BASE</span></h1>
    <div class="menu-container">
      <SectionMenu
        v-for="(section, index) in filteredSections"
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
import SectionMenu from '@/components/SectionMenu.vue'
import ButtonUI from '@/components/ButtonUI.vue'

export default {
  name: 'SidebarMenu',
  components: {
    SectionMenu,
    ButtonUI
  },
  props: {
    activeTab: {
      type: Number,
      default: 0
    },
    isOrganizer: {
      type: Boolean,
      default: false
    }
  },
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
  watch: {
    activeTab: {
      handler (newTab) {
        this.activeIndex = newTab
      },
      immediate: true
    }
  },
  methods: {
    setActive (index) {
      this.activeIndex = index
      this.$emit('update:activeTab', index)
    },
    logout () {
      localStorage.removeItem('activeTab')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('currentRole')
      sessionStorage.removeItem('activeTab')
      sessionStorage.removeItem('activTabs')
      sessionStorage.removeItem('activeTabs')

      // Перенаправляется на страницу входа и перезагружается
      window.location.replace('/')
    }
  },
  computed: {
    filteredSections () {
      if (this.isOrganizer) {
        return this.sections
      } else {
        return this.sections.filter(section => section.description !== 'Площадки') // Скрывается вкладка "Площадки" для игрока
      }
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
