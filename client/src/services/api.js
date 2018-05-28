import axios from 'axios'
const token = localStorage.getItem('admin-token') || '';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    validateStatus: function (status) {
      return status <= 401;
    },
    headers: {'x-auth': token},
    proxy: {
      host: 'http://localhost',
      port: 3000
    }
  });
}
