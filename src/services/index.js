import axios from '../config/axios'

export async function registerUser(data) {
  try {
    await axios.post('register', data)
  } catch (error) {
    console.log(error)
  }
}
