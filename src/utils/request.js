import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const Timeout = 3600
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 50000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token} `
  }
  return config
}, error => {
  return Promise.reject(error)
}) // 请求拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 1002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
}) // 响应拦截器
function IsCheckTimeOut() {
  var currentTime = Date.now()
  var timeSatmp = getTimeStamp()
  return (currentTime - timeSatmp) / 1000 > Timeout
}
export default service // 导出axios实例
