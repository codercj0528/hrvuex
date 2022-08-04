import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    // 如果有TOKEN并且要去到登录页
    if (to.path === '/login') {
      next('/') // 直接跳转到主页
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)

        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }]) // 添加到路由表

        next(to.path)
      } else {
        next() // 如果不是登录页直接放行
      }
    }
  } else {
    // 如果没有TOKEN则要查看去往页面是否为白名单不需要TOKEN页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()
})
router.afterEach(function() {
  NProgress.done()
})
