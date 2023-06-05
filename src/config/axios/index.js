import axios from 'axios'

axios.defaults.withCredentials = true

export default axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  }
})
