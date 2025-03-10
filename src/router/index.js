import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MatchView from '../views/MatchView.vue'
import GamerView from '../views/GamerView.vue'
import ScoutView from '../views/ScoutView.vue'
import PlayerView from '../views/PlayerView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/match/:matchId',
    name: 'MatchView',
    component: MatchView
  },
  {
    path: '/players',
    name: 'GamerView',
    component: GamerView
  },
  {
    path: '/players/:playerId',
    name: 'PlayerView',
    component: PlayerView
  },
  {
    path: '/scouts',
    name: 'ScoutView',
    component: ScoutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
