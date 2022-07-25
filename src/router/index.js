import { createRouter, createWebHistory } from 'vue-router'

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
//   import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'game' }, //temporary
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'game',
        name: 'game',
        component: () => import('@/views/GameView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
