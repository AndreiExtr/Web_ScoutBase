<template>
  <div class="main" v-if="activeTab === 1 && showMatchView">
    <div class="main__header">
      <ButtonUI
        :icon="require('@/assets/icons/arrow-left.svg')"
        :style="{ width: 'auto' }"
        @click="closeMatchView" />
      <h1>Матч</h1>
    </div>
    <div class="main__match">
      <div class="main__match-content">
        <div class="info">
          <img :src="matchField" alt="Поле" class="info__field">
          <div class="title-top">
            <p> <span style="font-size: 20px;font-weight: 700;">{{ matchDate }}</span><br> {{ matchTime }}</p>
          </div>
          <div class="title-center">
            <div class="shield-1-group">
              <img class="shield-1" alt="" src="@/assets/img/shield1.png">
              <p style="font-size: 24px;">{{ matchPlacesLeft1 }}</p>
            </div>
            <div class="team">
              <p>VS</p>
            </div>
            <div class="shield-2-group">
              <img class="shield-2" alt="" src="@/assets/img/shield2.png">
              <p style="font-size: 24px;">{{ matchPlacesLeft2 }}</p>
            </div>
            </div>
            <div class="title-bottom">
              <p v-if="matchLocation" style="font-size: 16px; font-weight: 400;">
                {{ matchLocation.split(',')[0] }}<br>
                {{ matchLocation.split(',').slice(1).join(',') }}
              </p>
              <p v-else style="font-size: 20px; font-weight: 400;">
                Данные загружаются...
              </p>
              <div class="price">
                <p style="font-size: 32px;font-weight: 700;">{{ matchPrice }} ₽</p>
              </div>
            </div>
        </div>
        <div class="field">
          <img :src="require('@/assets/icons/gate-left.svg')" class="gate-left" alt="gate-left" />
          <img :src="require('@/assets/icons/gate-right.svg')" class="gate-right" alt="gate-right" />
          <img :src="require('@/assets/icons/center.svg')" class="center" alt="center" />
          <img :src="require('@/assets/icons/line.svg')" class="line" alt="line" />
          <img :src="require('@/assets/icons/circle-left-top.svg')" class="circle-left-top" alt="circle-left-top" />
          <img :src="require('@/assets/icons/circle-left-bottom.svg')" class="circle-left-bottom" alt="circle-left-bottom" />
          <img :src="require('@/assets/icons/circle-right-top.svg')" class="circle-right-top" alt="circle-right-top" />
          <img :src="require('@/assets/icons/circle-right-bottom.svg')" class="circle-right-bottom" alt="circle-right-bottom" />

          <div class="grid">
            <div v-for="(cell, index) in getTeam1Cells"
                :key="cell.col + '-' + cell.row"
                class="cell"
                :class="{ 'disabled-cell': userHasJoined || cell.player }"
                :style="`grid-column: ${cell.col}; grid-row: ${cell.row};`">

              <img  v-if="cell.player || index >= matchPlacesLeft1" alt="player" :src="require(`@/assets/img/${cell.img}`)" />

              <ButtonUI
                v-if="!cell.player && index < matchPlacesLeft1"
                text="+"
                @click="openModal(cell)"
                class="add-player-btn" />

              <span class="badge">{{ cell.badge }}</span>
            </div>

            <div v-for="(cell, index) in getTeam2Cells"
                :key="cell.col + '-' + cell.row"
                class="cell"
                :class="{ 'disabled-cell': userHasJoined || cell.player }"
                :style="`grid-column: ${cell.col}; grid-row: ${cell.row};`">

              <img v-if="cell.player || index >= matchPlacesLeft2" alt="player" :src="require(`@/assets/img/${cell.img}`)" />

              <ButtonUI
                v-if="!cell.player && index < matchPlacesLeft2"
                text="+"
                @click="openModal(cell)"
                class="add-player-btn" />
              <span class="badge">{{ cell.badge }}</span>
            </div>
            <!-- Модальное окно -->
            <div v-if="showModal" class="modal-overlay">
              <div class="modal-content">
                <img :src="require(`@/assets/img/${selectedCell.img}`)" alt="shield" class="modal-icon" />
                <h2>{{ selectedCell.badge }}</h2>

                <ButtonUI text="Присоединиться и оплатить" class="join-btn" @click="joinPlayer()" />
                <ButtonUI text="Отмена" class="cancel-btn" @click="closeModal" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="organizer">
        <img class="organizer__img" alt="" src="@/assets/img/avatar.png">
        <p><strong style="font-size: 20px;">Организатор:</strong></p>
        <p v-if="organizerName" style="margin-bottom: 24px;">
          {{ organizerName.split(' ')[0] }}<br> <!-- Фамилия -->
          <span>{{ organizerName.split(' ')[1] }} {{ organizerName.split(' ')[2] }}</span><!-- Имя и Отчество -->
        </p>
        <p v-else>
          Данные загружаются...
        </p>
        <p><strong style="font-size: 20px;">Должность:</strong></p>
        <p class="position">{{ organizerPosition }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'MatchView',
  components: {
    ButtonUI
  },
  data () {
    return {
      joinedMatches: JSON.parse(localStorage.getItem('joinedMatches')) || [],
      activeTab: 1,
      cells: [
        // Игроки 1
        { col: 1, row: 4, img: 'shield1.png', badge: 'ГП', player: false },
        { col: 2, row: 3, img: 'shield1.png', badge: 'ЦЛЗ', player: false },
        { col: 2, row: 5, img: 'shield1.png', badge: 'ЦПЗ', player: false },
        { col: 2, row: 1, img: 'shield1.png', badge: 'ЛЗ', player: false },
        { col: 2, row: 7, img: 'shield1.png', badge: 'ПЗ', player: false },
        { col: 4, row: 1, img: 'shield1.png', badge: 'ЛПЗ', player: false },
        { col: 4, row: 7, img: 'shield1.png', badge: 'ППЗ', player: false },
        { col: 4, row: 3, img: 'shield1.png', badge: 'ЦЛПЗ', player: false },
        { col: 4, row: 5, img: 'shield1.png', badge: 'ЦППЗ', player: false },
        { col: 6, row: 3, img: 'shield1.png', badge: 'ЦНП', player: false },
        { col: 6, row: 5, img: 'shield1.png', badge: 'ЦНП', player: false },
        // Игроки 2
        { col: 12, row: 4, img: 'shield2.png', badge: 'ГП', player: false },
        { col: 11, row: 3, img: 'shield2.png', badge: 'ЦЛЗ', player: false },
        { col: 11, row: 5, img: 'shield2.png', badge: 'ЦПЗ', player: false },
        { col: 11, row: 1, img: 'shield2.png', badge: 'ЛЗ', player: false },
        { col: 11, row: 7, img: 'shield2.png', badge: 'ПЗ', player: false },
        { col: 9, row: 1, img: 'shield2.png', badge: 'ЛПЗ', player: false },
        { col: 9, row: 7, img: 'shield2.png', badge: 'ППЗ', player: false },
        { col: 9, row: 3, img: 'shield2.png', badge: 'ЦЛПЗ', player: false },
        { col: 9, row: 5, img: 'shield2.png', badge: 'ЦППЗ', player: false },
        { col: 7, row: 3, img: 'shield2.png', badge: 'ЦНП', player: false },
        { col: 7, row: 5, img: 'shield2.png', badge: 'ЦНП', player: false }
      ],
      showMatchView: true,
      showModal: false,
      selectedCell: {},
      userHasJoined: false
    }
  },
  computed: {
    ...mapGetters(['selectedMatch']),
    organizer () {
      return this.selectedMatch.organizer || { name: 'Неизвестный организатор', position: 'Должность не указана' }
    },
    organizerName () {
      return this.organizer.name
    },
    organizerPosition () {
      return this.organizer.position
    },
    matchTime () {
      return this.selectedMatch.time
    },
    matchDate () {
      return this.selectedMatch.date
    },
    matchPlacesLeft1 () {
      return this.selectedMatch.placesLeft1 || 0
    },
    matchField () {
      return this.selectedMatch.field
    },
    matchPlacesLeft2 () {
      return this.selectedMatch.placesLeft2 || 0
    },
    matchLocation () {
      return this.selectedMatch.location
    },
    matchPrice () {
      return this.selectedMatch.price
    },
    matchId () {
      return this.selectedMatch.id
    },
    getTeam1Cells () {
      const team1Cells = this.cells.filter(cell => cell.img.includes('shield1'))
      return team1Cells
    },
    getTeam2Cells () {
      const team2Cells = this.cells.filter(cell => cell.img.includes('shield2'))
      return team2Cells
    }
  },
  methods: {
    ...mapMutations(['updatePlacesLeft', 'JOIN_MATCH']),
    setActiveTab (tab) {
      this.$emit('update:activeTab', tab) // Передача события в App.vue
    },
    setActiveTabs (tab) {
      this.activeTabs = tab
    },
    closeMatchView () {
      // Удаление данных о текущем матче из sessionStorage
      sessionStorage.removeItem('selectedMatch')
      // Получаем информацию о предыдущей странице из query
      const from = this.$route.query.from

      // Возврат на предыдущую страницу
      if (from === 'AccountPlayer') {
        this.$router.push({ name: 'AccountPlayer' })
      } else {
        this.$router.push({ name: 'MatchList' })
      }
    },
    openModal (cell) {
      if (this.userHasJoined || cell.player) return // Если место уже занято или пользователь уже выбрал место — не открывается модалка
      this.selectedCell = cell
      this.showModal = true
    },
    // openModal (cell) {
    //   const isPlayerAdded = this.$store.getters.getPlayers.some(p => p.id === this.player.id)
    //   if (!isPlayerAdded) {
    //     alert('Чтобы выбрать позицию, добавьте свой профиль в список игроков.')
    //     return
    //   }

    //   if (this.userHasJoined || cell.player) return
    //   this.selectedCell = cell
    //   this.showModal = true
    // },
    closeModal () {
      this.showModal = false
      this.selectedCell = {}
    },
    joinPlayer () {
      // const isPlayerAdded = this.$store.getters.getPlayers.some(p => p.id === this.$store.state.player.id)
      // if (!isPlayerAdded) {
      //   alert('Чтобы выбрать позицию, добавьте свой профиль в список игроков.')
      //   return
      // }

      const team = this.selectedCell.img.includes('shield1') ? 1 : 2

      // Обновление счетчика через мутацию
      this.updatePlacesLeft({ matchId: this.matchId, team })

      // Добавление матчи в список joinedMatches
      this.JOIN_MATCH({ matchId: this.matchId, team })

      this.selectedCell.player = true
      this.userHasJoined = true

      // Сохранение данных для конкретного матча
      localStorage.setItem(`cellsData_${this.matchId}`, JSON.stringify(this.cells))
      localStorage.setItem(`userHasJoined_${this.matchId}`, JSON.stringify(this.userHasJoined))
      this.closeModal()
    }
  },
  mounted () {
    const savedMatch = sessionStorage.getItem('selectedMatch')
    if (!savedMatch) {
      this.$router.push({ name: 'MatchList' })
    } else {
      this.$store.commit('setSelectedMatch', JSON.parse(savedMatch))
    }

    const savedCells = localStorage.getItem(`cellsData_${this.matchId}`)
    if (savedCells) {
      this.cells = JSON.parse(savedCells)
    }

    const savedUserHasJoined = localStorage.getItem(`userHasJoined_${this.matchId}`)
    if (savedUserHasJoined) {
      this.userHasJoined = JSON.parse(savedUserHasJoined)
    }

    this.matchPlacesLeft1 = this.selectedMatch.placesLeft1 || 0
    this.matchPlacesLeft2 = this.selectedMatch.placesLeft2 || 0
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .modal-content {
    background: $text-color;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    width: 400px;
    position: relative;

    .modal-icon {
      width: 60px;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    .join-btn {
      background-color: #27ae60;
      color: $text-color;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 10px;
      width: 100%;
      font-size: 16px;

      &:hover{
        background-color: #196d3c;
      }
    }

    .cancel-btn {
      color: $bg-color;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      width: 100%;
      font-size: 16px;

      &:hover{
        background-color: $bg-color;
        color: $text-color;
      }
    }
  }
}

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

  &__match{
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
    padding: 0 16px 16px 16px;
    margin-top: 100px;

    &-content{
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      .info{
        position: relative;
        width: 100%;
        min-height: 350px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;

        &__field {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          min-height: 350px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          filter: brightness(40%);
          transform: translateY(-50%);
        }

        .title-top{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: $text-color;
          text-align: left;
          z-index: 2;

          .user{
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            gap: 16px;
            text-align: right;

            .avatar {
              border-radius: 40px;
              width: 46px;
              height: 46px;
              object-fit: cover;
              mix-blend-mode: normal;
            }
          }
        }

        .title-center{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: baseline;
          color: $text-color;
          gap: 32px;
          z-index: 2;

          .shield-1-group,
          .shield-2-group{
            display: flex;
            flex-direction: column;
            gap: 12px;

            p{
              font-size: 16px;
            }
          }

          .team{
            display: flex;
            flex-direction: column;
            gap: 32px;
            font-size: 40px;
            font-weight: 700;
          }
        }

        .title-bottom{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: $text-color;
          text-align: left;
          z-index: 2;

          .price{
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            gap: 16px;
            text-align: right;
          }
        }
      }

      .field{
        position: relative;
        min-height: 650px;
        width: 100%;
        border-radius: 8px;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
        background-color: #1f1f1f;
        background-image:
          linear-gradient(90deg, #2F6D55 50%, #437C5B 50%);
        background-size: 50px 100%;
        background-position: center;
        overflow: hidden;

        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: repeat(7, 1fr);
          gap: 2px;
          width: 100%;
          height: 100%;

          .cell {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 8px;
            align-items: center;
            z-index: 2;
            font-size: 14px;
            border-radius: 80px;

            img{
              height: 45px;
            }

            .badge {
              background-color: $text-color;
              color: $bg-color;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 700;
            }

            .add-player-btn {
              background-color: $text-color;
              color: $bg-color;
              border: none;
              border-radius: 8px;
              width: 45px;
              height: 45px;
              font-size: 24px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;

              &:hover{
                background-color: $bg-color;
                color: $text-color;
              }
            }
          }

          .disabled-cell {
            pointer-events: none;

            .add-player-btn {
              background-color: #bebebe;
              color: $text-label;
            }
          }
        }

        .circle-left-top{
          position: absolute;
          left: -20px;
          top: -20px;
        }

        .circle-right-top{
          position: absolute;
          right: -20px;
          top: -20px;
        }

        .circle-left-bottom{
          position: absolute;
          left: -20px;
          bottom: -20px;
        }

        .circle-right-bottom{
          position: absolute;
          right: -20px;
          bottom: -20px;
        }

        .gate-left {
          position: absolute;
          left: -2px;
          top: 50%;
          transform: translateY(-50%);
        }

        .gate-right {
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%);
        }

        .center{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .line{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 100%;
        }
      }
    }

    .organizer{
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: left;
      gap: 16px;
      padding: 16px;
      z-index: 1;
      min-width: 260px;
      height: 400px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
      background-color: #1f1f1f;

      .position{
        color: #ff6600;
        text-transform: uppercase;
      }

      &__img{
        width: 150px;
        height: 150px;
      }

      h1{
        font-size: 20px;
        color: $text-color;
        font-weight: 700;
      }

      p{
        font-size: 16px;
        color: $text-color;
        width: 100%;
      }
    }
  }
}
</style>
