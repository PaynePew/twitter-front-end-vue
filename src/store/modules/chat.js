import { selectChat, removeSelect, setMessageList, addNewMessage } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    activeChat: -1,
    messageList: [],
  },
  mutations: {
    [selectChat]: (state, selectId) => {
      state.activeChat = selectId;
    },

    [removeSelect]: (state) => {
      state.activeChat = -1;
    },

    [setMessageList]: (state, list) => {
      state.messageList = list;
    },

    [addNewMessage]: (state, message) => {
      state.messageList.push(message);
    }
  },
  actions: {},
  getters: {},
};
