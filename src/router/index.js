import { createRouter, createWebHistory } from 'vue-router'
import MatchList from '../views/MatchList.vue'
import LoginView from '../views/LoginView.vue'
import MatchView from '../views/MatchView.vue'
import GamerList from '../views/GamerList.vue'
import FieldList from '../views/FieldList.vue'
import PlayerView from '../views/PlayerView.vue'
import MainView from '../views/MainView.vue'
import AccountPlayer from '../views/AccountPlayer.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/account-player',
    name: 'AccountPlayer',
    component: AccountPlayer
  },
  {
    path: '/main',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/home',
    name: 'MatchList',
    component: MatchList
  },
  {
    path: '/match/:matchId',
    name: 'MatchView',
    component: MatchView
  },
  {
    path: '/players',
    name: 'GamerList',
    component: GamerList
  },
  {
    path: '/players/:playerId',
    name: 'PlayerView',
    component: PlayerView
  },
  {
    path: '/fields',
    name: 'FieldList',
    component: FieldList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
