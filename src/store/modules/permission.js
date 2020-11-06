import { constantRoutes } from '@/router'



const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit },permissions) {
    return new Promise(resolve => {
      commit('SET_ROUTES', permissions)
      resolve(state.routes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
