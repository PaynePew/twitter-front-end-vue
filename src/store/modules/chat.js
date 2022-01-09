import {
  selectChat,
  removeSelect,
  setMessageList,
  addNewMessage,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    activeChat: null,
    messageList: [],
    privateMessageList: {},
    // {
    // rooms:{
    //     id1:{
    //       messages:[mId1,mId2]
    //     }
    //     id2:{message....}
    //   },
    // roomList:[id1,id2,id3,id4],
    // messageList:{
    // mId1:{},
    // mId2:{},
    //  },
    // userList:{
    //   id1:{},
    //   id2:{},
    // }
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
  getters: {},
};
