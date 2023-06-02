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
    const user = await axios.get('/api/user')
    console.log(user)
  } catch (error) {
    console.log(error)
  }
}

export async function registerWithGoogle() {
  try {
    const response = await axios.get('api/auth/redirect', { withCredentials: true })
    if (response.data.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    console.log(error)
  }
}

export async function loginWithGoogle() {
  try {
    const response = await axios.get('api/auth/redirect', { withCredentials: true })
    if (response.data.url) {
      window.location.href = response.data.url
    }
  } catch (error) {
    console.log(error)
  }
}

export async function logout() {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/logout', { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}

export async function sendEmail(data) {
  try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/api/forgot-password', data, { withCredentials: true })
  } catch (error) {
    console.log(error)
  }
}
