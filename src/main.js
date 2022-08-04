import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Component from './components'
import * as directives from '@/directives'
import * as filters from '@/filters'
import VuePrint from 'vue-print-nb'
import i18n from '@/lang'
import checkPermission from '@/mixin/checkPermission'
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
Vue.use(VuePrint) // 注册打印插件
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(Component)
Vue.mixin(checkPermission)
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
