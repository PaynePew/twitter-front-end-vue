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
      image: "",
      cover: "",
      role: "",
      introduction: "",
    },
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    [setCurrentUser]: (state, currentUser) => {
      console.log("setCurrentUser in vuex");
      console.log("currentUser:", currentUser);
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true;
      state.token = localStorage.getItem("token");
    },
    [revokeAuthentication]: (state) => {
      console.log("revoke authentication");
      state.currentUser = {};
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      state.token = "";
    },
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        // getCurrentUser api 目前匯回傳完整user列表 先用getUserAccount代替
        const { data } = await usersAPI.getCurrentUser();
        console.log("currentUserAPI", data);
        // const { data } = await usersAPI.account.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { id, account, name, email, image, cover, role, introduction } =
          data.user;

        commit("setCurrentUser", {
          id,
          account,
          name,
          email,
          image,
          cover,
          role,
          introduction,
        });
        return true;
      } catch (error) {
        console.error(error.message);
        // commit("revokeAuthentication");
        return false;
      }
    },
  },
};
