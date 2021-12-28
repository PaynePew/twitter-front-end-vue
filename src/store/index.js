import { createStore } from "vuex";
import authentication from "./modules/authentication";
import modalArticle from "./modules/modalArticle";
import modalUserInfo from "./modules/modalUserInfo";
import noticeInfo from "./modules/noticeInfo";
import chat from "./modules/chat";
import chatPrivate from "./modules/chatPrivate";

export default createStore({
  modules: {
    modalArticle,
    authentication,
    modalUserInfo,
    noticeInfo,
    chat,
    chatPrivate,
  },
});
