import api from './api'
export default {
  sign_up(payload) {
    return api().post('users', payload);
  },
  check(token) {
    return api().get('/users/me', {headers: {'x-auth': token}});
  },
  login(payload) {
    return api().post('/users/login', payload);
  },
  logout(token) {
    return api().delete('/users/me/token', {headers: {'x-auth': token}});
  }
}