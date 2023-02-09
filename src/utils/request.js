import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

const timeOut = 7200

function isCheckTimeOut() {
  const dataStamp = +new Date()
  return (dataStamp - getTimeStamp()) / 1000 > timeOut
}

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
request.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    if (isCheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('Token 到期, 请重新登录'))
    }
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
}
)

request.interceptors.response.use(async res => {
  const { success, message } = res.data
  if (success) {
    return res.data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  if (err.response && err.response.data.code === 10002) {
    router.push('/login')
    store.dispatch('user/logout')
  } else {
    Message.error(err.message)
  }
  return Promise.reject(err.message)
})

export default request
