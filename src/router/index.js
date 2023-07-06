// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomePage.vue'),
      },
    ],
  },
  {
    path: '/article/:path',
    name: "DetailPage",
    component: () => import('@/views/DetailPage.vue'),
  },
  {
    path: '/create',
    name: 'CreatePage',
    component: () => import('@/views/CreatePage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
