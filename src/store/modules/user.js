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
    await getInfo().then(async res => {
      const result = await getUserDetail(res.data.userId)
      context.commit('setUserInfo', { ...res.data, staffPhoto: result.data.staffPhoto })
    })
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

