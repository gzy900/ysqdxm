import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getList as getRoutes } from '@/api/permission'
import { reAsyncRoutes } from '@/utils/async-routes'

const state = {
  token: getToken(),
  name: '',
  doctorId: '',
  avatar: '',
  introduction: '',
  roles: [],
  menus: [],
  userInfo: {},
  permission: []
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
  SET_DOCTOR_ID: (state, doctorId) => {
    state.doctorId = doctorId
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PERMISSION: (state, permission) => {
    state.SET_PERMISSION = permission
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { cellphone, passwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ cellphone: cellphone.trim(), passwd: passwd }).then(response => {

        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_DOCTOR_ID', data.doctorId)
        setToken(data.token)
        sessionStorage.setItem('doctorId', data.doctorId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {

      getInfo(sessionStorage.getItem('doctorId')).then(response => {
        //
        // const { data } = { data: { name: '移视科技', avatar: '', introduction: '' } }
        const { data } = response
        if (!data) {
          reject('用户信息获取失败，请重新登录！')
        }

        console.log(12344444)
        console.log(data)
        commit('SET_USER_INFO', data)
        data.roles = ['admin']
        const { roles, doctorName, doctorId, avatar, introduction } = data
        console.log(data)
        // roles must be a non-empty array

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', doctorName)
        commit('SET_AVATAR', avatar)
        commit('SET_DOCTOR_ID', doctorId)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoutes({ pageCount: 100, pageNum: 1 }).then(response => {
        const data = response.data.records
        sessionStorage.setItem('routes', JSON.stringify(data))
        const permission = state.userInfo.permission.split(',') || []
        const dataList = []
        permission.forEach((p) => {
          data.forEach((d) => {
            if (d.id.toString() === p.toString()) {
              dataList.push(d)
            }
          })
        })
        console.log(dataList)
        const list = reAsyncRoutes(dataList)
        commit('SET_MENUS', list)
        console.log(555)
        console.log(data)
        commit('SET_PERMISSION', data)
        resolve(list)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {

    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
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
  async changeRoles({ commit, dispatch }, role) {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
