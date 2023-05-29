import axios from '../config/axios'

export async function registerUser(data) {
  try {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    await axios.post('/register', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser(data) {
  try {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
    await axios.post('/login', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}
