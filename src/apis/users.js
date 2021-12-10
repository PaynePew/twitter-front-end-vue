import { apiHelper } from "../utils/helpers";

export default {
  getCurrentUser() {
    return apiHelper.get("/get_current_user");
  },
  getUser(id) {
    return apiHelper.get(`/users/${id}`);
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
      return apiHelper.get("/user/edit");
    },
    update({ formData }) {
      return apiHelper.put("/users", formData);
    },
  },
  follower: {
    getFollowers(id) {
      return apiHelper.get(`/users/${id}/followers`);
    },
    getFollowings(id) {
      return apiHelper.get(`/users/${id}/followings`);
    },
    addFollowShips(id) {
      return apiHelper.post("/followships", { id });
    },
    deleteFollowShips(followingId) {
      return apiHelper.delete(`/followships/${followingId}`);
    },
    getTopFollowers() {
      return apiHelper.get("followers/top");
    },
  },
  like: {
    getLikes(id) {
      return apiHelper.get(`/users/${id}/likes`);
    },
  },
  reply: {
    getReplies(id) {
      return apiHelper.get(`/users/${id}/replied_tweets`);
    },
  },
  tweet: {
    getTweets(id) {
      return apiHelper.get(`/users/${id}/tweets`);
    },
  },
};
