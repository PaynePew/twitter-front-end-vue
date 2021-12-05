import { apiHelper } from "../utils/helpers";

export default {
  getCurrentUser() {
    return apiHelper.get('/get_current_user')
  },
  getAccount({ userId }) {
    return apiHelper.get(`/user/${userId}`)
  },
  updateAccount({ userId, formData }) {
    return apiHelper.put(`/user/${userId}`, formData)
  },
  getInfo({ userId }) {
    return apiHelper.get(`/user/edit/${userId}`)
  },
  updateInfo({ userId, formData }) {
    return apiHelper.put(`/user/edit/${userId}`, formData)
  },

  

}