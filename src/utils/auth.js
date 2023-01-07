import Cookies from 'js-cookie'

const TokenKey = 'admin_token'
const timeKey = 'timestamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 3 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTimeStamp() {
  return Cookies.set(timeKey, +new Date())
}

export function getTimeStamp() {
  return Cookies.get(timeKey)
}
