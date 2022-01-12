import {
  selectChat,
  removeSelect,
  addNewMessage,
  setPrivateHistory,
  selectReceiver,
  selectTempUser,
  RESET_PRIVATE,
} from "../mutation-types";

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

const getDefaultState = () => {
  return {
    activeChat: null,
    activeReceiver: null,
    roomList: [],
    rooms: {},
    messageList: {},
    userList: {},
    tempUser: "",
  };
};

const state = getDefaultState();

export default {
  namespaced: true,
  state,
  mutations: {
    [selectChat]: (state, selectId) => {
      state.activeChat = selectId;
      if (!state.activeChat) {
        return;
      }
      state.rooms[state.activeChat].messages.map(
        (_messageId) => (state.messageList[_messageId].isRead = true)
      );
    },
    [selectReceiver]: (state, selectId) => {
      state.activeReceiver = selectId;
    },
    [removeSelect]: (state) => {
      state.activeChat = null;
    },
    [selectTempUser]: (state, selectName) => {
      state.tempUser = selectName;
    },
    [addNewMessage]: (state, data) => {
      let {
        id,
        content,
        createdAt,
        UserId: userId,
        RoomId,
        isRead,
      } = data.newMessages;
      state.messageList[id] = {
        id,
        content,
        createdAt,
        userId,
        isRead,
      };
      state.rooms[RoomId] = {
        messages: [...state.rooms[RoomId].messages, id],
      };
    },
    [setPrivateHistory]: (state, data) => {
      data.map((_data) => {
        let { id: roomId } = _data;
        _data.history.map((_message) => {
          let { id, content, createdAt, UserId: userId, isRead } = _message;
          state.messageList[id] = {
            id,
            content,
            createdAt,
            userId,
            isRead,
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
    [RESET_PRIVATE]: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  getters: {
    getUserList: (state) => {
      return state.roomList.map((_roomId) => state.userList[_roomId]);
    },
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
      let test = getters.getUserList.filter(
        (_user) => _user.id === state.activeReceiver
      );
      return test[0].roomId;
    },
  },
};
