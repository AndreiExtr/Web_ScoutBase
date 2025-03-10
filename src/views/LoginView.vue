<template>
  <div class="home">
    <div class="home__bg">
      <img src="@/assets/img/auth-bg.png">
      <div class="home__bg-description">
        <h1>SCOUT<span>BASE</span></h1>
        <p>ScoutBase – это современная платформа для взаимодействия футбольных организаторов, игроков и команд.</p>
      </div>
    </div>
    <div class="home__login">
      <div class="home__login-forms">
        <form class="form">
          <div class="form__title">
            <h3>Регистрация</h3>
            <p>Уже есть аккаунт? <a href="#">Войти</a></p>
          </div>
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
          <hr>
          <ButtonUI text="Зарегистрироваться" @click="submitForm" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import InputField from '@/components/InputField.vue'
import ButtonUI from '@/components/ButtonUI.vue'
export default {
  name: 'LoginView',
  components: {
    InputField,
    ButtonUI
  },
  setup () {
    const router = useRouter()

    const submitForm = () => {
      router.push({ name: 'HomeView' })
    }

    return { submitForm }
  }
}
</script>

<style lang="scss">
$primary-color: #13e66e;
$bg-color: #141414;
$text-color: #fff;
$text-label: #6d6f74;

.home{
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
        font-size:52px;
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
      background: rgba(0, 0, 0, 0.7);
    }
  }

  &__login{
    width: 100%;
    height: 100vh;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $bg-color;

    &-forms{
      display: flex;
      justify-content: center;
      flex-direction: row;

      .form{
        height: auto;
        width: 100%;
        max-width: 420px;
        border-radius: 16px;
        padding: 48px;
        margin: 40px auto;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &__title{
          display: flex;
          flex-direction: column;
          gap: 12px;

          h3{
            font-size: 28px;
            font-weight: 700;
          }

          p{
            font-size: 14px;
            color: #b5b6b8;

            a{
              color: $primary-color;
            }
          }
        }

        hr{
          background-color: #3a4149;
          width: 100%;
          height: 1px;
        }
      }
    }
  }
}
</style>
