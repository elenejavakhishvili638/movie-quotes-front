import axios from '../config/axios'

export async function registerUser(data) {
  try {
    await axios.post('/api/register', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/login', data, { withCredentials: true })
    await axios.get('/api/user')
  } catch (error) {
    console.log(error)
  }
}
