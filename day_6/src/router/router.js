import { createRouter, createWebHistory } from 'vue-router'
import BookRating from '../components/BookRating.vue'
import About from '../components/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BookRating
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router