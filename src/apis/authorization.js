import { apiHelper } from "../utils/helpers";

export default {
  //TODO 登入資料api待修正 account,password
  signIn({ email, password }) {
    console.log('email: ',email,' password: ', password);
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  },
  signUp({ name, account, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      name,
      account,
      email,
      password,
      checkPassword
    })
  }
}