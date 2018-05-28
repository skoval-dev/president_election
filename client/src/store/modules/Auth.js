const AUTH_REQUEST = "AUTH_REQUEST",
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
}

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
          commit(AUTH_REQUEST)
          axios({url: 'auth', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              localStorage.setItem('admin-token', token) // store the token in localstorage
              commit(AUTH_SUCCESS, token)
              // you have your token, now log in your user :)
              dispatch(USER_REQUEST)
              resolve(resp)
            })
          .catch(err => {
            commit(AUTH_ERROR, err)
            localStorage.removeItem('admin-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
        })
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('admin-token') // clear your user's token from localstorage
            resolve()
        })
    }
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

export default {
    state: {
        token: localStorage.getItem('admin-token') || '',
        status: ''
    },
    mutations,
    actions,
    getters
}