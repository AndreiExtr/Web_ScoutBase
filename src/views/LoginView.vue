<template>
  <div class="home">
    <div class="home__bg">
      <img src="@/assets/img/auth-bg.png">
      <div class="home__bg-description">
        <h1>SCOUT<span>BASE</span></h1>
        <p>ScoutBase – это современная платформа для взаимодействия футбольных скаутов, игроков и команд.</p>
      </div>
    </div>
    <div class="home__login">
      <div class="home__login-forms">
        <form class="form">
          <InputField
            label="Ваш E-mail"
            id="email"
            type="email"
            placeholder="Введите ваш e-mail"
          />
          <InputField
            label="Пароль"
            id="password"
            type="password"
            placeholder="Введите пароль"
          />
          <InputField
            label="Повторите пароль"
            id="password"
            type="password"
            placeholder="Введите пароль"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue'
export default {
  name: 'LoginView',
  components: {
    InputField
  }
}
</script>

<style lang="scss">
$primary-color: #75efb0;
$text-color: #fff;

.home{
  height: 100vh;
  color: $text-color;
  display: flex;
  flex-direction: row;

  &__bg{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;

    &-description{
      display: flex;
      flex-direction: column;
      justify-content: left;
      align-items: flex-start;
      gap: 16px;
      z-index: 1;
      width: 100%;
      max-width: 600px;

      h1{
        font-weight: 700;
        letter-spacing: .24em;
        font-size:48px;
        text-transform: uppercase;
        color: $text-color;

        span{
          color: $primary-color;
        }
      }

      p{
        font-size: 24px;
        line-height: 32px;
        font-weight: 400;
        text-align: left;
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  &__login{
    width: 100%;
    height: 100vh;
    padding: 40px;

    &-forms{
      display: flex;
      justify-content: center;
      flex-direction: row;
      height: 100%;

      .form{
        background: #293038;
        width: 100%;
        max-width: 420px;
        border-radius: 16px;
        padding: 48px;
        margin: 40px auto;
      }
    }
  }
}
</style>
