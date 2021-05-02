import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/editor',
      component: () => import('./pages/Editor.vue')
    },
  ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')
