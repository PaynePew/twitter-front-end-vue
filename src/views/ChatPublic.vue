<template>
  <div class="public-message__container">
    <ChatUserList />
    <Chatroom />
  </div>
</template>

<script>
import ChatUserList from "../components/ChatUserList.vue";
import Chatroom from "../components/Chatroom.vue";
import { mapState } from "vuex";
import io from "socket.io-client";

export default {
  components: {
    ChatUserList,
    Chatroom,
  },
  data() {
    return {
      messageList: [],
      content: "",
      socket: -1,
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", () => {
      console.log("進入聊天室");
      this.emitLogin();
    });
    this.onChatLoading();
    this.onChatStatus();
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  methods: {
    emitLogin() {
      const { id } = this.currentUser;
      console.log(id);
      this.socket.emit("publicLogin", id);
      console.log("登入訊息發送", id);
    },
    onChatLoading() {
      this.socket.on("allMessage", (data) => {
        console.log("歷史訊息載入", data);
        this.messageList = data;
      });
    },
    onChatStatus() {
      this.socket.on("publicEnter", (data) => {
        console.log("登入訊息接收", data);
        const { name, content } = data;
        const login = {
          name,
          id: Math.random() * 10000,
          content,
          type: "notice",
        };
        this.messageList.push(login);
      });
      this.socket.on("newMessage", async (data) => {
        console.log("新的聊天訊息接收", data);
        const { name, avatar } = data[1];
        const { content, createdAt, id, UserId } = data[0];
        const newMessage = {
          User: { id: UserId, name, avatar },
          content,
          id,
          createdAt,
        };
        await this.messageList.push(newMessage);
      });
      this.socket.on("publicLeave", (data) => {
        console.log("登出訊息發送");
        console.log(data);
      });
    },
    async chatSubmit(content) {
      const { id } = this.currentUser;
      await this.socket.emit("sendMessage", { content, id });
      this.content = "";
    },
  },
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
