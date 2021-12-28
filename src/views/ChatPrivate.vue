<template>
  <div class="private-message__container">
    <ChatUserList :users="userList" />
    <Chatroom @chat-submit="chatSubmit" ref="chatroomRef" />
  </div>
</template>

<script>
import ChatUserList from "../components/ChatUserList.vue";
import Chatroom from "../components/Chatroom.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "ChatPrivate",
  components: {
    ChatUserList,
    Chatroom,
  },
  data() {
    return {
      content: "",
      currentUserId: -1,
      // 最後訊息時間需傳遞給ChatUserCardPrivate
      // selectedId: this.$store.state.chat.activeReceiver,
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      // messageList: (state) => state.chat.messageList,
      activeReceiver: (state) => state.chatPrivate.activeReceiver,
    }),
    ...mapGetters({
      userList: "chatPrivate/getUserList",
    }),
  },
  created() {
    this.$socket.connect();
    // NavBar登出會先revoke currentUser，導致id為null，此處存入data取消computed響應
    this.currentUserId = this.currentUser.id;
    window.onbeforeunload = () => {
      // this.leavePublic(this.currentUserId);
    };
    // this.emitLogin(id, this.selectedId);
  },
  // vue3-sockets會在mounted階段註冊event
  sockets: {
    // 註冊接收登入狀況
    // latestPrivateHistory(data) {
    //   console.log("latestPrivate", data);
    //   this.$store.commit("chatPrivate/setPrivateHistory", data);
    // },
    // privateReceiver(data) {
    //   this.handleReceiver(data);
    // },
    privateHistory(data) {
      this.$store.commit("chatPrivate/setPrivateUserList", data);
      this.$store.commit("chatPrivate/setPrivateHistory", data);
    },
    // 註冊接收登出狀況
    // publicLogout(onlineUsers) {
    //   this.updateStatus(onlineUsers);
    // },
    // 註冊接收歷史訊息
    // allMessage(data) {
    //   this.handleHistory(data);
    // },
    // 註冊接收新訊息
    privateMessage(response) {
      console.log(response);
    },
  },
  // mounted後下一個Tick加入Private-Room
  mounted() {
    this.$nextTick(function () {
      this.joinPrivate(this.currentUserId, this.activeReceiver);
    });
  },

  methods: {
    joinPrivate(senderId, receiverId) {
      this.$socket.emit("privateEnter", { senderId, receiverId });
    },
    handleReceiver(data) {
      this.$store.commit("chatPrivate/setPrivateMessageList", data);
    },
    // handleHistoryData(data) {
    // const roomId = data.roomId;
    // const { name, account, id, avatar } = data.user2;
    // const response = { roomId, name, account, id, avatar };
    // // fetchAllRoom需檢查
    // if (
    //   !this.userList.filter((_room) => _room.roomId === response.roomId)
    //     .length
    // ) {
    //   this.userList = [...this.userList, response];
    // }
    // if (
    //   !this.privateMessageList.rooms.filter((_room) => _rooms === roomId)
    //     .length
    // ) {
    //   this.userList = [...this.userList, response];
    // }
    // const rooms = data.map((_data) => {
    //   return _data.roomId;
    // });
    // data.map((_data) => {
    //   const {id, senderId, }=_data.history
    //   })

    // console.log("privateHistory", data.history);
    // },
    handleNewMessage(response) {
      const { id, createdAt, content } = response.newMessages;
      const { name, id: userId, avatar } = response.user;
      const newMessage = {
        userId,
        name,
        avatar,
        content,
        id,
        createdAt,
      };
      this.addMessage(newMessage);
    },
    chatSubmit(content) {
      if (!content.trim()) {
        return;
      }
      this.$socket.emit("privateMessage", {
        content,
        senderId: this.currentUserId,
        receiverId: this.activeReceiver,
      });
    },
    async addMessage(message) {
      await this.$store.commit("chat/addNewMessage", message);
      // 新訊息動畫滾動底部
      this.$refs.chatroomRef.scrollToggle(true);
    },

    // fetchMessage() {
    //   this.$store.commit("chat/setMessageList", dummyData);
    // },
    // emitLogin(UserId, UserId2) {
    //   this.socket.emit("privateEnter", [UserId, UserId2]);
    //   console.log("房間登入訊息發送", [UserId, UserId2]);
    // },
    // onLogin() {
    //   this.socket.on("join_privateroom", (results) => {
    //     console.log("房間登入訊息接收", results);
    //     // const { name, content } = results;
    //     // const login = {
    //     //   name,
    //     //   id: Math.random() * 10000,
    //     //   content,
    //     //   type: "notice",
    //     // };
    //     // this.addMessage(login);
    //     // this.onlineUsers = onlineUsers;
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.private-message {
  &__container {
    width: 1063px;
    height: 100%;
    display: flex;
  }
}
</style>
