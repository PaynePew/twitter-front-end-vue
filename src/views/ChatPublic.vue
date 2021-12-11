<template>
  <div class="public-message__container">
    <ChatUserList />
    <Chatroom />
  </div>
</template>

<script>
const dummyData = [
  {
    id: 1,
    type: "notice",
    user: "Apple",
    userId: 3,
    avatar: "https://robohash.org/utetenim.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-11-02T22:54:49.000Z",
  },
  {
    id: 2,
    type: "notice",
    user: "Banana",
    userId: 4,
    avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 3,
    type: "notice",
    user: "Mango",
    userId: 5,
    avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 4,
    type: "message",
    user: "Peach",
    userId: 6,
    avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
    content: "good morning",
    creatAt: "2021-12-01T10:47:29.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content: "not good",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 6,
    type: "notice",
    user: "Pineapple",
    userId: 8,
    avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
    content: "offline",
    creatAt: "2021-12-01T10:47:29.000Z",
  },
  {
    id: 7,
    type: "message",
    user: "CurrentUser",
    userId: 21,
    avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
    content: "賣造",
    creatAt: "2021-12-01T11:47:29.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
];

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
      selectedId: this.$store.state.activeChat,
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
    
        this.fetchMessage();
    this.$store.commit("chat/removeSelect");
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  methods: {
      fetchMessage() {
      this.$store.commit("chat/setMessageList", dummyData);
    },
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
