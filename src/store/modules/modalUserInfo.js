import { TOGGLE_MODAL } from "../mutation-types";
export default {
  namespaced: true,
  state: {
    isShow: false,
  },
  mutations: {
    [TOGGLE_MODAL]: (state) => (state.isShow = !state.isShow),
  },
  actions: {},
  getters: {},
};
