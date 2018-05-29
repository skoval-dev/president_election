import ElectorateService from '../../services/ElectorateService'

const      VOTED = 'VOTED',
      CONFORIMED = 'CONFIRMED',
    SET_ELECT_ID = 'SET_ELECT_ID',
    SET_STATE = 'SET_STATE';

const mutations = {
    [VOTED]: (state) => {
      state.voted = true;
    },
    [CONFIRMED]: (state, election_id) => {
      state.login = true;
      state.election_id = election_id
    },
    [SET_ELECT_ID]: (id) => {
      state.elect_id = id;
    },
    [SET_STATE]: (state, msg) => {
        state.confirm_failed.state = state;
        state.confirm_failed.msg = msg;
      }
}

const actions = {
    [CINFIRM_REQUEST]: ({
        commit,
        dispatch
      }, id) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
          commit(AUTH_REQUEST)
          ElectorateService.confirm(id)
            .then(resp => {
              const data = resp.data;
              if(!data.success && data._id){
                commit(VOTED, data.voted);
                commit(CONFIRMED, data._election);
                commit(SET_ELECT_ID, data._id);
              } else {
                  reject("You are not accessible to vote.");
              }
              
              resolve(resp)
            })
            .catch(err => {
              commit(SET_STATE, true, err);
              reject(err)
            })
        })
      }
}
  
export default {
    state: {
        elect_id: '',
        voted: false,
        login: false,
        _election: '',
        confirm_failed: {state:false, msg: ''}
    },
    mutations,
    actions
}
