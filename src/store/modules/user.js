import { getUserHeaderImage, getUserInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, data) {
    state.userInfo = { ...data }
  },
  removetoken(state) {
    state.token = ''
  }

}
const actions = {
  getToken(context, data) {
    return login(data).then(res => context.commit('setToken', res.data))
  },
  getUserInfo(context) {
    getUserInfo().then(async res => {
      const { data: { staffPhoto }} = await getUserHeaderImage(res.data.userId)
      context.commit('setUserInfo', { ...res.data, staffPhoto })
    })
  },
  logout(context) {
    removeToken()
    context.commit('removetoken')
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

