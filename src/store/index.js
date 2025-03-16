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
    players: [
      { id: 1, avatar: require('@/assets/img/player/avatar1.jpg'), lastName: 'Семенов', firstName: 'Алексей', middleName: 'Иванович', age: 26, position: 'ЦПЗ', goals: 3, parameters: '180/75', stats: { speed: 11, pass: 5, dribbling: 50, defense: 99, fitness: 85 }, matchHistory: [{ matchDate: '2025-03-02', result: 'Победа', goalsScored: 2, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-16', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-23', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }, { matchDate: '2025-03-30', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 2, avatar: require('@/assets/img/player/avatar2.jpg'), lastName: 'Иванов', firstName: 'Сергей', middleName: 'Петрович', age: 24, position: 'ЦППЗ', goals: 5, parameters: '175/70', stats: { speed: 70, pass: 23, dribbling: 65, defense: 75, fitness: 90 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Победа', goalsScored: 2, assists: 0, glasses: 8.1 }, { matchDate: '2025-03-08', result: 'Ничья', goalsScored: 1, assists: 0, glasses: 2.1 }, { matchDate: '2025-03-14', result: 'Поражение', goalsScored: 1, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-21', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-29', result: 'Победа', goalsScored: 0, assists: 0, glasses: 4.2 }] },
      { id: 3, avatar: require('@/assets/img/player/avatar3.jpg'), lastName: 'Петров', firstName: 'Александр', middleName: 'Викторович', age: 28, position: 'ЛПЗ', goals: 2, parameters: '185/80', stats: { speed: 72, pass: 78, dribbling: 60, defense: 2, fitness: 98 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 4, avatar: require('@/assets/img/player/avatar4.jpg'), lastName: 'Сидоров', firstName: 'Максим', middleName: 'Анатольевич', age: 27, position: 'ЛЗ', goals: 1, parameters: '178/72', stats: { speed: 65, pass: 70, dribbling: 13, defense: 87, fitness: 84 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 0, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 5, avatar: require('@/assets/img/player/avatar5.jpg'), lastName: 'Козлов', firstName: 'Андрей', middleName: 'Владимирович', age: 30, position: 'ГП', goals: 0, parameters: '170/68', stats: { speed: 50, pass: 60, dribbling: 55, defense: 76, fitness: 45 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 0, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 0, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 6, avatar: require('@/assets/img/player/avatar6.jpg'), lastName: 'Федоров', firstName: 'Дмитрий', middleName: 'Евгеньевич', age: 25, position: 'ЦЗ', goals: 2, parameters: '190/85', stats: { speed: 75, pass: 72, dribbling: 45, defense: 90, fitness: 89 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 7, avatar: require('@/assets/img/player/avatar7.jpg'), lastName: 'Васильев', firstName: 'Олег', middleName: 'Сергеевич', age: 23, position: 'ЦЛЗ', goals: 4, parameters: '177/74', stats: { speed: 85, pass: 80, dribbling: 80, defense: 70, fitness: 92 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 2, assists: 1, glasses: 4.2 }] },
      { id: 8, avatar: require('@/assets/img/player/avatar8.jpg'), lastName: 'Новиков', firstName: 'Артем', middleName: 'Валерьевич', age: 26, position: 'ППЗ', goals: 3, parameters: '182/78', stats: { speed: 80, pass: 11, dribbling: 11, defense: 85, fitness: 90 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 1, assists: 1, glasses: 4.2 }] },
      { id: 9, avatar: require('@/assets/img/player/avatar9.jpg'), lastName: 'Денисов', firstName: 'Виктор', middleName: 'Олегович', age: 29, position: 'ЦОП', goals: 1, parameters: '185/80', stats: { speed: 99, pass: 68, dribbling: 60, defense: 34, fitness: 87 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 0, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 10, avatar: require('@/assets/img/player/avatar10.jpg'), lastName: 'Егоров', firstName: 'Павел', middleName: 'Николаевич', age: 31, position: 'ЛП', goals: 3, parameters: '179/77', stats: { speed: 89, pass: 81, dribbling: 98, defense: 91, fitness: 99 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 1, assists: 1, glasses: 4.2 }] },
      { id: 11, avatar: require('@/assets/img/player/avatar11.jpg'), lastName: 'Захаров', firstName: 'Николай', middleName: 'Иванович', age: 24, position: 'ПП', goals: 2, parameters: '176/70', stats: { speed: 60, pass: 65, dribbling: 52, defense: 89, fitness: 80 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 12, avatar: require('@/assets/img/player/avatar12.jpg'), lastName: 'Романов', firstName: 'Сергей', middleName: 'Викторович', age: 22, position: 'ЦПЗ', goals: 6, parameters: '183/79', stats: { speed: 78, pass: 98, dribbling: 76, defense: 12, fitness: 92 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 2, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 1, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 2, assists: 1, glasses: 4.2 }] },
      { id: 13, avatar: require('@/assets/img/player/avatar13.jpg'), lastName: 'Лебедев', firstName: 'Алексей', middleName: 'Аркадьевич', age: 27, position: 'ГП', goals: 2, parameters: '180/74', stats: { speed: 55, pass: 62, dribbling: 23, defense: 91, fitness: 77 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 14, avatar: require('@/assets/img/player/avatar14.jpg'), lastName: 'Борисов', firstName: 'Михаил', middleName: 'Дмитриевич', age: 25, position: 'ЦНП', goals: 5, parameters: '176/73', stats: { speed: 72, pass: 70, dribbling: 99, defense: 80, fitness: 88 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 3, assists: 1, glasses: 4.2 }] },
      { id: 15, avatar: require('@/assets/img/player/avatar15.jpg'), lastName: 'Григорьев', firstName: 'Юрий', middleName: 'Павлович', age: 28, position: 'ЦЛПЗ', goals: 4, parameters: '182/76', stats: { speed: 56, pass: 75, dribbling: 72, defense: 80, fitness: 86 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 2, assists: 1, glasses: 4.2 }] },
      { id: 16, avatar: require('@/assets/img/player/avatar16.jpg'), lastName: 'Михайлов', firstName: 'Виктор', middleName: 'Степанович', age: 26, position: 'ПЗ', goals: 2, parameters: '184/81', stats: { speed: 67, pass: 11, dribbling: 60, defense: 89, fitness: 84 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 17, avatar: require('@/assets/img/player/avatar17.jpg'), lastName: 'Александров', firstName: 'Денис', middleName: 'Юрьевич', age: 23, position: 'ЦЗ', goals: 1, parameters: '179/73', stats: { speed: 64, pass: 70, dribbling: 55, defense: 51, fitness: 80 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 0, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] },
      { id: 18, avatar: require('@/assets/img/player/avatar18.jpg'), lastName: 'Королев', firstName: 'Аркадий', middleName: 'Владимирович', age: 29, position: 'ЦП', goals: 3, parameters: '188/82', stats: { speed: 75, pass: 74, dribbling: 68, defense: 84, fitness: 89 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 1, assists: 1, glasses: 4.2 }] },
      { id: 19, avatar: require('@/assets/img/player/avatar19.jpg'), lastName: 'Тимофеев', firstName: 'Олег', middleName: 'Геннадьевич', age: 31, position: 'ЦППЗ', goals: 6, parameters: '182/75', stats: { speed: 80, pass: 78, dribbling: 67, defense: 82, fitness: 90 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 1, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 2, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 1, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 2, assists: 1, glasses: 4.2 }] },
      { id: 20, avatar: require('@/assets/img/player/avatar20.jpg'), lastName: 'Смирнов', firstName: 'Василий', middleName: 'Викторович', age: 27, position: 'ГП', goals: 0, parameters: '170/68', stats: { speed: 58, pass: 60, dribbling: 54, defense: 99, fitness: 75 }, matchHistory: [{ matchDate: '2025-03-01', result: 'Ничья', goalsScored: 0, assists: 1, glasses: 8.1 }, { matchDate: '2025-03-09', result: 'Ничья', goalsScored: 0, assists: 0, glasses: 5.3 }, { matchDate: '2025-03-08', result: 'Поражение', goalsScored: 0, assists: 0, glasses: 8.5 }, { matchDate: '2025-03-11', result: 'Победа', goalsScored: 0, assists: 2, glasses: 8.5 }, { matchDate: '2025-03-12', result: 'Победа', goalsScored: 0, assists: 1, glasses: 4.2 }] }
    ],
    matches: [
      { id: 1, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 12, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 2, field: require('@/assets/img/field/field2.png'), date: 'Пт, 05 июля', time: '14:00 - 15:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Спартак", ул. Волоколамское шоссе, 69, Москва', price: 1500, status: 'предстоящие', organizer: { name: 'Петров Александр Викторович', position: 'Директор турнира' } },
      { id: 3, field: require('@/assets/img/field/field3.jpg'), date: 'Сб, 21 июня', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Динамо", Ленинградский проспект, 36, Москва', price: 1200, status: 'предстоящие', organizer: { name: 'Сидоров Максим Анатольевич', position: 'Координатор' } },
      { id: 4, field: require('@/assets/img/field/field4.jpg'), date: 'Вт, 03 июля', time: '16:00 - 17:30', placesLeft1: 0, placesLeft2: 0, location: 'Стадион "Зенит", Футбольная аллея, 1, Санкт-Петербург', price: 1400, status: 'сегодня', organizer: { name: 'Козлов Андрей Владимирович', position: 'Спортивный менеджер' } },
      { id: 5, field: require('@/assets/img/field/field5.jpg'), date: 'Вт, 09 июля', time: '18:00 - 19:30', placesLeft1: 8, placesLeft2: 8, location: 'Стадион "Краснодар", ул. Разведчика Леонова, 1, Краснодар', price: 1100, status: 'предстоящие', organizer: { name: 'Федоров Дмитрий Евгеньевич', position: 'Ответственный за матч' } },
      { id: 6, field: require('@/assets/img/field/field6.jpg'), date: 'Ср, 27 июня', time: '13:00 - 14:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "ЦСКА", 3-я Песчаная ул., 2А, Москва', price: 1350, status: 'предстоящие', organizer: { name: 'Васильев Олег Сергеевич', position: 'Рефери' } },
      { id: 7, field: require('@/assets/img/field/field7.jpg'), date: 'Вт, 03 июля', time: '12:00 - 13:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Торпедо", Восточная ул., 4, Москва', price: 1250, status: 'сегодня', organizer: { name: 'Новиков Артем Валерьевич', position: 'Спортивный координатор' } },
      { id: 8, field: require('@/assets/img/field/field8.jpg'), date: 'Пт, 12 июля', time: '15:00 - 16:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Рубин", пр. Ямашева, 3, Казань', price: 1600, status: 'предстоящие', organizer: { name: 'Денисов Виктор Олегович', position: 'Главный организатор' } },
      { id: 9, field: require('@/assets/img/field/field9.jpg'), date: 'Сб, 29 июня', time: '17:00 - 18:30', placesLeft1: 12, placesLeft2: 12, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1400, status: 'предстоящие', organizer: { name: 'Егоров Павел Николаевич', position: 'Куратор соревнований' } },
      { id: 10, field: require('@/assets/img/field/field10.jpg'), date: 'Вт, 03 июля', time: '11:00 - 12:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Ростов", ул. Левобережная, 2Б, Ростов-на-Дону', price: 1250, status: 'сегодня', organizer: { name: 'Захаров Николай Иванович', position: 'Главный судья' } },
      { id: 11, field: require('@/assets/img/field/field1.png'), date: 'Вт, 16 июля', time: '12:00 - 13:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'предстоящие', organizer: { name: 'Романов Сергей Викторович', position: 'Директор лиги' } },
      { id: 12, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '12:00 - 13:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'сегодня', organizer: { name: 'Лебедев Алексей Аркадьевич', position: 'Координатор соревнований' } },
      { id: 13, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '13:00 - 14:30', placesLeft1: 12, placesLeft2: 12, location: 'Стадион "Шинник", пр. Ленина, 18, Ярославль', price: 1300, status: 'сегодня', organizer: { name: 'Борисов Михаил Дмитриевич', position: 'Менеджер турнира' } },
      { id: 14, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 12, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 15, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 12, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 16, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 17, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 12, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } },
      { id: 18, field: require('@/assets/img/field/field1.png'), date: 'Вт, 03 июля', time: '10:00 - 11:30', placesLeft1: 12, placesLeft2: 2, location: 'Центральный стадион "Локомотив", ул. Большая Черкизовская, 125, Москва', price: 1300, status: 'сегодня', organizer: { name: 'Иванов Сергей Петрович', position: 'Главный судья' } }
    ],
    selectedMatch: null, // Выбранный матч
    selectedPlayer: null, // Выбранный игрок
    joinedMatches: []
  },
  getters: {
    myProfile: (state) => state.myProfile,
    getPlayers: (state) => state.players,
    getMatches: (state) => state.matches,
    selectedMatch: (state) => state.selectedMatch || {
      id: null,
      date: '',
      time: '',
      placesLeft1: 0,
      placesLeft2: 0,
      location: '',
      field: '',
      price: 0,
      organizer: { name: 'Неизвестный организатор', position: 'Должность не указана' }
    },
    selectedPlayer: (state) => state.selectedPlayer || {
      id: null,
      lastName: '',
      firstName: '',
      middleName: '',
      parameters: '',
      age: 0,
      position: '',
      avatar: '',
      goals: 0,
      stats: { speed: 0, pass: 0, dribbling: 0, defense: 0, fitness: 0 },
      matchHistory: { matchDate: '', result: '', goalsScored: 0, assists: 0, glasses: 0 }
    },
    getJoinedMatches: (state) => state.joinedMatches
  },
  mutations: {
    SET_PLAYERS (state, players) {
      state.players = players
      saveState(state)
    },
    SET_MATCHES (state, matches) {
      state.matches = matches
      saveState(state) // Сохранение обновленного состояния в localStorage
    },
    setSelectedMatch (state, match) {
      state.selectedMatch = match // Сохранение выбранного матча
      saveState(state)
    },
    setSelectedPlayer (state, player) {
      state.selectedPlayer = player // Сохранение выбранного игрока
      saveState(state)
    },
    updatePlacesLeft (state, { matchId, team }) {
      const match = state.matches.find(m => m.id === matchId)
      if (match) {
        if (team === 1 && match.placesLeft1 > 0) {
          match.placesLeft1--
        } else if (team === 2 && match.placesLeft2 > 0) {
          match.placesLeft2--
        }
        saveState(state)
      }
    },
    UPDATE_PLAYER_PROFILE (state, updatedProfile) {
      const playerIndex = state.players.findIndex(player => player.id === updatedProfile.id)
      if (playerIndex !== -1) {
        // Обновляем данные игрока
        state.players[playerIndex] = { ...state.players[playerIndex], ...updatedProfile }
        saveState(state) // Сохраняем обновленное состояние в localStorage
      }
    },
    JOIN_MATCH (state, { matchId, team }) {
      if (!state.joinedMatches.some(m => m.matchId === matchId)) {
        state.joinedMatches.push({ matchId, team })
        saveState(state)
      }
    }
  },
  actions: {
    loadMatches ({ commit }, matches) {
      commit('SET_MATCHES', matches)
    },
    loadPlayers ({ commit }, players) {
      commit('SET_PLAYERS', players)
    },
    joinMatch ({ commit }, { matchId, team }) {
      commit('updatePlacesLeft', { matchId, team })
      commit('JOIN_MATCH', { matchId, team })
    },
    updatePlayerProfile ({ commit }, updatedProfile) {
      commit('UPDATE_PLAYER_PROFILE', updatedProfile)
    }
  }
})
