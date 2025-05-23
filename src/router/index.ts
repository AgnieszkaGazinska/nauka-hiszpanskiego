import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/TabStronaGlowna'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/TabStronaGlowna'
      },
      {
        path: 'TabStronaGlowna',
        component: () => import('@/views/StronaGlowna.vue')
      },
      {
        path: 'TabOknoNauki',
        component: () => import('@/views/OknoNauki.vue')
      },
      {
        path: 'TabOknoModyfikacji',
        component: () => import('@/views/OknoModyfikacji.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
