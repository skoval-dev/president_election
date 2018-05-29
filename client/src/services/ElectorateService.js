import api from './api'
export default {
  confirm(id) {
    return api().get(`/electorate/login/${id}`);
  }
}