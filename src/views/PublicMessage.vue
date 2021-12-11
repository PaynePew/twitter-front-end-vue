<template>
  <div class="public-message__container">
    <ChatUserList />
    <Chatroom />
  </div>
</template>

<script>
import ChatUserList from "./../components/ChatUserList.vue";
import Chatroom from "./../components/Chatroom.vue";
// import { mapState } from "vuex";
// import io from "socket.io-client";
// const dummyData = [
//   聊天室ID:1{{
//     id: 1,
//     type: "notice",
//     user: "Apple",
//     userId: 3,
//     avatar: "https://robohash.org/utetenim.png?size=50x50&set=set1",
//     content: "online",
//     creatAt: "2021-11-02T22:54:49.000Z",
//   },
//   {
//     id: 2,
//     type: "notice",
//     user: "Banana",
//     userId: 4,
//     avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
//     content: "online",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   },
//   {
//     id: 3,
//     type: "notice",
//     user: "Mango",
//     userId: 5,
//     avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
//     content: "online",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   }},
//   {
//     id: 4,
//     type: "message",
//     user: "Peach",
//     userId: 6,
//     avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
//     content: "good morning",
//     creatAt: "2021-12-01T10:47:29.000Z",
//   },
//   {
//     id: 5,
//     type: "message",
//     user: "Papaya",
//     userId: 7,
//     avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
//     content: "not good",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   },
//   {
//     id: 6,
//     type: "notice",
//     user: "Pineapple",
//     userId: 8,
//     avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
//     content: "offline",
//     creatAt: "2021-12-01T10:47:29.000Z",
//   },
//   {
//     id: 7,
//     type: "message",
//     user: "CurrentUser",
//     userId: 21,
//     avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
//     content: "賣造",
//     creatAt: "2021-12-01T11:47:29.000Z",
//   },
//   {
//     id: 5,
//     type: "message",
//     user: "Papaya",
//     userId: 7,
//     avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
//     content:
//       "666666666666666666666666666666666666666666666666666666666666666666666",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   },
//   {
//     id: 5,
//     type: "message",
//     user: "Papaya",
//     userId: 7,
//     avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
//     content:
//       "666666666666666666666666666666666666666666666666666666666666666666666",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   },
//   {
//     id: 5,
//     type: "message",
//     user: "Papaya",
//     userId: 7,
//     avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
//     content:
//       "666666666666666666666666666666666666666666666666666666666666666666666",
//     creatAt: "2021-12-01T10:47:28.000Z",
//   },
// ];
export default {
  components: {
    ChatUserList,
    Chatroom,
  },
  // data() {
  //   return {
  //     messageList: [],
  //     content: "",
  //     socket: -1,
  //   };
  // },
  // mounted() {
  //   this.socket = io("http://localhost:3000");
  //   this.socket.on("connect", () => {
  //     console.log("進入聊天室");
  //     this.emitLogin();
  //   });
  //   this.onChatLoading();
  //   this.onChatStatus();
  //   this.scrollToggle();
  // },
  // provide() {
  //   return {
  //     messageList: this.messageList,
  //     currentUser: this.currentUser,
  //   };
  // },
  // computed: {
  //   ...mapState({
  //     currentUser: (state) => state.authentication.currentUser,
  //   }),
  // },
  // methods: {
  //   emitLogin() {
  //     const { id } = this.currentUser;
  //     console.log(id);
  //     this.socket.emit("login", id);
  //     console.log("登入訊息發送");
  //   },
  //   onChatLoading() {
  //     this.socket.on("allMessage", (data) => {
  //       this.messageList = dummyData;
  //       console.log(data);
  //       // this.messageList = data;
  //     });
  //     this.onChatStatus();
  //   },
  //   onChatStatus() {
  //     this.socket.on("Login", (data) => {
  //       console.log("登入訊息接收");
  //       console.log(data);
  //       const { name, id, content } = data;
  //       const login = { name, id, content, type: "notice" };
  //       this.messageList.push(login);
  //     });
  //     this.socket.on("Logout", (data) => {
  //       console.log("登出訊息發送");
  //       console.log(data);
  //       const { name, id, content } = data;
  //       const login = { name, id, content, type: "notice" };
  //       this.messageList.push(login);
  //     });
  //   },
  // },
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
