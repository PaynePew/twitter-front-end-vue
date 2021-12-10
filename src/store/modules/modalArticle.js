import { TOGGLE_MODAL, LOAD_ARTICLE } from "../mutation-types";
// eslint-disable-next-line no-unused-vars
import articlesAPI from "@/apis/articles";

export default {
  namespaced: true,
  state: {
    articleReply: {},
    isShow: false,
  },
  mutations: {
    [TOGGLE_MODAL]: (state) => {
      if (state.isShow) {
        location.reload();
      }
      state.isShow = !state.isShow;
      state.articleReply = {};
    },
    [LOAD_ARTICLE]: (state, payload) =>
      (state.articleReply = { ...state.articleReply, ...payload }),
  },
  actions: {},
  getters: {},
};
