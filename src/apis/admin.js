import { apiHelper } from "../utils/helpers";

export default {  
  signIn({ account, password }) {
    console.log("admin login account: ", account, " password: ", password);
    return apiHelper.post("/admin/signin", {
      account,
      password,
    });
  },
  articles: {
    getAll() {
      console.log("admin getAll article");
      return apiHelper.get("admin/tweets");
    },
    delete({tweetId}) {
      console.log("admin delete article");
      return apiHelper.delete(`admin/tweets/${tweetId}`);
    },
  },
  getUsers() {
    console.log("admin get users");
    return apiHelper.get("admin/users");
  },
};
