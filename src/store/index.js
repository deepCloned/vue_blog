import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let username = localStorage.getItem('username')
let token = localStorage.getItem('token')

const state = {
  username: username || '',
  token: token || '',
  isLogin: localStorage.getItem('username') != null,
  mySelectState: 'my'
}

const mutations = {
  changeLoginState (state, flag) {
    state.isLogin = flag
  },
  changeToken (state, value) {
    state.token = value
  },
  changeUsername (state, username) {
    state.username = username
  },
  changeMySelectState (state, type) {
    state.mySelectState = type
  }
}

export default new Vuex.Store({
  state,
  mutations
})
