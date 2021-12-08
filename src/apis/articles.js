import { apiHelper } from "../utils/helpers";

export default {
  getArticles() {
    return apiHelper.get("/tweets");
  },
  getArticleShow(id) {
    return apiHelper.get(`/tweets/${id}`);
  },
  reply: {
    get(tweetId) {
      return apiHelper.get(`/tweets/${tweetId}`);
    },
    create(comment, tweetId) {
      return apiHelper.post(`/tweets/${tweetId}/replies`, { comment });
    },
  },
  like: {
    create(tweetId) {
      return apiHelper.post(`/tweets/${tweetId}/like`);
    },
    delete(tweetId) {
      return apiHelper.post(`/tweets/${tweetId}/unlike`);
    },
  },
};
