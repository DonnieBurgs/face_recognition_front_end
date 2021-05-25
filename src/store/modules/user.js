// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    window.localStorage.setItem('userId', username)
    // console.log(password)
    var token = null
    if (username === 'admin') {
      token = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
    } else {
      token = {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
      }
    }
    commit('SET_TOKEN', token)
    setToken(token)
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    // var token = state.token
    // var name = token.name
    // var avatar = token.avatar
    // commit('SET_NAME', name)
    // commit('SET_AVATAR', avatar)
    // return token.roles
    return new Promise((resolve, reject) => {
      var token = state.token
      if (!token) {
        return reject('Verification failed, please Login again.')
      }
      var name = token.name
      var avatar = token.avatar
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      resolve(token)
    })
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //
    //     const { name, avatar } = data
    //
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    removeToken()
    resetRouter()
    commit('RESET_STATE')
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
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

