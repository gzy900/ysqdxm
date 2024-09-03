import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: -1,
    realname: '我',
    nickname: '',
    token: '',
    pubOpenid: '',
    patientInfo: {}

  },

  mutations: {
    logined(state, userInfo) {
      state.userId = userInfo && userInfo.userId
      state.token = userInfo && userInfo.token
      state.pubOpenid = userInfo && userInfo.pubOpenid
      state.patientInfo = userInfo && userInfo.patientInfo
    }
  }
})
