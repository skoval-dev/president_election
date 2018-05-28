import api from './api'
export default {
  sign_up(payload) {
    return api().post('users', payload);
  },
  check(token) {
    return api(token).get('/users/me');
  },
  login(payload) {
    return api().post('/users/login', payload);
  },
  logout(token) {
    return api(token).delete('/users/me/token');
  }
}