import { createStore } from 'vuex'

// Функция для сохранения состояния в localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('vuex-state', serializedState)
  } catch (err) {
    console.error('Could not save state', err)
  }
}

// Функция для загрузки состояния из localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('vuex-state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('Could not load state', err)
    return undefined
  }
}

export default createStore({
  state: loadState() || {
    matches: [
      { id: 1, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 2, date: 'Пт, 05 июля', time: '14:00 - 15:30', placesLeft1: 6, placesLeft2: 3, location: 'Стадион "Спартак", ул. Волоколамское шоссе, 69, Москва', price: 1500, status: 'предстоящие', organizer: { name: 'Петров Александр Викторович', position: 'Директор турнира' } },
      { id: 3, date: 'Сб, 21 июня', time: '10:00 - 11:30', placesLeft1: 0, placesLeft2: 0, location: 'Стадион "Динамо", Ленинградский проспект, 36, Москва', price: 1200, status: 'предстоящие', organizer: { name: 'Сидоров Максим Анатольевич', position: 'Координатор' } },
      { id: 4, date: 'Вт, 03 июля', time: '16:00 - 17:30', placesLeft1: 5, placesLeft2: 2, location: 'Стадион "Зенит", Футбольная аллея, 1, Санкт-Петербург', price: 1400, status: 'сегодня', organizer: { name: 'Козлов Андрей Владимирович', position: 'Спортивный менеджер' } },
      { id: 5, date: 'Вт, 09 июля', time: '18:00 - 19:30', placesLeft1: 3, placesLeft2: 1, location: 'Стадион "Краснодар", ул. Разведчика Леонова, 1, Краснодар', price: 1100, status: 'предстоящие', organizer: { name: 'Федоров Дмитрий Евгеньевич', position: 'Ответственный за матч' } },
      { id: 6, date: 'Ср, 27 июня', time: '13:00 - 14:30', placesLeft1: 4, placesLeft2: 0, location: 'Стадион "ЦСКА", 3-я Песчаная ул., 2А, Москва', price: 1350, status: 'предстоящие', organizer: { name: 'Васильев Олег Сергеевич', position: 'Рефери' } },
      { id: 7, date: 'Вт, 03 июля', time: '12:00 - 13:30', placesLeft1: 2, placesLeft2: 5, location: 'Стадион "Торпедо", Восточная ул., 4, Москва', price: 1250, status: 'сегодня', organizer: { name: 'Новиков Артем Валерьевич', position: 'Спортивный координатор' } },
      { id: 8, date: 'Пт, 12 июля', time: '15:00 - 16:30', placesLeft1: 6, placesLeft2: 6, location: 'Стадион "Рубин", пр. Ямашева, 3, Казань', price: 1600, status: 'предстоящие', organizer: { name: 'Денисов Виктор Олегович', position: 'Главный организатор' } },
      { id: 9, date: 'Сб, 29 июня', time: '17:00 - 18:30', placesLeft1: 0, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1400, status: 'предстоящие', organizer: { name: 'Егоров Павел Николаевич', position: 'Куратор соревнований' } },
      { id: 10, date: 'Вт, 03 июля', time: '11:00 - 12:30', placesLeft1: 3, placesLeft2: 1, location: 'Стадион "Ростов", ул. Левобережная, 2Б, Ростов-на-Дону', price: 1250, status: 'сегодня', organizer: { name: 'Захаров Николай Иванович', position: 'Главный судья' } },
      { id: 11, date: 'Вт, 16 июля', time: '12:00 - 13:30', placesLeft1: 4, placesLeft2: 2, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'предстоящие', organizer: { name: 'Романов Сергей Викторович', position: 'Директор лиги' } },
      { id: 12, date: 'Вт, 03 июля', time: '12:00 - 13:30', placesLeft1: 4, placesLeft2: 2, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'сегодня', organizer: { name: 'Лебедев Алексей Аркадьевич', position: 'Координатор соревнований' } },
      { id: 13, date: 'Вт, 03 июля', time: '13:00 - 14:30', placesLeft1: 4, placesLeft2: 2, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'сегодня', organizer: { name: 'Борисов Михаил Дмитриевич', position: 'Менеджер турнира' } },
      { id: 14, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 15, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 16, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 17, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 18, date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 4, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } }
    ]
  },
  getters: {
    getMatches: (state) => state.matches
  },
  mutations: {
    SET_MATCHES (state, matches) {
      state.matches = matches
      saveState(state) // Сохраняем обновленное состояние в localStorage
    }
  },
  actions: {
    loadMatches ({ commit }, matches) {
      commit('SET_MATCHES', matches)
    }
  }
})
