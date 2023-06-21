import Axios from 'axios'

Axios.defaults.withCredentials = true

// export default axios.create({
// baseURL: import.meta.env.VITE_BACKEND_URL,
// headers: {
//   'Content-Type': 'application/json',
//   'X-Requested-With': 'XMLHttpRequest',
//   Accept: 'application/json'
// }
// })

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  }
})

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axios
