import { createStore } from "vuex";
import authentication from "./modules/authentication";
import modalArticle from "./modules/modalArticle";
import modalUserInfo from "./modules/modalUserInfo";

export default createStore({
  modules: {
    modalArticle,
    authentication,
    modalUserInfo,
  },
});
