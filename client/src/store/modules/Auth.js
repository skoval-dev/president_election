import userService from '../../services/UserService'

const AUTH_REQUEST = "AUTH_REQUEST",
  SIGNUP_REQUEST = "SIGNUP_REQUEST",
  AUTH_CHECK_REQUEST = "AUTH_CHECK_REQUEST",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_ERROR = "AUTH_ERROR",
  AUTH_LOGOUT = "AUTH_LOGOUT";

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = 'logged_out',
    state.token = ''
  },
}

const actions = {
  [AUTH_REQUEST]: ({
    commit,
    dispatch
  }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      userService.login(user)
        .then(resp => {
          const token = resp.data.token;
          if(!token){
            return reject(resp.data);
          }
          localStorage.setItem('x-auth', token) // store the token in localstorage
          commit(AUTH_SUCCESS, token)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('x-auth') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  },
  [AUTH_CHECK_REQUEST]: ({
    commit,
    dispatch
  }) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST);
      var token = localStorage.getItem('x-auth')
      userService.check(token)
        .then(resp => {
          commit(AUTH_SUCCESS, localStorage.getItem('x-auth'))
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('x-auth') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  },
  [SIGNUP_REQUEST]: ({
    commit,
    dispatch
  }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      userService.sign_up(user)
        .then(resp => {
          const token = resp.data.token;
          localStorage.setItem('x-auth', token) // store the token in localstorage
          commit(AUTH_SUCCESS, token)
          // you have your token, now log in your user :)
          //dispatch(USER_REQUEST)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('x-auth') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({
    commit,
    dispatch
  }) => {
    return new Promise((resolve, reject) => {
      var token = localStorage.getItem('x-auth')
      userService.logout(token)
      .then(resp => {
        localStorage.removeItem('x-auth') // clear your user's token from localstorage
        commit(AUTH_LOGOUT)
        resolve()
      })
    })
  }
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

export default {
  state: {
    token: localStorage.getItem('x-auth') || '',
    status: ''
  },
  mutations,
  actions,
  getters
}