import { createRouter, createWebHashHistory } from 'vue-router'
import staticRouter from './staticRouter'

export const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('../views/login/index.vue'),
  },
  ...staticRouter,
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export async function setupRouter(app) {
  app.use(router)

  // 路由准备就绪后挂载APP实例
  await router.isReady()
}
export default router
