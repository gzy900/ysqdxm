import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    user: '',
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, uid, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: btoa(password), uid, code }).then(response => {
        const { data } = response
        if (data.error) {
          reject(data.error)
        }
        const { access, is_superuser, hospital_info } = data.data
        const role = is_superuser ? 'ADMIN' : 'DOCTOR'
        const roles = [role]
        localStorage.setItem('role', role)
        commit('app/SET_HOSPITAL', hospital_info, { root: true })
        localStorage.setItem('hospital', JSON.stringify(hospital_info))
        commit('SET_ROLES', roles)
        commit('SET_TOKEN', access)
        commit('SET_USER', data.data)
        setToken(access)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  async getUserInfo({ commit }, state) {
    const identity = localStorage.getItem('role')
    const roles = [identity.toUpperCase()]
    commit('SET_ROLES', roles)
    commit('SET_NAME', '默认用户')
    commit('SET_AVATAR', 'https://cdn.mp.txtkeji.com/txt/pictures/logo.png')
    const hospital = JSON.parse(localStorage.getItem('hospital'))
    commit('app/SET_HOSPITAL', hospital, { root: true })
    return {
      roles
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        localStorage.clear()
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

