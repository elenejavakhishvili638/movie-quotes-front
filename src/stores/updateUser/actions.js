import { updateUser } from '../../services'

export default {
  async updateUser(data, id) {
    try {
      await updateUser(data, id)
      this.errors = {}
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        this.errors = error.response.data.errors
      } else {
        console.log(error)
      }
    }
  }
}
