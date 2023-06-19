import { updateUser } from '../../services'

export default {
  async updateUser(data, id) {
    try {
      await updateUser(data, id)
    } catch (err) {
      console.log(err)
    }
  }
}
