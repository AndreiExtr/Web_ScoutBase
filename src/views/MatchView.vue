<template>
  <div class="main" >
    <div class="title">
      <ButtonUI
        :icon="require('@/assets/icons/arrow-left.svg')"
        :style="{ width: 'auto' }"
        @click="closeMatchView" />
      <h1>Матч</h1>
    </div>
    <div class="main__match">
      <div class="main__match-content">
        <div class="info">
          <div class="title-top">
            <p> <span style="font-size: 20px;font-weight: 700;">Вт, 03 июля</span><br> 12:00 - 13:30</p>
          </div>
          <div class="title-center">
            <div class="shield-1-group">
              <img class="shield-1" alt="" src="@/assets/img/shield1.png">
              <p>4 места</p>
            </div>
            <div class="team">
              <p>10 VS 10</p>
            </div>
            <div class="shield-2-group">
              <img class="shield-2" alt="" src="@/assets/img/shield2.png">
              <p>2 места</p>
            </div>
            </div>
            <div class="title-bottom">
              <p style="font-size: 20px;font-weight: 400;"> г.Москва<br>Центральный стадион "Локомотив"</p>

              <div class="price">
                <p style="font-size: 32px;font-weight: 700;">1300 ₽</p>
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
        </div>
        <div class="map"></div>
      </div>
      <div class="organizer"></div>
    </div>
  </div>
</template>

<script>
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'MatchView',
  components: {
    ButtonUI
  },
  methods: {
    closeMatchView () {
      this.$emit('close')
    }
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
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 0 16px 16px 16px;
  gap: 16px;
  height: 100%;

  .title{
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    background-color: #1f1f1f;
    height: 80px;
    width: 100%;
    padding: 8px 0;
    box-shadow: 10px 5px 24px rgba(0, 0, 0, 0.315);
    z-index: 2;

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
    height: 100%;
    margin-top: 100px;

    &-content{
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 16px;

      .info{
        width: 100%;
        min-height: 350px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
        background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("@/assets/img/поле2.png");
        background-repeat:no-repeat;
        background-size: cover ;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title-top{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: $text-color;
          text-align: left;

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

          .shield-1-group,
          .shield-2-group{
            display: flex;
            flex-direction: column;
            gap: 12px;
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
        min-height: 700px;
        width: 100%;
        border-radius: 8px;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
        background-color: #1f1f1f;
        background-image:
          linear-gradient(90deg, #2F6D55 50%, #437C5B 50%);
        background-size: 50px 100%;
        background-position: center;
        overflow: hidden;

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

      .map{
        min-height: 400px;
        width: 100%;
        border-radius: 8px;
        box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
        background-color: #1f1f1f;
      }
    }

    .organizer{
      display: flex;
      flex-direction: row;
      z-index: 1;
      width: 350px;
      height: 600px;
      border-radius: 8px;
      box-shadow: 10px 10px 32px rgba(0, 0, 0, 0.315);
      background-color: #1f1f1f;
      top: 100px;
    }
  }
}
</style>
