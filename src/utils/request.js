import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
request.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
}
)

request.interceptors.response.use(res => {
  if (res.data.success) {
    return res.data
  } else {
    Message.error(res.data.message)
    return Promise.reject(new Error(res.data.message))
  }
}, err => {
  console.dir(err)
  if (err.response && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error(err.response.data.message)
    return Promise.reject(err.response.data.message)
  }
  Message.error(err.message)
  return Promise.reject(err.message)
})

export default request
