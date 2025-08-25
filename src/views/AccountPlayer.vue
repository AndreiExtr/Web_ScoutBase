<template>
  <div class="content-player">
    <!-- Всплывающее сообщение -->
    <AlertMessage v-if="showAlert" :message="alertMessage" />
    <div class="info">
      <img :src="playerAvatar" alt="Аватар игрока">
      <div class="info__name">
        <p><span>{{ playerLast }}</span> <br>
          {{ playerFirst }} {{ playerMiddle }}</p>
      </div>
      <div class="actions">
        <button type="add" @click="addToPlayerList">{{ isPlayerAdded ? 'СКРЫТЬ ПРОФИЛЬ' : 'ПРИСОЕДИНИТЬСЯ К ИГРОКАМ' }}</button>
        <ButtonUI
          :icon="require('@/assets/icons/more.svg')"
          :style="{ width: '40px' }"
          @click="toggleMenu" />
      </div>
    </div>

    <!-- Выпадающее меню -->
    <div v-if="isMenuOpen" class="dropdown-menu">
      <div class="menu-item edit" @click="editItem">
        <img :src="require('@/assets/icons/edit.svg')" alt="Редактировать" class="menu-icon">
        <span>Редактировать</span>
      </div>
      <div class="menu-item delete" @click="deleteItem">
        <img :src="require('@/assets/icons/trash.svg')" alt="Удалить" class="menu-icon">
        <span>Удалить</span>
      </div>
    </div>

    <!-- Подложка для затемнения фона -->
    <div class="overlay" :class="{ active: isEditMode }" @click="toggleEditMode"></div>

    <!-- Форма редактирования -->
    <div class="edit-form" :class="{ open: isEditMode }">
      <h3>Редактирование профиля</h3>
      <form @submit.prevent="saveProfile">
        <label>
          Фамилия:
          <input v-model="editForm.lastName" type="text">
        </label>
        <label>
          Имя:
          <input v-model="editForm.firstName" type="text">
        </label>
        <label>
          Отчество:
          <input v-model="editForm.middleName" type="text">
        </label>
        <label>
          Возраст:
          <input v-model="editForm.age" type="number">
        </label>
        <label>
          Позиция:
          <div class="custom-select" @click="toggleDropdown">
            <div class="selected-option">
              {{ editForm.position || 'Выберите позицию' }}
            </div>
            <ul class="dropdown-list" :class="{'show': isDropdownOpen}">
              <li v-for="pos in positions" :key="pos" @click="selectPosition(pos)">
                {{ pos }}
              </li>
            </ul>
          </div>
        </label>
        <label>
          Рост/Вес:
          <input
            v-model="editForm.parameters"
            v-mask="'###/###'"
            type="text"
            placeholder="___/___">
        </label>
        <label>
          Аватар:
          <input type="file" @change="handleFileUpload" accept="img/*">
          <img v-if="editForm.avatar" :src="editForm.avatar" alt="Выбранный аватар" style="max-width: 100px; margin-top: 10px;">
        </label>
      </form>
      <div class="edit-bt">
        <button type="submit" @click="saveProfile">СОХРАНИТЬ</button>
        <button type="button" @click="editItem">ОТМЕНА</button>
      </div>
    </div>
    <!-- Форма редактирования -->

    <div class="content">
      <div class="parameters">
        <h3>Параметры</h3>
        <div class="parameters__block1">
          <div class="square">
            <p>возраст</p>
            <span>{{ playerAge }}</span>
          </div>
          <div class="square">
            <p>позиция</p>
            <span>{{ playerPosition }}</span>
          </div>
          <div class="square">
            <p>рост/вес</p>
            <span>{{ playerParameters }}</span>
          </div>
          <div class="square">
            <p>голы</p>
            <span>{{ totalGoals }}</span>
          </div>
        </div>
        <div class="parameters__block2">
          <apexchart
            width="100%"
            height="290"
            type="radar"
            :options="chartOptions"
            :series="chartSeries">
          </apexchart>
        </div>
      </div>
      <div class="matches">
        <div class="matches__tabs">
          <a href="#" :class="{ active: activTabs === 0 }" @click.prevent="setActive(0)">История матчей</a>
          <a href="#" :class="{ active: activTabs === 1 }" @click.prevent="setActive(1)">Заявки на матч</a>
        </div>
        <div class="matches__table" v-if="activTabs === 0">
          <table class="match-history">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Результат</th>
                <th>Голы</th>
                <th>Ассисты</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="match in playerMatchHistory" :key="match.date">
                <td>{{ match.matchDate }}</td>
                <td>{{ match.result }}</td>
                <td>{{ match.goalsScored }}</td>
                <td>{{ match.assists }}</td>
                <td>{{ match.glasses }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">ИТОГО</td>
                <td>{{ totalGoals }}</td>
                <td>{{ totalAssists }}</td>
                <td>{{ totalPoints }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div v-if="activTabs === 1" class="matches__list">
          <div class="rows">
            <MatchCard
              v-for="match in myMatches"
              :key="match.id"
              :matchId="match.id"
              :date="match.date"
              :field="match.field"
              :price="match.price"
              :time="match.time"
              :placesLeft1="match.placesLeft1"
              :placesLeft2="match.placesLeft2"
              :location="match.location"
              :organizer="match.organizer"
              :placeIcon="placeIcon"
              :addressIcon="addressIcon"
              @match-card-click="openMatchView(match)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { mask } from 'vue-the-mask'
import VueApexCharts from 'vue3-apexcharts'
import MatchCard from '@/components/MatchCard.vue'
import ButtonUI from '@/components/ButtonUI.vue'
import AlertMessage from '@/components/AlertMessage.vue'
export default {
  directives: { mask },
  name: 'AccountPlayer',
  components: {
    apexchart: VueApexCharts,
    MatchCard,
    ButtonUI,
    AlertMessage
  },
  data () {
    return {
      placeIcon: require('@/assets/icons/users.svg'),
      addressIcon: require('@/assets/icons/location.svg'),
      isDropdownOpen: false,
      positions: ['ГП', 'ЦЛЗ', 'ЦПЗ', 'ЛЗ', 'ПЗ', 'ППЗ', 'ЛПЗ', 'ЦЛПЗ', 'ЦППЗ', 'ЦНП'],
      isPlayerAdded: false,
      isEditMode: false,
      showAlert: false,
      alertMessage: '',
      isMenuOpen: false,
      defaultAvatar: require('@/assets/img/player/default.png'),
      editForm: {
        lastName: '',
        firstName: '',
        middleName: '',
        age: '',
        position: '',
        parameters: '',
        avatar: ''
      },
      selectedPlayer: {
        id: 21,
        lastName: '<фамилия>',
        firstName: '<имя>',
        middleName: '<отчество>',
        age: 0,
        goals: 0,
        position: 'не выбран',
        parameters: 'не выбран',
        avatar: '',
        stats: { speed: 0, pass: 0, dribbling: 0, defense: 0, fitness: 0 },
        matchHistory: [
          { matchDate: '2023-10-01', result: 'Победа', goalsScored: 2, assists: 1, glasses: 8.1 },
          { matchDate: '2023-10-08', result: 'Ничья', goalsScored: 1, assists: 0, glasses: 5.3 }
        ]
      },
      activTabs: 0,
      // activeTab: 1,
      showPlayerView: true,
      chartOptions: {
        chart: {
          type: 'radar',
          toolbar: { show: true }
        },
        xaxis: {
          categories: ['Скорость', 'Пас', 'Дриблинг', 'Защита', 'Физика'],
          labels: {
            show: true,
            style: {
              colors: ['#a8a8a8'],
              fontSize: '12px',
              fontFamily: 'Arial'
            }
          }
        },
        fill: {
          opacity: 0.6
        },
        markers: {
          size: 6,
          colors: '#13e66e',
          strokeWidth: 2,
          shape: 'circle',
          radius: 2
        }
      },
      chartSeries: [
        {
          name: 'Показатели',
          data: []
        }
      ]
    }
  },
  created () {
    const savedTab = sessionStorage.getItem('activTabs')
    if (savedTab !== null) {
      this.activTabs = parseInt(savedTab)
    }
  },
  computed: {
    ...mapGetters(['getMatches', 'getJoinedMatches', 'selectedPlayer']),
    playerId () {
      return this.selectedPlayer.id
    },
    playerLast () {
      return this.selectedPlayer.lastName
    },
    playerFirst () {
      return this.selectedPlayer.firstName
    },
    playerMiddle () {
      return this.selectedPlayer.middleName
    },
    playerAvatar () {
      return this.selectedPlayer.avatar || this.defaultAvatar
    },
    playerGoals () {
      return this.selectedPlayer.goals
    },
    playerAge () {
      return this.selectedPlayer.age
    },
    playerPosition () {
      return this.selectedPlayer.position
    },
    playerParameters () {
      return this.selectedPlayer.parameters
    },
    playerStatic () {
      // данные playerStats для графика визуализации
      return Object.values(this.playerStats) // Возвращаем массив значений
    },
    playerStats () {
      return this.selectedPlayer.stats || {}
    },
    playerMatchHistory () {
      return this.selectedPlayer.matchHistory || []
    },
    totalGoals () {
      return this.playerMatchHistory.reduce((sum, match) => sum + (match.goalsScored || 0), 0)
    },
    totalAssists () {
      return this.playerMatchHistory.reduce((sum, match) => sum + (match.assists || 0), 0)
    },
    totalPoints () {
      const sum = this.playerMatchHistory.reduce((sum, match) => sum + (match.glasses || 0), 0)
      return parseFloat(sum.toFixed(1))
    },
    myMatches () {
      const joinedMatchIds = this.getJoinedMatches.map(m => m.matchId)
      return this.getMatches.filter(match => joinedMatchIds.includes(match.id))
    }
  },
  watch: {
    playerStatic (newParams) {
      // Когда параметры изменяются, обновляются данные для графика
      this.chartSeries[0].data = newParams
    }
  },
  methods: {
    ...mapMutations(['setSelectedMatch']),
    ...mapActions(['updateselectedPlayer', 'addPlayer', 'removePlayer']),
    addToPlayerList () {
      const player = {
        id: this.playerId,
        lastName: this.playerLast,
        firstName: this.playerFirst,
        middleName: this.playerMiddle,
        age: this.playerAge,
        goals: this.totalGoals,
        position: this.playerPosition,
        parameters: this.playerParameters,
        avatar: this.playerAvatar,
        stats: this.playerStats,
        matchHistory: this.playerMatchHistory
      }

      // Проверяем, что все поля заполнены, если нет, то показываем предупреждение
      if (this.selectedPlayer.lastName === '<фамилия>' || this.selectedPlayer.firstName === '<имя>' || this.selectedPlayer.middleName === '<отчество>' || this.selectedPlayer.age < 18 || this.selectedPlayer.position === 'не выбран' || this.selectedPlayer.parameters === 'не выбран') {
        this.isPlayerAdded = false
        this.showAlert = true
        this.alertMessage = 'Заполните все необходимые данные для публикации профиля'

        setTimeout(() => {
          this.showAlert = false
        }, 2000)
        return
      }

      if (!this.isPlayerAdded) {
        // Добавляем игрока в список
        const isPlayerExists = this.$store.getters.getPlayers.some(p => p.id === player.id)
        if (!isPlayerExists) {
          this.$store.dispatch('addPlayer', player) // Добавляем игрока через Vuex
          this.isPlayerAdded = true
          localStorage.setItem('addProfile', 'true')
          localStorage.setItem('players', JSON.stringify(this.$store.getters.getPlayers))
          this.showAlert = true
          this.alertMessage = 'Вы успешно добавлены в список игроков!'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
        } else {
          this.showAlert = true
          this.alertMessage = 'Вы уже в списке игроков!'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
        }
      } else {
        // Удаляем игрока из списка
        this.$store.dispatch('removePlayer', player.id) // Удаляем игрока через Vuex
        this.isPlayerAdded = false
        localStorage.setItem('addProfile', 'false')
        localStorage.setItem('players', JSON.stringify(this.$store.getters.getPlayers))
        this.showAlert = true
        this.alertMessage = 'Ваш профиль скрыт из списка игроков.'

        setTimeout(() => {
          this.showAlert = false
        }, 2000)
      }
    },
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectPosition (pos) {
      this.editForm.position = pos
      this.isDropdownOpen = false
    },
    setActive (tab) {
      this.activTabs = tab
      sessionStorage.setItem('activTabs', tab)
    },
    editItem () {
      this.isMenuOpen = false // Закрываем меню
      this.isEditMode = !this.isEditMode
      if (this.isEditMode) {
      // Заполняем форму текущими данными
        this.editForm = { ...this.selectedPlayer }
      }
    },
    async saveProfile () {
      try {
        if (
          !this.editForm.lastName ||
          !this.editForm.firstName ||
          !this.editForm.middleName ||
          this.editForm.position === 'не выбран' ||
          this.editForm.parameters === '___/___' ||
          !this.editForm.parameters
        ) {
          this.showAlert = true
          this.alertMessage = 'Пожалуйста, заполните все обязательные поля.'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
          return
        }

        if (this.editForm.age <= 0) {
          this.showAlert = true
          this.alertMessage = 'Введите корректный возраст.'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
          return
        } else if (this.editForm.age < 18 && this.editForm.age >= 14) {
          this.showAlert = true
          this.alertMessage = 'Только с 18 лет можно участвовать в футбольных турнирах.'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
          return
        } else if (this.editForm.age < 14) {
          this.showAlert = true
          this.alertMessage = 'Возраст должен быть от 14 лет.'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
          return
        } else if (this.editForm.age >= 45) {
          this.showAlert = true
          this.alertMessage = 'Не пора ли Вам на пенсию? :)'
          setTimeout(() => {
            this.showAlert = false
          }, 2000)
          return
        }
        // Обновляются данные профиля
        this.selectedPlayer = { ...this.editForm }
        localStorage.setItem('selectedPlayer', JSON.stringify(this.selectedPlayer))

        // Обновляем состояние Vuex
        this.$store.dispatch('updatePlayer', this.selectedPlayer)

        this.isEditMode = false
      } catch (error) {
        console.error('Ошибка при сохранении профиля:', error)
      }
    },
    handleFileUpload (event) {
      const file = event.target.files[0] // Получаем выбранный файл
      if (file) {
        const reader = new FileReader() // Создается FileReader для чтения файла
        reader.onload = (e) => {
          // Сохраняется Data URL в editForm.avatar
          this.editForm.avatar = e.target.result
        }
        reader.readAsDataURL(file) // Читаем файл как Data URL
      }
    },
    openMatchView (match) {
      // Сохранение ID матча и дополнительные данные в sessionStorage
      sessionStorage.setItem('selectedMatchId', match.id)
      sessionStorage.setItem('selectedMatch', JSON.stringify(match))

      this.setSelectedMatch(match) // Сохранение выбранного матча в хранилище
      this.$router.push({
        name: 'MatchView',
        params: { matchId: match.id },
        query: { from: 'AccountPlayer' } // Указываем, откуда пришли
      })
    },
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen // Переключаем видимость меню
    },
    deleteItem () {
      this.isMenuOpen = false
    }
  },
  mounted () {
    // Загружаем данные профиля из localStorage
    const savedProfile = localStorage.getItem('selectedPlayer')
    if (savedProfile) {
      this.selectedPlayer = JSON.parse(savedProfile)
      // Сохранение игрока в store сразу после загрузки
      this.$store.commit('setCurrentPlayer', this.selectedPlayer)
    }

    // Инициализируем график с данными playerStats
    this.chartSeries[0].data = Object.values(this.selectedPlayer.stats)

    // Проверяем, добавлен ли игрок в список
    const isPlayerExists = this.$store.getters.getPlayers.some(p => p.id === this.playerId)
    this.isPlayerAdded = isPlayerExists

    // Загружаем состояние isPlayerAdded из localStorage
    const addProfile = localStorage.getItem('addProfile')
    if (addProfile !== null) {
      this.isPlayerAdded = addProfile === 'true' // Преобразуем строку в булевое значение
    }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;
.content-player{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: 100vh;
    margin-left: 200px;
    width: calc(100% - 200px);
    padding: 16px;

    .info{
      position: relative;
      width: 100%;
      min-height: 250px;
      padding: 24px;
      border-radius: 8px;
      background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("@/assets/img/player/background.png");
      background-repeat:no-repeat;
      background-size: cover ;
      background-position: center;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 24px;

      img{
        width: 140px;
        height: 140px;
        border-radius: 100px;
        object-fit: cover;
      }

      p{
        font-size: 20px;
        color: $text-color;
        text-align: left;
        line-height: 140%;

        span{
          font-size: 32px;
          color: $text-color;
          font-weight: 700;
        }
      }
    }

    .actions{
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 24px;
      right: 24px;
      gap: 16px;

      button[type="add"] {
        border: 1px solid $primary-color;
        color: $primary-color;
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background-color: $primary-color;
          color: $bg-color;
        }
      }
    }

    .dropdown-menu {
      position: absolute;
      top: 88px;
      right: 40px;
      background-color: $text-color;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      overflow: hidden;

      .menu-item {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }

        .menu-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        &.delete {
          color: #e65613; // Красный цвет для текста
          .menu-icon {
            filter: brightness(0) saturate(100%) invert(39%) sepia(95%) saturate(1352%) hue-rotate(344deg) brightness(91%) contrast(91%);
          }
        }
      }
    }

    .content{
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      gap: 16px;

      .parameters {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        padding: 16px;
        background-color: #141414;
        border-radius: 8px;

        h3 {
          font-size: 20px;
          color: #fff;
          font-weight: 700;
          text-align: left;
          width: 100%;
        }

        .parameters__block1,
        .parameters__block2 {
          width: 100%;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .parameters__block1 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 16px;
          height: 100%;

          @media (max-width: 1300px) {
            grid-template-columns: repeat(1, 4fr);
            grid-template-rows: repeat(4, 1fr);
          }
        }

        .square {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #1f1f1f;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          width: 100%;
          height: 100%;
        }

        p{
          color: #fff;
          font-size: 16px;
          font-weight: 300;
        }

        span {
          color: #13e66e;
          font-weight: bold;
          font-size: 16px;
          margin-top: 4px;
        }

        .parameters__block2 {
          height: 100%;
        }

        .chart {
          width: 200px;
          height: 200px;
          background-color: lightgray;
        }
      }

      .matches{
        width: 100%;
        height: 100%;
        background-color: #141414;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &__tabs {
          display: flex;
          flex-direction: row;
          gap: 32px;

          a{
            text-decoration: none;
            color: #666;
            font-size: 16px;
            position: relative;

            &.active {
              color: $primary-color;
            }
          }
        }

        &__table{
          height: 300px;
          overflow-y: auto;
          flex-grow: 1;
          border: 1px solid #313131;

          /* Стили для скроллбара */
          &::-webkit-scrollbar {
            width: 8px; /* Ширина скроллбара */
          }

          &::-webkit-scrollbar-track {
            background: #1f1f1f; /* Цвет трека */
            border-radius: 4px;
          }

          &::-webkit-scrollbar-thumb {
            background: #666; /* Цвет ползунка */
            border-radius: 4px;

            &:hover {
              background: #888; /* Цвет ползунка при наведении */
            }
          }

          .match-history {
            width: 100%;
            border-collapse: collapse;

            tr:first-child th {
              border-top: none; /* Убираем верхний бордер для ячеек первой строки */
            }

            th, td {
              border-top: 1px solid #313131;
              border-bottom: 1px solid #313131;
              border-right: 1px solid #313131;
              padding: 8px;
              text-align: center;
              font-size: 14px;
              color: #666;
              font-weight: 300;
            }

            td{
              color: #ffffff;
            }

            tr{
              height: 48px;
              &:hover{
                background-color: #1f1f1f;
              }
            }

            th {
              position: sticky;
              top: 0;
              z-index: 1;
              background-color: #1f1f1f;
            }

            tfoot {
              position: sticky;
              bottom: 0;
              z-index: 1;
            }

            tfoot td {
              font-weight: 600;
              background-color: #222;
              color: #13e66e;
            }
          }
        }

        &__list{
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          gap: 16px;

          .rows{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: flex-start;
            flex-flow: wrap;
            gap: 16px;
            flex-grow: 1;
            height: 100%;

            @media (max-width: 1024px) {
              height: auto;
            }

            .match-card{
              flex: 0 0 calc(33.33333% - 12px);

              @media (max-width: 1440px) {
                flex: 0 0 calc(50% - 12px);
              }

              @media (max-width: 1300px) {
                flex-basis: calc(100% - 0px);
              }
            }
          }
        }
      }

      .contacts{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: 100%;
        max-width: 300px;
        margin: 0 auto;
        padding: 16px;
        background-color: #141414;
        border-radius: 8px;

        h3 {
          font-size: 20px;
          color: #fff;
          font-weight: 700;
          text-align: left;
          width: 100%;
        }
      }
    }

    /* Основные стили для модалки */
    .edit-form {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 24px;
      top: 0;
      right: 0;
      width: 400px;
      height: 100vh;
      padding: 20px;
      background-color: $bg-color;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
      overflow-y: auto;
      transition: transform 0.3s ease-in-out;
      transform: translateX(100%);
      z-index: 30;

      &.open {
        transform: translateX(0);
      }

      h3 {
        margin-top: 0;
        font-size: 24px;
        color: $text-color;
        text-align: left;
      }

      label {
        display: block;
        margin-bottom: 15px;
        font-size: 14px;
        color: $text-label;
        text-align: left;

        input {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          background-color: #1F1F1F;
          border: 1px solid #3a4149;
          color: $text-color;
          border-radius: 8px;
          font-size: 14px;

          &:focus {
            border-color: $primary-color;
          }

          &:hover{
            border: 1px solid $primary-color;
          }
        }

        .custom-select {
          position: relative;
          width: 100%;
          margin-top: 5px;
          background-color: #1F1F1F;
          border: 1px solid #3a4149;
          color: #fff;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;

          &:focus {
            border-color: $primary-color;
          }

          &:hover{
            border: 1px solid $primary-color;
          }

          .selected-option {
            padding: 10px;
          }

          .dropdown-list {
            position: absolute;
            width: 100%;
            background-color: #1F1F1F;
            border: 1px solid #3a4149;
            border-radius: 8px;
            margin-top: 4px;
            list-style: none;
            padding: 0;
            z-index: 10;
            display: none;
            max-height: 250px;
            overflow-y: auto;

            &.show {
              display: block;
            }

            li {
              padding: 12px;
              cursor: pointer;
              background-color: transparent;
              border: none;
              text-align: left;

              &:hover {
                background-color: #3a4149;
              }
            }
          }
        }
      }
      .edit-bt{
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 16px;

        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;

          &[type="submit"] {
            border: 1px solid $primary-color;
            color: $primary-color;

            &:hover {
              background-color: $primary-color;
              color: $bg-color;
            }
          }

          &[type="button"] {
            background-color: $bg-color;
            color: $text-color;

            &:hover {
              background-color: #bbb;
              color: $bg-color;
            }
          }
        }
      }
    }

    /* Затемнение фона */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 10;
      display: none;
      transition: opacity 0.3s ease-in-out;

      &.active {
        display: block;
      }
    }
  }
</style>
