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
        <!-- Форма авторизации -->
        <form v-if="!isRegisterMode" class="formAuth" @submit.prevent="submitAuthForm">
          <div class="form__title">
            <h3>Авторизация</h3>
            <p>Нет аккаунта? <a href="#" @click.prevent="toggleMode">Зарегистрироваться</a></p>
          </div>
          <InputField
            label="Ваш E-mail"
            id="authEmail"
            type="email"
            v-model="authEmail"
            placeholder="Введите ваш e-mail"
          />
          <InputField
            label="Пароль"
            id="authPassword"
            type="password"
            v-model="authPassword"
            placeholder="Введите пароль"
          />
          <div class="errors">
            <p v-if="error" class="error-field">Пожалуйста, заполните все поля</p>
            <p v-if="errorPs" class="error-ps">Неверный email или пароль</p>
          </div>
          <ButtonUI type="submit" text="Войти" />
        </form>

        <!-- Форма регистрации -->
        <form v-else class="form" @submit.prevent="submitRegistrForm">
          <div class="form__title">
            <h3>Регистрация</h3>
            <p>Уже есть аккаунт? <a href="#" @click.prevent="toggleMode">Войти</a></p>
          </div>
          <InputField
            label="Ваш E-mail"
            id="email"
            type="email"
            v-model="email"
            placeholder="Введите ваш e-mail"
          />
          <InputField
            label="Пароль"
            id="password"
            type="password"
            v-model="password"
            placeholder="Введите пароль"
          />
          <InputField
            label="Повторите пароль"
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="Введите пароль"
          />
          <hr>
          <!-- Поле для выбора роли -->
          <div class="role-selection">
            <label>Выберите роль:</label>
            <div class="role-options">
              <button
                type="button"
                :class="{ active: role === 'player' }"
                @click="role = 'player'"
              >
                ИГРОК
              </button>
              <button
                type="button"
                :class="{ active: role === 'organizer' }"
                @click="role = 'organizer'"
              >
                ОРГАНИЗАТОР
              </button>
            </div>
            <p v-if="errorRole" class="error-message-role">Пожалуйста, выберите роль</p>
            <p v-if="errorField" class="error-message-field">Пожалуйста, заполните все поля</p>
            <p v-if="errorOverlap" class="error-message-overlap">Пароли не совпадают</p>
            <p v-if="errorLength" class="error-message-lenght">Пароль должен содержать не менее 8 символов</p>
          </div>
          <ButtonUI type="submit" text="Зарегистрироваться" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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
    const role = ref(null) // По умолчанию роль не выбрана
    const errorRole = ref(false) // Состояние для отображения ошибки
    const errorField = ref(false)
    const error = ref(false)
    const errorPs = ref(false)
    const errorOverlap = ref(false)
    const errorLength = ref(false)
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    // Режим формы (авторизация/регистрация)
    const isRegisterMode = ref(false)

    const authEmail = ref('')
    const authPassword = ref('')

    // Переключение между режимами авторизации и регистрации
    const toggleMode = () => {
      isRegisterMode.value = !isRegisterMode.value
    }

    // АВТОРИЗАЦИЯ
    const submitAuthForm = () => {
      // Сбрасываем ошибки перед проверкой
      error.value = false
      errorPs.value = false

      if (!authEmail.value || !authPassword.value) {
        error.value = true
      }

      // Получаем данные пользователей из localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []
      console.log('Данные из localStorage:', users)

      console.log('Введённые данные:', authEmail.value, authPassword.value)
      // Ищем пользователя с указанной почтой и ролью
      const user = users.find(
        user => user.email === authEmail.value
      )

      console.log('Найденный пользователь:', user)

      if (user) {
        // Проверяем пароль
        if (user.password === authPassword.value) {
          // Успешная авторизация
          localStorage.setItem('isAuthenticated', true) // Сохраняем флаг авторизации
          localStorage.setItem('currentRole', user.role) // Сохраняем текущую роль
          router.push({ name: 'MainView' })
        } else {
          errorPs.value = true
        }
      } else {
        errorPs.value = true
      }
    }

    const submitRegistrForm = () => {
      errorRole.value = false
      errorField.value = false
      errorOverlap.value = false

      if (!role.value) {
        errorRole.value = true
      }

      // Проверка на заполнение полей
      if (!email.value || !password.value || !confirmPassword.value) {
        errorField.value = true
      }

      if (password.value.length < 8) {
        errorLength.value = true
        return
      }

      // Проверка на совпадение паролей
      if (password.value !== confirmPassword.value) {
        if (password.value !== null && confirmPassword.value) {
          errorOverlap.value = true
          errorLength.value = false
        }
      }

      // Если есть ошибки, останавливаем отправку формы
      if (errorRole.value || errorField.value || errorOverlap.value) {
        return
      }

      const users = JSON.parse(localStorage.getItem('users')) || []

      // Проверяем, есть ли уже пользователь с такой ролью
      const existingUser = users.find(user => user.role === role.value)

      if (existingUser) {
        existingUser.email = email.value
        existingUser.password = password.value
      } else {
        // Добавляем нового пользователя
        users.push({
          role: role.value,
          email: email.value,
          password: password.value
        })
      }

      // Сохраняем обновлённые данные в localStorage
      localStorage.setItem('users', JSON.stringify(users))

      // // Если ошибок нет, сохраняем роль/пароль и переходим на главную страницу
      localStorage.setItem('currentRole', role.value)
      router.push({ name: 'MainView' })
    }

    return {
      email,
      password,
      confirmPassword,
      role,
      error,
      errorPs,
      errorRole,
      errorField,
      errorOverlap,
      errorLength,
      submitRegistrForm,
      toggleMode,
      submitAuthForm,
      isRegisterMode,
      authEmail,
      authPassword
    }
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

        .role-selection {
          margin: 0 0 40px 0;
          text-align: left;

          label {
            color: #6d6f74;
            font-size: 14px;
          }

          .role-options {
            position: relative;
            display: flex;
            gap: 16px;
            margin-top: 8px;
            width: 100%;

            button {
              width: 100%;
              font-size: 14px;
              padding: 8px 16px;
              border: 1px solid #3a4149;
              border-radius: 8px;
              background-color: #1f1f1f;
              cursor: pointer;
              transition: background-color 0.3s, border-color 0.3s;

              &:hover {
                background-color: $primary-color;
                color: $bg-color;
              }

              &.active {
                background-color: $primary-color;
                border-color: $primary-color;
                color: $bg-color;
              }
            }
          }

          .error-message-role {
            position: absolute;
            color: red;
            font-size: 14px;
            margin-top: 8px;
          }

          .error-message-field {
            position: absolute;
            color: red;
            font-size: 14px;
            margin-top: 20px;
          }

          .error-message-overlap{
            position: absolute;
            color: red;
            font-size: 14px;
            margin-top: 32px;
          }

          .error-message-lenght{
            position: absolute;
            color: red;
            font-size: 14px;
            margin-top: 32px;
          }
        }
      }

      .formAuth{
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
            margin-bottom: 32px;

            a{
              color: $primary-color;
            }
          }
        }

        .errors{
          width: 100%;
          height: 24px;

          .error-field {
            color: red;
            text-align: left;
            font-size: 14px;
          }

          .error-ps {
            color: red;
            text-align: left;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
