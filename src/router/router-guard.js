import { isNavigationFailure, RouteLocationNormalized } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import { generatorDynamicRouter } from './generator-router'
NProgress.configure({ showSpinner: false })
const defaultRoutePath = '/admin/index'
export function createRouterGuards(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const token = sessionStorage.getItem('token')
    if (token) {
      if (to.name === 'Login') {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        const generatorResult = generatorDynamicRouter()
        this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu)
        next()
      }
    }
  })
}
/** 获取路由对应的组件名称 */
const getComponentName = (route) => {
  return route.matched.find((item) => item.name === route.name)?.components?.default.name
}
