import router, { asyncRoutes, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: constantRoutes
  },
  actions: {
    filterRoutes({ commit }, routes = []) {
      const filterArr = asyncRoutes.filter(i => {
        return routes.includes(i.path.replace('/', ''))
      })
      router.addRoutes([...filterArr, { path: '*', redirect: '/404', hidden: true }])
      commit('GET_USER_ROUTES', filterArr)
    }
  },
  mutations: {
    GET_USER_ROUTES(state, data) {
      state.routes.push(...data)
    }
  }
}
