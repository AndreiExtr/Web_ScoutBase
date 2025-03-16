<template>
  <div class="player">
    <div class="info">
      <img :src="playerAvatar" alt="Аватар игрока">
      <div class="info__name">
        <p><span>{{ playerLast }}</span> <br>
          {{ playerFirst }} {{ playerMiddle }}</p>
      </div>
      <button @click="toggleEditMode">Редактировать профиль</button>
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
          <input v-model="editForm.position" type="text">
        </label>
        <label>
          Рост/Вес:
          <input v-model="editForm.parameters" type="text">
        </label>
        <label>
          Аватар:
          <input type="file" @change="handleFileUpload" accept="img/*">
          <img v-if="editForm.avatar" :src="editForm.avatar" alt="Выбранный аватар" style="max-width: 100px; margin-top: 10px;">
        </label>
      </form>
      <div class="edit-bt">
        <button type="submit" @click="saveProfile">СОХРАНИТЬ</button>
        <button type="button" @click="toggleEditMode">ОТМЕНА</button>
      </div>
    </div>

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
          <a href="#" :class="{ active: activTabs === 1 }" @click.prevent="setActive(1)">Достижения</a>
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
        <div v-if="activTabs === 1">
          <p>Здесь будут достижения...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
export default {
  name: 'AccountPlayer',
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      isEditMode: false, // Режим редактирования
      editForm: { // Данные для редактирования
        lastName: '',
        firstName: '',
        middleName: '',
        age: '',
        position: '',
        parameters: '',
        avatar: ''
      },
      playerProfile: {
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        age: 25,
        position: 'Нападающий',
        parameters: '180/75',
        avatar: '',
        stats: { speed: 100, pass: 70, dribbling: 90, defense: 11, fitness: 85 },
        matchHistory: [
          { matchDate: '2023-10-01', result: 'Победа', goalsScored: 2, assists: 1, glasses: 8.1 },
          { matchDate: '2023-10-08', result: 'Ничья', goalsScored: 1, assists: 0, glasses: 5.3 }
        ]
      },
      activTabs: 0,
      activeTab: 1,
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
  computed: {
    playerId () {
      return this.playerProfile.id
    },
    playerLast () {
      return this.playerProfile.lastName
    },
    playerFirst () {
      return this.playerProfile.firstName
    },
    playerMiddle () {
      return this.playerProfile.middleName
    },
    playerAvatar () {
      return this.playerProfile.avatar
    },
    playerAge () {
      return this.playerProfile.age
    },
    playerPosition () {
      return this.playerProfile.position
    },
    playerParameters () {
      return this.playerProfile.parameters
    },
    playerStatic () {
      // данные playerStats для графика
      return Object.values(this.playerStats) // Возвращаем массив значений
    },
    playerStats () {
      return this.playerProfile.stats || {}
    },
    playerMatchHistory () {
      return this.playerProfile.matchHistory || []
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
    }
  },
  watch: {
    playerStatic (newParams) {
      // Когда параметры изменяются, обновляются данные для графика
      this.chartSeries[0].data = newParams
    }
  },
  methods: {
    ...mapActions(['updatePlayerProfile']),
    setActive (tab) {
      this.activTabs = tab
      sessionStorage.setItem('activTabs', tab)
    },
    toggleEditMode () {
      this.isEditMode = !this.isEditMode
      if (this.isEditMode) {
      // Заполняем форму текущими данными
        this.editForm = { ...this.playerProfile }
      }
    },
    async saveProfile () {
      try {
        // Обновляем данные профиля
        this.playerProfile = { ...this.editForm }
        // Сохраняем данные в localStorage
        localStorage.setItem('playerProfile', JSON.stringify(this.playerProfile))
        this.isEditMode = false
      } catch (error) {
        console.error('Ошибка при сохранении профиля:', error)
      }
    },
    handleFileUpload (event) {
      const file = event.target.files[0] // Получаем выбранный файл
      if (file) {
        const reader = new FileReader() // Создаем FileReader для чтения файла
        reader.onload = (e) => {
          // Сохраняем Data URL в editForm.avatar
          this.editForm.avatar = e.target.result
        }
        reader.readAsDataURL(file) // Читаем файл как Data URL
      }
    }
  },
  mounted () {
    // Загружаем данные профиля из localStorage
    const savedProfile = localStorage.getItem('playerProfile')
    if (savedProfile) {
      this.playerProfile = JSON.parse(savedProfile)
    }

    // Инициализируем график с данными playerStats
    this.chartSeries[0].data = Object.values(this.playerProfile.stats)
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;
.player{
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
          font-size: 20px;
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
