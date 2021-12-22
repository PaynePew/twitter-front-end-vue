<template>
  <div class="public-message__container">
    <ChatUserList :users="onlineUsers" />
    <Chatroom @chat-submit="chatSubmit" ref="chatroomRef" />
  </div>
</template>

<script>
import ChatUserList from "../components/ChatUserList.vue";
import Chatroom from "../components/Chatroom.vue";
import { fromNowMixin } from "@/utils/mixins";
import { mapState } from "vuex";

import io from "socket.io-client";

export default {
  components: {
    ChatUserList,
    Chatroom,
  },

  data() {
    return {
      content: "",
      socket: -1,
      onlineUsers: [],
      selectedId: this.$store.state.activeChat,
    };
  },
  sockets: {
    conncet: function () {
      console.log("socket connected");
    },
  },

  created() {
    // const { id } = this.currentUser;
    // this.socket = io("https://twitter-chatroom-test.herokuapp.com");
    this.socket = io("http://localhost:3000/");
    this.socket.on("connect", () => {
      console.log("進入聊天室");
    });
    this.onLogin();
    this.onLogout();
    this.onChatLoading();
    this.onChatStatus();
    this.emitLogin();
    //   window.onbeforeunload = () => {
    //     this.socket.emit("publicLeave", id);
    // }
  },
  beforeUnmount() {
    const { id } = this.currentUser;
    this.socket.emit("publicLeave", id);
    this.socket.disconnect();
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      messageList: (state) => state.chat.messageList,
    }),
  },
  methods: {
    async fetchMessage(data) {
      await this.$store.commit("chat/setMessageList", data);
    },
    async addMessage(message) {
      await this.$store.commit("chat/addNewMessage", message);
    },

    emitLogin() {
      const { id } = this.currentUser;
      console.log(id);
      this.socket.emit("publicEnter", id);
      console.log("登入訊息發送", id);
    },

    onLogin() {
      this.socket.on("publicLogin", async (user, onlineUsers) => {
        console.log("登入訊息接收", user, onlineUsers);
        const { name, content } = user;
        const login = {
          name,
          id: Math.random() * 10000,
          content,
          type: "notice",
        };
        await this.addMessage(login);
        this.onlineUsers = onlineUsers;
        this.$refs.chatroomRef.scrollToggle();
      });
    },

    onLogout() {
      this.socket.on("publicLogout", async (user, onlineUsers) => {
        console.log("登出訊息接收", user, onlineUsers);
        const { name, content } = user;
        const logout = {
          name,
          id: Math.random() * 10000,
          content,
          type: "notice",
        };
        await this.addMessage(logout);
        this.onlineUsers = onlineUsers;
        this.$refs.chatroomRef.scrollToggle();
      });
    },

    onChatLoading() {
      this.socket.on("allMessage", (data) => {
        console.log("歷史訊息載入", data);
        const history = data.map((_data) => {
          const { name, avatar, id: userId } = _data.User;
          const { content, createdAt, id } = _data;
          const unwrappedMessage = {
            userId,
            name,
            avatar,
            content,
            id,
            createdAt,
          };
          return unwrappedMessage;
        });
        this.fetchMessage(history);
      });
    },

    onChatStatus() {
      this.socket.on("newMessage", async (data) => {
        console.log("新的聊天訊息接收", data);
        const { name, avatar } = data[1];
        const { content, createdAt, id, UserId: userId } = data[0];
        const newMessage = {
          userId,
          name,
          avatar,
          content,
          id,
          createdAt,
        };
        console.log("準備寫入新訊息");
        await this.addMessage(newMessage);
        this.$refs.chatroomRef.scrollToggle();
      });
    },

    async chatSubmit(content) {
      const { id } = this.currentUser;
      await this.socket.emit("sendMessage", { content, id });
      this.content = "";
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.public-message {
  &__container {
    width: 1063px;
    height: 100%;
    display: flex;
  }
}
</style>
