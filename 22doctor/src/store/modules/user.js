import { login, getInfo, upLoginTime } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { reAsyncRoutes } from '@/utils/async-routes'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  userInfo: {},
  roles: [],
  menus: [],
  menusList: [],
  tagList: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_MENUSLIST: (state, menusList) => {
    state.menusList = menusList
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_TAG_LIST: (state, list) => {
    state.tagList = list
  }
}

const actions = {
  // user login

  resetMenus({ commit }, menus) {
    commit('SET_MENUSLIST', menus)
    const routes = reAsyncRoutes(menus)
    commit('SET_MENUS', routes)
  },

  set_tag({ commit }, list) {
    commit('SET_TAG_LIST', list)
  },

  login({ commit, dispatch }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: email.trim(), password: password }).then(async response => {
        const { data } = response
        const routes = reAsyncRoutes(data.jurisdictionList)

        commit('SET_MENUS', routes)
        commit('SET_MENUSLIST', data.jurisdictionList)

        commit('SET_TOKEN', 'doctor')
        commit('SET_NAME', data.username)
        commit('SET_USER_INFO', data)
        setToken('doctor')
        await dispatch('permission/generateRoutesList', routes, { root: true })
        // dynamically add accessible routes
        router.addRoutes(routes)
        // sessionStorage.setItem('userInfo', JSON.stringify(this.$store.state))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info new
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        commit('SET_ROLES', ['admin'])
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    commit('SET_TAG_LIST', [])
    sessionStorage.removeItem('userInfo')
    removeToken()
    resetRouter()
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     removeToken()
    //     resetRouter()
    //
    //     // reset visited views and cached views
    //     // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //     dispatch('tagsView/delAllViews', null, { root: true })
    //
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
