<template>
  <div class="main" v-if="activeTab === 1 && showPlayerView">
    <div class="main__header">
      <ButtonUI
        :icon="require('@/assets/icons/arrow-left.svg')"
        :style="{ width: 'auto' }"
        @click="closeGamerView" />
      <h1>Игрок</h1>
    </div>
    <div class="main__player">
      <div class="info">
        <img :src="playerAvatar" alt="Аватар игрока">
        <div class="info__name">
          <p><span>{{ playerLast }}</span> <br>
            {{ playerFirst }} {{ playerMiddle }}</p>
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
              <span>{{ playerGoals }}</span>
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
            </table>
          </div>
          <div v-if="activTabs === 1">
            <p>Здесь будут достижения...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue3-apexcharts'
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'PlayerView',
  components: {
    ButtonUI,
    apexchart: VueApexCharts
  },
  data () {
    return {
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
    ...mapGetters(['selectedPlayer']),
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
      return this.selectedPlayer.avatar
    },
    playerAge () {
      return this.selectedPlayer.age
    },
    playerPosition () {
      return this.selectedPlayer.position
    },
    playerGoals () {
      return this.selectedPlayer.goals
    },
    playerParameters () {
      return this.selectedPlayer.parameters
    },
    playerStatic () {
      // данные playerStats для графика
      return Object.values(this.playerStats) // Возвращаем массив значений
    },
    playerStats () {
      return this.selectedPlayer.stats || {}
    },
    playerMatchHistory () {
      console.log('История матчей:', this.selectedPlayer.matchHistory)
      return this.selectedPlayer.matchHistory || []
    }
  },
  watch: {
    playerStatic (newParams) {
      // Когда параметры изменяются, обновляются данные для графика
      this.chartSeries[0].data = newParams
    }
  },
  methods: {
    closeGamerView () {
      sessionStorage.removeItem('selectedPlayer')
      this.$router.push({ name: 'GamerView' })
    },
    setActive (tab) {
      this.activTabs = tab
      sessionStorage.setItem('activTabs', tab)
    }
  },
  mounted () {
    const savedPlayer = sessionStorage.getItem('selectedPlayer')
    if (!savedPlayer) {
      this.$router.push({ name: 'GamerView' })
    } else {
      this.$store.commit('setSelectedPlayer', JSON.parse(savedPlayer))
    }

    // Инициализируем график с данными playerStats при монтировании
    this.chartSeries[0].data = this.playerStatic
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 200px;
  width: calc(100% - 200px);
  gap: 16px;

  &__header{
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background-color: #1f1f1f;
    height: 80px;
    width: 100%;
    box-shadow: 10px 5px 24px rgba(0, 0, 0, 0.315);
    z-index: 5;

    h1{
      text-align: left;
      width: 100%;
      font-size: 24px;
      font-weight: 700;
      color: $text-color;
    }
  }

  &__player{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: calc(100vh - 100px);
    padding: 0 16px 16px 16px;
    margin-top: 100px;

    .info{
      width: 100%;
      min-height: 250px;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
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
      background-color: #1a1a1a;
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
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
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
          }
        }
      }
    }
  }
}
</style>
