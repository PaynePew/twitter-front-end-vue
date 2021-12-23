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
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  sockets: {
    connect() {
      console.log("進入聊天室");
    },
    disconnect() {
      console.log("離開聊天室");
    },
    publicLogin(onlineUsers) {
      const { name, content } = onlineUsers[0];
      const login = {
        name,
        id: Math.random() * 10000,
        content,
        type: "notice",
      };
      this.addMessage(login);
      this.onlineUsers = onlineUsers[1];
    },
    publicLogout: function (onlineUsers) {
      const { name, content } = onlineUsers[0];
      const logout = {
        name,
        id: Math.random() * 10000,
        content,
        type: "notice",
      };
      this.addMessage(logout);
      this.onlineUsers = onlineUsers[1];
    },
    allMessage: function (data) {
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
    newMessage: async function (data) {
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
      await this.addMessage(newMessage);
    },
  },
  created() {
    this.$socket.connect();
  },
  mounted() {
    const { id } = this.currentUser;
    this.$nextTick(function () {
      this.$socket.emit("publicEnter", id);
      this.$refs.chatroomRef.scrollToggle();
    });
  },
  beforeUnmount() {
    const { id } = this.currentUser;
    this.$socket.emit("publicLeave", id);
    this.$socket.disconnect();
  },
  methods: {
    fetchMessage(data) {
      this.$store.commit("chat/setMessageList", data);
    },
    async addMessage(message) {
      await this.$store.commit("chat/addNewMessage", message);
      this.$refs.chatroomRef.scrollToggle();
    },
    chatSubmit(content) {
      const { id } = this.currentUser;
      this.$socket.emit("sendMessage", { content, id });
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
