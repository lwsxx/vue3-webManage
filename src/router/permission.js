import router from './index'

//创建路由守卫
const token = sessionStorage.getItem('token')
const whiteList = ['/login'] //路由白名单
router.beforeEach((to, from, next) => {
  if (token) {
    if (to.path === '/' || to.path === '/login') {
      next('/admin')
    } else {
      // next('/admin')
    }
  } else {
    //如果要去到的路由包含在白名单内，就可以跳转
    if (whiteList.includes(to.path)) {
      next()
    } else {
      //	否则的话需要登录
      next('/')
    }
  }
})
