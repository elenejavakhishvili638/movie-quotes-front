import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  }
})

axios.defaults.withCredentials = true
