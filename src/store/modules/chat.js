import {
  selectChat,
  removeSelect,
  setMessageList,
  addNewMessage,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    activeChat: -1,
    messageList: [],
    privateMessageList: {},
    // {
    //   {
    //     id1:{
    //       message.....
    //     }
    //     id2:{message....}
    //   },
    //   roomId:[id1,id2,id3,id4],

    // }

    // content: "",
    //privateMessageList.userId
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
    },
    // [updateContent]: (state, value) => {
    //   state.content = value;
    // },
  },
  actions: {},
  getters: {
    

  },
};
