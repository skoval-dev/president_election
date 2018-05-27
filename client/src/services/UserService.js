import api from './api'
export default {
  create (payload) {
    return api().post('users', payload);
  },
  check(token) {
    return api().get('/users/me', {headers: {"x-auth": token}});
  }
}