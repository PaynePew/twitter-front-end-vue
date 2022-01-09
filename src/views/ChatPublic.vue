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

export default {
  name: "ChatPublic",
  components: {
    ChatUserList,
    Chatroom,
  },
  data() {
    return {
      onlineUsers: [],
      currentUserId: -1,
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  created() {
    this.$socket.connect();
    // NavBar登出會先revoke currentUser，導致id為null，此處存入data取消computed響應
    this.currentUserId = this.currentUser.id;
    // vue lifecycle beforeUnmount(or beforeDestroy in Vue2)預設沒有註冊window.onbeforeunload
    // refresh page後不會執行beforeUnmount，可以在main.js做vue.$destroy的事件註冊，或是在component中直接呼叫
    // 另一種解法是直接在server端對所有client端的publicLogout發送登出訊息(io.sockets.emit or io.emit)
    // 不會影響privateChat
    window.onbeforeunload = () => {
      this.leavePublic(this.currentUserId);
    };
  },
  // vue3-sockets會在mounted階段註冊event
  sockets: {
    // 註冊接收登入狀況
    publicLogin(onlineUsers) {
      this.updateStatus(onlineUsers);
    },
    // 註冊接收登出狀況
    publicLogout(onlineUsers) {
      this.updateStatus(onlineUsers);
    },
    // 註冊接收歷史訊息
    allMessage(data) {
      this.handleHistory(data);
    },
    // 註冊接收新訊息
    newMessage(data) {
      this.handleNewMessage(data);
    },
  },
  // mounted後下一個Tick加入PublicRoom
  mounted() {
    this.$nextTick(function () {
      this.joinPublic(this.currentUserId);
    });
  },
  // component unomount時，離開PublicRoom，但仍保留connect狀態，refresh page不觸發
  beforeUnmount() {
    this.leavePublic(this.currentUserId);
  },
  methods: {
    joinPublic(id) {
      this.$socket.emit("publicEnter", id);
    },
    leavePublic(id) {
      this.$socket.emit("publicLeave", id);
    },
    updateStatus(onlineUsers) {
      const { name, content } = onlineUsers[0];
      const status = {
        name,
        id: Math.random() * 10000,
        content,
        type: "notice",
      };
      this.addMessage(status);
      this.onlineUsers = onlineUsers[1];
    },
    handleHistory(data) {
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
    },
    handleNewMessage(data) {
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
      this.addMessage(newMessage);
    },
    chatSubmit(content) {
      if (!content.trim()) {
        return;
      }
      this.$socket.emit("sendMessage", { content, id: this.currentUserId });
    },
    async fetchMessage(data) {
      await this.$store.commit("chat/setMessageList", data);
      // 歷史紀錄快速滾動底部
      this.$refs.chatroomRef.scrollToggle();
    },
    async addMessage(message) {
      await this.$store.commit("chat/addNewMessage", message);
      // 新訊息動畫滾動底部
      this.$refs.chatroomRef.scrollToggle(true);
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.public-message {
  &__container {
    width: 981px;
    height: 100%;
    display: flex;
  }
}
</style>
