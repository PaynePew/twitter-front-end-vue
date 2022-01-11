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
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      activeReceiver: (state) => state.chatPrivate.activeReceiver,
      activeChat: (state) => state.chatPrivate.activeChat,
      roomList: (state) => state.chatPrivate.roomList,
    }),
    ...mapGetters({
      userList: "chatPrivate/getUserList",
    }),
  },
  created() {
    this.$socket.connect();
    // NavBar登出會先revoke currentUser，導致id為null，此處存入data取消computed響應
    this.currentUserId = this.currentUser.id;
  },
  // vue3-sockets會在mounted階段註冊event
  sockets: {
    privateHistory(data) {
      // this.$store.commit("chatPrivate/setPrivateUserList", data);
      this.$store.commit("chatPrivate/setPrivateHistory", data);
    },
    // 註冊接收新訊息
    privateMessage(newMessage) {
      this.addMessage(newMessage);
    },
  },
  // mounted後下一個Tick加入Private-Room
  mounted() {
    this.$nextTick(function () {
      this.joinPrivate(this.currentUserId);
    });
  },

  methods: {
    joinPrivate(senderId) {
      this.$socket.emit("privateEnter", { senderId });
    },
    handleReceiver(data) {
      this.$store.commit("chatPrivate/setPrivateMessageList", data);
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
      if (!this.roomList.includes(message.newMessages.RoomId)) {
        this.joinPrivate(this.currentUserId);
        return;
      } else if (message.newMessages.RoomId === this.activeChat) {
        message.newMessages.isRead = true;
        this.$socket.emit("getRoomHistory", {
          currentUserId: this.currentUserId,
          roomId: this.activeChat,
        });
      }
      await this.$store.commit("chatPrivate/addNewMessage", message);
      // 新訊息動畫滾動底部
      this.$refs.chatroomRef.scrollToggle(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.private-message {
  &__container {
    width: 981px;
    height: 100%;
    display: flex;
  }
}
</style>
