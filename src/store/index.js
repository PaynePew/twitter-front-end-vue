import { createStore } from "vuex";

export default createStore({
  state: {
    currentUser: {
      id: "",
      account: "",
      email: "",
      name: "",
      role: "",
    },
    isAuthenticated: false,
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };
      state.isAuthenticated = true;
      state.token = localStorage.getItem('token');
    },    
  },
  actions: {},
  modules: {},
});
