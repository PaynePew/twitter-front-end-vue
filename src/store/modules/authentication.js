import usersAPI from "./../../apis/users.js";
import { setCurrentUser } from "../mutation-types";
import { revokeAuthentication } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    currentUser: {
      id: "",
      account: "",
      email: "",
      name: "",
      avatar: "",
      cover: "",
      role: "",
      introduction: "",
    },
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    [setCurrentUser]: (state, currentUser) => {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true;
      state.token = localStorage.getItem("token");
    },
    [revokeAuthentication]: (state) => {
      state.currentUser = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        const { id, account, name, email, avatar, cover, role, introduction } =
          data.user;
        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          avatar,
          cover,
          role,
          introduction,
        });
        return true;
      } catch (error) {
        console.error(error.message);
        commit("revokeAuthentication");
        return false;
      }
    },
  },
};
