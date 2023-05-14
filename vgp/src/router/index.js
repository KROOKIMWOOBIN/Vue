import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path : '/userLogin',
    name : 'userLogin',
    component : () => import('../views/LoginView.vue')
  },
  {
    path : '/signup',
    name : 'signup',
    component : () => import('../components/Sign_up.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

export default router
