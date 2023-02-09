import { getInfo, getUserDetail, login } from '@/api/user'
import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'

const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
  },
  setUserInfo(state, data) {
    state.userInfo = { ...data }
  }

}
const actions = {
  async getToken(context, data) {
    const res = await login(data)
    context.commit('setToken', res.data)
    setTimeStamp()
  },
  async logout(context) {
    await removeToken()
    context.commit('LOGOUT')
  },
  async getUserInfo(context) {
    const userInfo = await getInfo()
    const result = await getUserDetail(userInfo.data.userId)
    context.commit('setUserInfo', { ...userInfo.data, staffPhoto: result.data.staffPhoto })
    return userInfo.data.roles.menus
  }
}
const getter = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getter
}

