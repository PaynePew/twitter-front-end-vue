import {
  TOGGLE_MODAL,
  LOAD_ARTICLE,
  FETCH_ARTICLES,
  SET_ARTICLES,
  FETCH_ARTICLESHOW,
  SET_ARTICLESHOW,
  FETCH_ARTICLE_REPLY,
  SET_ARTICLE_REPLY,
  USERINFO_REFRESH,
} from "../mutation-types";
import articlesAPI from "@/apis/articles";

export default {
  namespaced: true,
  state: {
    articles: [],
    currentArticle: {},
    currentReplies: [],
    articleOwner: [],
    articleReply: {},
    isShow: false,
    userInfoRefresh: false,
  },
  mutations: {
    [SET_ARTICLES]: (state, payload) => {
      state.articles = payload;
    },
    [SET_ARTICLESHOW]: (state, payload) => {
      state.currentArticle = payload;
      state.articleOwner = payload.User;
    },
    [SET_ARTICLE_REPLY]: (state, payload) => {
      state.currentReplies = payload;
    },
    [TOGGLE_MODAL]: (state) => {
      state.isShow = !state.isShow;
      state.articleReply = {};
    },
    [LOAD_ARTICLE]: (state, payload) =>
      (state.articleReply = { ...state.articleReply, ...payload }),
    [USERINFO_REFRESH]: (state) => {
      state.userInfoRefresh = !state.userInfoRefresh;
    },
  },
  actions: {
    [FETCH_ARTICLES]: async ({ commit }) => {
      try {
        const response = await articlesAPI.getArticles();
        commit(SET_ARTICLES, response.data);
      } catch (error) {
        console.log(error);
      }
    },
    [FETCH_ARTICLESHOW]: async ({ commit }, articleId) => {
      try {
        const { data } = await articlesAPI.getArticleShow(articleId);
        commit(SET_ARTICLESHOW, data);
      } catch (error) {
        console.log(error);
      }
    },
    [FETCH_ARTICLE_REPLY]: async ({ commit }, articleId) => {
      try {
        const { data } = await articlesAPI.reply.get(articleId);
        commit(SET_ARTICLE_REPLY, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {},
};
