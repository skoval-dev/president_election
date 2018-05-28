import axios from 'axios'
const token = localStorage.getItem('admin-token')
if (token) {
  axios.defaults.headers.common['x-auth'] = token
}
export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
}
