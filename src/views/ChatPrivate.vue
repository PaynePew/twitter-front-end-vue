<template>
  <div class="private-message__container">
    <ChatUserList :users="users" />
    <Chatroom @chat-submit="chatSubmit" ref="chatroomRef" />
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
    // eslint-disable-next-line vue/no-unused-components
    ChatUserList,
    Chatroom,
  },
  data() {
    return {
      content: "",
      socket: -1,
      users: [],
      selectedId: this.$store.state.chat.activeChat,
    };
  },

  created() {
    // eslint-disable-next-line no-unused-vars
    const { id } = this.currentUser;
    // this.socket = io("https://twitter-chatroom-test.herokuapp.com");
    this.socket = io("http://localhost:3000/");
    this.socket.on("connect", () => {
      console.log("進入聊天室");
    });
    this.onLogin();
    this.emitLogin(id, this.selectedId);
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      messageList: (state) => state.chat.messageList,
      activeChat: (state) => state.chat.activeChat,
    }),
  },

  methods: {
    fetchMessage() {
      this.$store.commit("chat/setMessageList", dummyData);
    },
    emitLogin(UserId, UserId2) {
      this.socket.emit("privateEnter", [UserId, UserId2]);
      console.log("房間登入訊息發送", [UserId, UserId2]);
    },
    onLogin() {
      this.socket.on("join_privateroom", (results) => {
        console.log("房間登入訊息接收", results);
        // const { name, content } = results;
        // const login = {
        //   name,
        //   id: Math.random() * 10000,
        //   content,
        //   type: "notice",
        // };
        // this.addMessage(login);
        // this.onlineUsers = onlineUsers;
      });
    },
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
