import { apiHelper } from "../utils/helpers";

export default {
  //TODO 登入資料api待修正 account,password
  signIn({ account, password }) {
    return apiHelper.post("/users/signin", {
      account,
      password,
    });
  },
  signUp({ name, account, email, password, checkPassword }) {
    return apiHelper.post("/users", {
      name,
      account,
      email,
      password,
      checkPassword,
    });
  },
};
