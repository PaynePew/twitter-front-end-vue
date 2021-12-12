<template>
  <div class="chatroom__container">
    <div class="chatroom__header">
      <p v-if="$route.name == 'ChatPublic'" class="chatroom__title">
        公開聊天室
      </p>
      <p v-else class="chatroom__title">私人聊天室</p>
    </div>
    <div class="chatroom__body">
      <ChatMessage />
      <div class="chatroom__temp" ref="temp"></div>
    </div>
    <div class="chatroom__footer">
      <input class="chatroom__input" type="text" v-model="content" />
      <img
        src="@/assets/img/icon_send@2x.png"
        class="chatroom__icon"
        @click="
          $emit('chat-submit', content);
          content = '';
        "
        @keyup.enter="
          $emit('chat-submit', content);
          content = '';
        "
      />
    </div>
  </div>
</template>
<script>
import ChatMessage from "../components/ChatMessage.vue";
import { fromNowMixin } from "@/utils/mixins";
import { mapState } from "vuex";
// import io from "socket.io-client";

export default {
  el: "#app",
  components: {
    ChatMessage,
  },
  props: {
    initialMessageList: Array,
  },
  data() {
    return {
      socket: -1,
      content: "",
    };
  },
  created() {
    // this.socket = io("http://localhost:3000");
    // this.onChatStatus();
    // window.onbeforeunload = () => {
    //   this.socket.emit("publicLogout", "hello");
    // };
  },

  computed: {
    // content: {
    //   get() {
    //     return this.$store.state.chat.content;
    //   },
    //   set(value) {
    //     this.$store.commit("chat/updateContent", value);
    //   },
    // },
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  methods: {
    // onChatStatus() {
    //   this.socket.on("publicEnter", (data) => {
    //     console.log("登入訊息接收", data);
    //     const { name, content } = data;
    //     const login = {
    //       name,
    //       id: Math.random() * 10000,
    //       content,
    //       type: "notice",
    //     };
    //     this.messageList.push(login);
    //   });
    //   this.socket.on("newMessage", async (data) => {
    //     console.log("新的聊天訊息接收", data);
    //     const { name, avatar } = data[1];
    //     const { content, createdAt, id, UserId } = data[0];
    //     const newMessage = {
    //       User: { id: UserId, name, avatar },
    //       content,
    //       id,
    //       createdAt,
    //     };
    //     await this.messageList.push(newMessage);
    //     this.scrollToggle();
    //   });
    //   this.socket.on("publicLeave", (data) => {
    //     console.log("登出訊息發送");
    //     console.log(data);
    //   });
    // },
    // async chatSubmit(content) {
    //   const { id } = this.currentUser;
    //   await this.socket.emit("sendMessage", { content, id });

    //   await this.$store.commit("chat/addNewMessage", {
    //     id: this.$store.state.chat.messageList.length,
    //     type: "message",
    //     user: "Orange",
    //     userId: this.currentUser.id,
    //     avatar:
    //       "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
    //     content: content,
    //     creatAt: this.now(),
    //   });

    //   this.content = "";
    //   this.scrollToggle();
    // },

    scrollToggle() {
      console.log("scrollToggle");
      let container = this.$refs.temp;
      container.scrollIntoView({ behavior: "smooth" });
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.chatroom {
  &__container {
    box-sizing: border-box;
    position: relative;
    width: 672px;
    border-left: 1px solid $clr-border;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__header {
    display: absolute;
    top: 0;
    border-bottom: 1px solid $clr-border;
  }
  &__title {
    font-size: 18px;
    font-weight: 700;
    padding: 15px;
    margin: 0;
  }
  &__body {
    margin: 0 15px;
    height: calc(100vh - 55px - 52px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__input {
    width: 580px;
    height: 32px;
    border-radius: 50vh;
    background-color: $clr-border;
    margin: 10px 15px;
    padding: 0 12px;
    border: none;
    outline: none;
    text-align: end;
  }
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
