import { apiHelper } from "../utils/helpers";

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  account: {
    get() {
      return apiHelper.get("/users/account");
    },
    update(formData) {
      return apiHelper.put("/users/account", formData);
    },
  },
  info: {
    get() {
      return apiHelper.get("/user/edit/");
    },
    update(formData) {
      return apiHelper.put("/user/edit/", formData);
    },
  },
};
