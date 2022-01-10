import {
  selectChat,
  removeSelect,
  // setMessageList,
  addNewMessage,
  setPrivateHistory,
  // setPrivateUserList,
  selectReceiver,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    activeChat: null,
    activeReceiver: null,
    roomList: [],
    rooms: {},
    messageList: {},
    userList: {},
    // roomList:[id1,id2,id3,id4],
    // rooms:{
    //     id1:{
    //       messages:[mId1,mId2]
    //     }
    //     id2:{message....}
    //   },
    // messageList:{
    // mId1:{},
    // mId2:{},
    //  },
    // userList:{
    //   id1:{},
    //   id2:{},
    // }
  },
  mutations: {
    [selectChat]: (state, selectId) => {
      state.activeChat = selectId;
    },
    [selectReceiver]: (state, selectId) => {
      state.activeReceiver = selectId;
    },
    [removeSelect]: (state) => {
      state.activeChat = null;
    },
    // [setMessageList]: (state, list) => {
    //   state.messageList = list;
    // },
    [addNewMessage]: (state, data) => {
      const {
        id,
        content,
        createdAt,
        UserId: userId,
        RoomId,
      } = data.newMessages;
      state.messageList[id] = {
        id,
        content,
        createdAt,
        userId,
      };
      state.rooms[RoomId] = {
        messages: [...state.rooms[RoomId].messages, id],
      };
    },
    // [setPrivateHistory]: (state, data) => {
    //   data.map((_data) =>
    //     _data.history.map((_message) => {
    //       let { id, content, createdAt, UserId: userId } = _message;
    //       state.messageList[id] = {
    //         id,
    //         content,
    //         createdAt,
    //         userId,
    //       };
    //     })
    //   );
    // },
    [setPrivateHistory]: (state, data) => {
      data.map((_data) => {
        let { id: roomId } = _data;
        _data.history.map((_message) => {
          let { id, content, createdAt, UserId: userId } = _message;
          state.messageList[id] = {
            id,
            content,
            createdAt,
            userId,
          };
        });
        state.rooms[roomId] = {
          messages: _data.history.map((_message) => {
            return _message.id;
          }),
        };
        if (state.roomList.includes(roomId)) {
          return;
        }
        state.roomList = [...state.roomList, roomId];
        state.userList[roomId] = {
          ..._data.receiver,
          roomId,
        };
      });
    },
  },
  actions: {},
  getters: {
    getUserList: (state) =>
      state.roomList.map((_roomId) => state.userList[_roomId]),
    getRoomMessage: (state) => {
      return state.rooms[state.activeChat].messages.map(
        (_messageId) => state.messageList[_messageId]
      );
    },
    getLatestRoomMessage: (state) => (roomId) => {
      let max = Math.max(...state.rooms[roomId].messages);
      return state.messageList[max];
    },
    getRoomUser: (state) => {
      return state.userList[state.activeChat];
    },
    getReceiverUser: (state, getters) => {
      return getters.getUserList.filter(
        (_user) => _user.id === state.activeReceiver
      )[0].roomId;
    },
  },
};
