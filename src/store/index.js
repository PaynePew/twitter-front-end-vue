import { createStore } from "vuex";
import authentication from "./modules/authentication";
import modalArticle from "./modules/modalArticle";
import modalUserInfo from "./modules/modalUserInfo";
import noticeInfo from "./modules/noticeInfo";

export default createStore({
  modules: {
    modalArticle,
    authentication,
    modalUserInfo,
    noticeInfo,
  },
});
