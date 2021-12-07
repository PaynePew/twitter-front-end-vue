import { createStore } from "vuex";
import authentication from "./modules/authentication";
import modalArticle from "./modules/modalArticle";

export default createStore({
  modules: {
    modalArticle,
    authentication,
  },
});
